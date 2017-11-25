var express = require('express');
var router = express.Router();
var schoolController = require('../../controller/superuser/school')
var adminController = require('../../controller/superuser/admin')

const mongoose = require('mongoose');
const db = mongoose.connection;
const School = mongoose.model('School');

const path = 'backend/superuser/';

router.get('/', function (req, res, next) {
    res.render('backend/index', {title: '超级用户系统',user:{
        name:'超级管理员',
        flag:'rooter'
    }});
});

/** 学校管理 **/
router.get('/school', function (req, res, next) {
    res.render(path + 'school_manager', {title: '学校管理'});
});

router.get('/addschool', function (req, res, next) {
    res.render(path + 'school_op', {title: '学校管理'});
});

router.get('/updateschool/:id', function (req, res, next) {
    schoolController.updateSchoolGet(req, res, next);
});

router.get('/schoolinfo', function (req, res, next) {
    schoolController.schoolInfo(req, res, next);
});

router.post('/addschool', function (req, res, next) {
    schoolController.createSchool(req, res, next);
});

router.post('/updateschool', function (req, res, next) {
    schoolController.updateSchool(req, res, next);
});

router.delete('/delschool', function (req, res, next) {
    schoolController.delSchool(req, res, next);
});

router.delete('/delselschool', function (req, res, next) {
    schoolController.delSelectSchool(req, res, next);
});
/** 学校管理 **/

/**
 * 管理员管理
 */

router.get('/admin', function (req, res, next) {
    res.render(path + 'admin_manager', {title: '管理员管理'});
});

router.get('/addadmin', function (req, res, next) {
    adminController.addAdminGet(req, res, next);
});

router.get('/admininfo', function (req, res, next) {
    adminController.adminInfo(req, res, next);
})

router.get('/updateadmin/:id', function (req, res, next) {
    adminController.updateAadminGet(req, res, next);
});

router.post('/addadmin', function (req, res, next) {
    adminController.addAdminPost(req, res, next);
});


router.post('/updateadmin', function (req, res, next) {
    adminController.updateAdminPost(req, res, next);
});

router.delete('/deladmin', function (req, res, next) {
    adminController.delAdmin(req, res, next);
});

router.delete('/delseladmin', function (req, res, next) {
    adminController.delSelectAdmin(req, res, next);
});

/**
 * 管理员管理
 */

module.exports = router;