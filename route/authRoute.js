const { signUp, login } = require('../controller/authController');

const router = require('express').Router();

router.route('/signUp').post(signUp);
router.route('/login').post(login);

module.exports = router;