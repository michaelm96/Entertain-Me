const router = require('express').Router();
const movieController = require('../controllers/moviesController')

router.get("/movies", movieController.movieFindAll)
router.get("/movies/:movieId", movieController.findOneMovie)
router.post("/movies", movieController.addMovie)
router.put("/movies/:movieId", movieController.updateMovie)
router.delete("/movies/:movieId", movieController.deleteMovie)

module.exports = router;