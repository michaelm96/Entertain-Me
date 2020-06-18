const movieUrl = "http://localhost:3000/movies";
const tvUrl = "http://localhost:3001/tv";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class entertainMeController {
  static async getEntertainMe(req, res, next) {
    let movieArr = [];
    let tvArr = [];
    let moviesCache = await redis.get("movies");
    let tvCache = await redis.get("tv");

    try {
      if (moviesCache) {
        console.log("via cache");
        await res.send(moviesCache);
      } else {
        console.log("via query");
        let respMovie = await axios(movieUrl);
        await redis.set("movies", JSON.stringify(respMovie.data));
        movieArr = respMovie.data;
      }
      if (tvCache) {
        console.log("via cache tv");
        await res.send(tvCache);
      } else {
        console.log("via query tv");
        let respTv = await axios(tvUrl);
        await redis.set("tv", JSON.stringify(respTv.data));
        tvArr = respTv.data;
      }
      await res.status(200).json({ respTv: tvArr, respMovie: movieArr });
    } catch (error) {
      console.log("error", error);
    }

    // let tvCache = await redis.get("tv")
    // if(tvCache) {
    //     console.log("via cache tv");
    //     res.send(tvCache)
    // } else {
    //     console.log("via query tv");
    //     let respTv = await axios(tvUrl);
    //     await redis.set("tv", JSON.stringify(respTv))
    //     res.send(respTv)
    // }
  }
}

module.exports = entertainMeController;
