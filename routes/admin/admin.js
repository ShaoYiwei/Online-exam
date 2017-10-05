var express = require('express');
var router = express.Router();
var teacherController = require('../../controller/admin/teacher')
var stuController = require('../../controller/admin/student')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('back/admin', {title: '教师管理'});
});

router.get('/logout',function (req, res, next) {
    if(req.session.user){
        req.session.user = undefined;
    }
    res.redirect('/admin/login')
})


router.get('/index', function (req, res, next) {
    res.render('back/admin', {title: "教师管理"});
});

router.get('/createteacher', function (req, res, next) {
    res.render('back/teacher_op', {title: "教师管理"});
});

router.get('/teacherinfo', function (req, res, next) {
    teacherController.teacherInfo(req, res, next);
});
router.get('/updateteacher/:username', function (req, res, next) {
    teacherController.updateTeacherGet(req, res, next);
});

router.get('/stuindex', function (req, res, next) {
    res.render('back/stu_admin', {title: "学生管理"})
});

router.get('/createstu', function (req, res, next) {
    res.render('back/stu_op', {title: "学生管理"})
});

router.get('/stuinfo', function (req, res, next) {
    stuController.stuInfo(req, res, next);
});

router.get('/updatestu/:username', function (req, res, next) {
    stuController.updateStuGet(req, res, next);
});

router.post('/createteacher', function (req, res, next) {
    teacherController.createTeacher(req, res, next);
});

router.post('/updateteacher', function (req, res, next) {
    teacherController.updateTeacher(req, res, next)
});

router.post('/createstu', function (req, res, next) {
    stuController.createstu(req, res, next);
});

router.post('/updatestu', function (req, res, next) {
    stuController.updatestu(req, res, next);
})

router.delete('/delteacher/:id', function (req, res, next) {
    teacherController.delTeacher(req, res, next);
});

router.delete('/delstu/:id', function (req, res, next) {
    stuController.delStu(req, res, next);
});

module.exports = router;