const axios = require("axios");
const url = "http://localhost:3002/tv";
const { gql } = require("apollo-server");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  input InputTvSeries {
    tvId: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type tvSeries {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    tvSeries: [tvSeries]
    getTvById(tv: InputTvSeries): tvSeries
  }

  extend type Mutation {
    addTvSeries(tv: InputTvSeries): tvSeries
    updateTvSeries(tvId: ID!, tv: InputTvSeries): tvSeries
    deleteTvSeries(tvId: ID!): tvSeries
  }
`;
const resolvers = {
  Query: {
    tvSeries: async () => {
      try {
        const tvCache = await redis.get("tvSeries");
        if (tvCache) {
          console.log("via cache");
          return JSON.parse(tvCache);
        } else {
          console.log("via query");
          const tvSeries = await axios.get(url);
          redis.set("tvSeries", JSON.stringify(tvSeries.data));
          return tvSeries.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    getTvById: async (parent, args, context, info) => {
      const { tvId } = args.tv;
      try {
        const tvCache = await redis.get(`tvSeries+${tvId}`);
        if (tvCache) {
          console.log("via cache by id");
          return JSON.parse(tvCache);
        } else {
          console.log("via query by id");
          const tv = await axios.get(`${url}/${tvId}`);
          redis.set(`tvSeries+${tvId}`, JSON.stringify(tv.data));
          return tv.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  Mutation: {
    addTvSeries: async (_, args) => {
      try {
        const tv = await axios.post(url, args.tv);
        redis.set(`tvSeries+${tv.data.ops[0]._id}`, JSON.stringify(tv.data.ops[0]));
        redis.del("tvSeries")
        return tv.data.ops[0];
      } catch (error) {
        console.log(error);
      }
    },
    updateTvSeries: async (_, args) => {
      try {
        const tv = await axios.put(`${url}/${args.tvId}`, args.tv);
        let tempObj = JSON.parse(tv.config.data)
        tempObj["_id"] = args.tvId
        redis.set(`tvSeries+${args.tvId}`, JSON.stringify(tempObj));
        redis.del("tvSeries")
        return tempObj;

      } catch (error) {
        console.log(error); 
      }
    },
    deleteTvSeries: async (_, args) => {
      const tv = await axios.delete(`${url}/${args.tvId}`);
      redis.del(`tvSeries+${args.tvId}`)
      redis.del("tvSeries")
      return tv.data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
