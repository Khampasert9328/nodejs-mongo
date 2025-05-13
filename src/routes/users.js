var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/user-controllers');

//Router
//post ເເມ່ນການບັນທຶກຂໍ້ມູນ
router.post('/register', userControllers.createUser);
router.post('/login', userControllers.logIn);
//get ເເມ່ນການສະເເດງຂໍ້ມູນ
router.get('/getUserAll', userControllers.getAllUser);


module.exports = router;
