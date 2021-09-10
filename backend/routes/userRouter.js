const router = require('express').Router();
const {index} = require("../controllers/UserController");

router.get('/users', index)

module.exports = router;
