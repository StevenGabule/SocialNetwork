const express = require('express');
const {validate} = require("../validators");
const router = express.Router();
const {rules: createRules} = require('../validators/posts/create')
const {index, create} = require("../controllers/PostController");

router.get('/posts', index)
router.post('/posts', [createRules, validate], create)

module.exports = router;
