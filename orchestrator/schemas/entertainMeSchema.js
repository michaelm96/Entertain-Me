const axios = require("axios");
const movieUrl = "http://localhost:3001/movies";
const tvUrl = "http://localhost:3002/tv";
const { gql } = require("apollo-server");
const Redis = require("ioredis");
const movieSchema = require("./movieSchema");
const redis = new Redis();

const typeDefs = gql`
  type content {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type GetContents {
    movies: [content]
    tvSeries: [content]
  }

  extend type Query {
    getContents: GetContents
  }
`;

const resolvers = {
  Query: {
    getContents: async () => {
      let movies, tv;
      const movieCache = await redis.get("moviesContent");
      const tvSeriesCache = await redis.get("tvContent");
      if (movieCache && tvSeriesCache) {
        console.log("via cache");
        movies = JSON.parse(movieCache)
        tv = JSON.parse(tvSeriesCache)
        return { movies, tv };
      } else {
        try {
          movies = await axios.get(movieUrl);
          tv = await axios.get(tvUrl);
          await redis.set("moviesContent", JSON.stringify(movies.data));
          await redis.set("tvContent", JSON.stringify(tv.data));
          return { movies: movies.data, tv: tv.data };
        } catch (error) {
          if (tv.data && movies.data) {
            return { tv: tv.data, movie: movies.data };
          } else if (!tv.data && movies.data) {
            return { tv: tvSeriesCache, movie: movies.data };
          } else if (tv.data && !movies.data) {
            return { tv: tv.data, movie: movieCache };
          } else if (!tv.data && !movies.data) {
            return { tv: tvSeriesCache, movie: movieCache };
          } else {
            return error;
          }
        }
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
