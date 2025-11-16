const router = require('express').Router();
const auth = require('../../middleware/auth');
const { getUsers, createUser } = require('./user.controller');

router.get('/getUsers', auth, getUsers);
router.post('/createUser', createUser);

module.exports = router;