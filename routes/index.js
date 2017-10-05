var express = require('express');
var router = express.Router();
var loginController = require('../controller/login')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hotdgo123222' });
});

//后台超管登录
router.get('/admin/login',function (req, res, next) {
    res.render('back/login')
});

router.post('/admin/login',function (req, res, next) {
    loginController.adminLogin(req,res,next);
});


//普通用户登录
router.get('/login',function (req, res, next) {
    res.render('user/login');
});

router.post('',function (req, res, next) {

});
module.exports = router;
