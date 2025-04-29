var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/user-controllers');

//Router
router.post('/register', userControllers.createUser);
router.post('/login', userControllers.logIn);
//router.get('/getUserAll', userControllers.getAllUser);

module.exports = router;
