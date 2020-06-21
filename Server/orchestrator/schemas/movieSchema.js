const axios = require("axios");
const url = "http://localhost:3001/movies";
const { gql } = require("apollo-server");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  input InputMovie {
    movieId: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [movie]
    getMovieById(movie: InputMovie): movie
  }

  extend type Mutation {
    addMovie(movie: InputMovie): movie
    updateMovie(movieId: ID!, movie: InputMovie): movie
    deleteMovie(movieId: ID!): movie
  }
`;
const resolvers = {
  Query: {
    movies: async () => {
      try {
        const movieCache = await redis.get("movies");
        if (movieCache) {
          console.log("via cache");
          return JSON.parse(movieCache);
        } else {
          console.log("via query");
          const movies = await axios.get(url);
          redis.set("movies", JSON.stringify(movies.data));
          return movies.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    getMovieById: async (parent, args, context, info) => {
      console.log(args, "<<<<<<<<<<<<<");
      const { movieId } = args.movie;
      try {
        const movieCache = await redis.get(`movies+${movieId}`);
        if (movieCache) {
          console.log("via cache by id");
          console.log(movieCache);
          return JSON.parse(movieCache);
        } else {
          console.log("via query by id");
          const movie = await axios.get(`${url}/${movieId}`);
          redis.set(`movies+${movieId}`, JSON.stringify(movie.data));
          console.log(movie.data);
          return movie.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      try {
        const movie = await axios.post(url, args.movie);
        redis.set(`movies+${movie.data.ops[0]._id}`, JSON.stringify(movie.data.ops[0]));
        redis.del("movies")
        return movie.data.ops[0];
      } catch (error) {
        console.log(error);
      }
    },
    updateMovie: async (_, args) => {
      try {
        const movie = await axios.put(`${url}/${args.movieId}`, args.movie);
        let tempObj = JSON.parse(movie.config.data)
        tempObj["_id"] = args.movieId
        redis.set(`movies+${args.movieId}`, JSON.stringify(tempObj));
        redis.del("movies")
        return tempObj;

      } catch (error) {
        console.log(error); 
      }
    },
    deleteMovie: async (_, args) => {
      const movie = await axios.delete(`${url}/${args.movieId}`);
      redis.del(`movies+${args.movieId}`)
      redis.del("movies")
      return movie.data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
