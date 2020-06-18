const tvSeriesModel = require("../models/tvSeriesModel")

class tvSeriesController {
  static async findAll(req, res, next) {
    try {
      const tvSeries = await tvSeriesModel.findAll();
      res.status(200).json(tvSeries);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async findOneTvSeries(req, res, next) {
    const { tvId } = req.params;

    try {
      const tv = await tvSeriesModel.findOneTvSeries(tvId);
      res.status(200).json(tv);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async addTvSeries(req, res, next) {
    const data = req.body;

    try {
      const tv = await tvSeriesModel.addTvSeries(data);
      res.status(201).json(tv);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async updateTvSeries(req, res, next) {
    const data = req.body;
    const { tvId } = req.params;
    console.log(data,"ini controller");

    try {
      const tv = await tvSeriesModel.updateTvSeries(tvId, data);
      res.status(200).json(tv);
    } catch (error) {
      console.log("error", error);
    }
  }

  static async deleteTvSeries(req, res, next) {
    const { tvId } = req.params;

    try {
      const tv = await tvSeriesModel.deleteTvSeries(tvId);
      res.status(200).json(tv);
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = tvSeriesController;
