const router = require('express').Router()
const entertainMeController = require("../controllers/entertainMeController")

router.get("/entertainMe", entertainMeController.getEntertainMe)

module.exports = router