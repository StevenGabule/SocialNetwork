const router = require('express').Router();
const {validate} = require("../validators");
const {rules: createRules} = require('../validators/posts/create')
const {index, create} = require("../controllers/PostController");

router.get('/posts', index)
router.post('/posts', [createRules, validate], create)

module.exports = router;
