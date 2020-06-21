const router = require('express').Router();
const tvSeriesController = require('../controllers/tvSeriesController')

router.get("/tv", tvSeriesController.findAll)
router.get("/tv/:tvId", tvSeriesController.findOneTvSeries)
router.post("/tv", tvSeriesController.addTvSeries)
router.put("/tv/:tvId", tvSeriesController.updateTvSeries)
router.delete("/tv/:tvId", tvSeriesController.deleteTvSeries)

module.exports = router;