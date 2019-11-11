const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const controller = require('../controllers/basic')

// Require controllers
// const user = require('../controllers/user');

// /api/v1/register will go to the register method in the user controller
//
// router.post('/register', user.register);

router.get('/data', controller.getData);
router.post('/data', controller.addData);

module.exports = router;
