const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');

// Require controllers
// const user = require('../controllers/user');

// /api/v1/register will go to the register method in the user controller
//
// router.post('/register', user.register);

module.exports = router;
