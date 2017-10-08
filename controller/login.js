
const mongoose = require('mongoose');
const db = mongoose.connection;
const Student = mongoose.model('Student');
const Teacher = mongoose.model('Teacher');
/**
 * 超级管理员登陆
 * @param req
 * @param res
 * @param next
 */
exports.adminLogin = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    let user_session = {
        username: username,
        password: password,
        role: 'rooter'
    };
    if (username == 'admin' && password == '123456') {
        req.session.user = user_session;
        res.redirect('/admin/index');
    }
    else {
        res.render('back/login', {username: username, error: '用户名或密码不正确'});
    }
}

/**
 * 普通用户登录
 * @param req
 * @param res
 * @param next
 */
exports.userLogin = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    let role;
    if(req.body.role=="1"){
        role = "student";
    }else if(req.body.role =="2"){
        role = "teacher";
    }else{
        res.render('user/login',{username:username,error:'系统错误'});
        return;
    }
    let user_session = {
        username: username,
        password: password,
        role: role
    };

    if(role === "student"){
        Student.findOne({username:username,password:password},function (err,docs) {
            if(err){
                res.end(err);
            }else{
                if(!docs || docs.length == 0){
                    res.render('user/login', {username: username, error: '用户名或密码错误'});
                }else{
                    user_session.name = docs.name;
                    req.session.user = user_session;
                    res.redirect('/student/index')
                }
            }
        });
    }else if(role=="teacher"){
        Teacher.findOne({username:username,password:password},function (err,docs) {
            if(err){
                res.end(err);
            }else{
                if(!docs || docs.length == 0){
                    res.render('user/login', {username: username, error: '用户名或密码错误'});
                }else{
                    user_session.subject = docs.subject;
                    user_session.name = docs.name;
                    req.session.user = user_session;
                    res.redirect('/teacher/index')
                }
            }
        });
    }else{
        res.render('user/login', {username: username, error: '未知错误'});
    }
}