const express = require('express');
const {validate} = require("../validators");
const router = express.Router();
const {rules: signUpRules} = require('../validators/auth/signUp')
const {rules: signInRules} = require('../validators/auth/signIn')
const {signUp, signIn, signOut} = require("../controllers/AuthController");

router.post('/sign-up', [signUpRules, validate], signUp)
router.post('/sign-in', [signInRules, validate], signIn)
router.post('/sign-out', signOut)

module.exports = router;
