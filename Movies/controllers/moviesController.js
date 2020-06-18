const movieModel = require("../models/movieModel");

class movieController {
  static async movieFindAll(req, res, next) {
    console.log("masuk sini");
    try {
      const movies = await movieModel.movieFindAll();
      return res.status(200).json(movies);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async findOneMovie(req, res, next) {
    const { movieId } = req.params;

    try {
      const movie = await movieModel.findOneMovie(movieId);
      res.status(200).json(movie);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async addMovie(req, res, next) {
    const data = req.body;

    try {
      const movie = await movieModel.addMovie(data);
      res.status(201).json(movie);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async updateMovie(req, res, next) {
    const data = req.body;
    const { movieId } = req.params;

    try {
      const movie = await movieModel.updateMovie(movieId, data);
      res.status(200).json(movie);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async deleteMovie(req, res, next) {
    const { movieId } = req.params;

    try {
      const movie = await movieModel.deleteMovie(movieId);
      res.status(200).json(movie);
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = movieController;
