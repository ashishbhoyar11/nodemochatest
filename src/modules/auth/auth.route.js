const router = require('express').Router();
const { loginController } = require('./auth.controller');

// "email":"ashish@gmai.com",
//     "password":"Admin@123"
router.post('/login', loginController);

module.exports = router;