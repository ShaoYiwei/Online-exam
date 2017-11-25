var express = require('express');
var router = express.Router();
var loginController = require('../controller/login')

const mongoose = require('mongoose');
const db = mongoose.connection;
const Admin = mongoose.model('Admin');

/* GET home page. */
router.get('/', function(req, res, next) {
    let path = process.cwd() + '\\uploads';
    res.render('index', { title: '没有什么',message:path });

});

//后台管理员登录
router.get('/admin/login',function (req, res, next) {
    res.render('back/login')
});

router.post('/admin/login',function (req, res, next) {
    loginController.adminLogin(req,res,next);
});


//普通用户登录get
router.get('/login',function (req, res, next) {
    if(req.session.user) {
        if(req.session.user.role == "student"){
            res.redirect('/student/index');
        }else if(req.session.user.role=="teacher"){
            res.redirect('/teacher/index');
        }
    }
    res.render('user/login');
});

//普通用户登录post
router.post('/login',function (req, res, next) {
    loginController.userLogin(req,res,next);
});
module.exports = router;
