var express = require('express');
var router = express.Router();
var schoolController = require('../../controller/superuser/school')

const mongoose = require('mongoose');
const db = mongoose.connection;
const School = mongoose.model('School');

/** 学校管理 **/
router.get('/', function (req, res, next) {
    res.render('superuser/school_manager', {title: '学校管理'});
});

router.get('/addschool', function (req, res, next) {
    res.render('superuser/school_op', {title: '学校管理'});
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
/** 学校管理 **/

/**
 * 管理员管理
 */

router.get('/admin', function (req, res, next) {
    res.render('superuser/admin_manager', {title: '管理员管理'});
});

router.get('/addadmin', function (req, res, next) {

    School.find({},function (err, docs) {
        if(err){
            res.render('superuser/admin_op', {title: '管理员管理'});
        }

        res.render('superuser/admin_op', {title: '管理员管理',schoolList:docs});

    })

});

/**
 * 管理员管理
 */

module.exports = router;