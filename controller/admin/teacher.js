var Joi = require('joi')
const mongoose = require('mongoose');
const db = mongoose.connection;
const Teacher = mongoose.model('Teacher');
/**
 * 创建教师
 * @param req
 * @param res
 * @param next
 */
exports.createTeacher = function (req,res,next) {
    let register_info = {};
    register_info.username = req.body.username;
    register_info.password = req.body.password;
    register_info.subject = (req.body.subject).split(/,|，/);
    register_info.name = req.body.name;
    register_info.remarks = req.body.remarks;
    register_info.subject_name = req.body.subject;

    let schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        name: Joi.string().required(),
        subject: Joi.array().unique(),
        remarks: Joi.string().required(),
        subject_name: Joi.string().required()
    });

    Joi.validate(register_info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render('back/teacher_op', {user: register_info, error: error});
        } else {
            Teacher.find({username: register_info.username}, function (err, docs) {
                if (err) {
                    res.end(err)
                } else {
                    if (docs.length == 0) {
                        let user = new Teacher(register_info);

                        user.save(function (err) {
                            if (err) {
                                res.end(err);
                            } else {
                                res.redirect('/admin/index')
                            }
                        })
                    } else {
                        res.render('back/teacher_op', {user: register_info, error: {title:'教师管理',message: '用户名已被使用'}});
                    }
                }
            })
        }
    });
}

/**
 * 更新教师信息
 * @param req
 * @param res
 * @param next
 */
exports.updateTeacher = function (req, res, next) {
    let register_info = {};
    register_info.username = req.body.username;
    register_info.password = req.body.password;
    register_info.subject = (req.body.subject).split(/,|，/);
    register_info.name = req.body.name;
    register_info.remarks = req.body.remarks;
    register_info.subject_name = req.body.subject;

    let schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        name: Joi.string().required(),
        subject: Joi.array().unique(),
        remarks: Joi.string().required(),
        subject_name: Joi.string().required()
    });

    Joi.validate(register_info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render('back/teacher_op', {userModify: register_info, error: error});
        } else {
            Teacher.find({username: register_info.username}, function (err, doc) {
                if (err) {
                    res.end(err)
                } else {
                    Teacher.update({username: register_info.username}, {
                        $set: register_info
                    }, function (err, next) {
                        if (err) {
                            res.end(err);
                            return next();
                        }
                        res.redirect('/admin/index')
                    })
                }
            });
        }
    });
}

/**
 * 教师信息
 * @param req
 * @param res
 * @param next
 */
exports.teacherInfo = function (req, res, next) {
    Teacher.find({}, function (err, docs) {
        res.json({
            code: 0,
            msg: "",
            count: docs.length,
            data: docs
        });
    });
}

/**
 * 更新教师Get请求
 * @param req
 * @param res
 * @param next
 */
exports.updateTeacherGet = function (req, res, next) {
    Teacher.find({username: req.params.username}, function (err, docs) {
        if (err) {
            res.end(err);
        }
        res.render('back/teacher_op', {title: '教师管理', userInfo: docs[0]});
    });
}

/**
 * 删除用户信息
 * @param req
 * @param res
 * @param next
 */
exports.delTeacher = function (req, res, next) {
    if (req.session.user.role === 'rooter') {
        Teacher.findOne({_id: req.params.id}, function (err, doc) {
            if (err) {
                res.end('err', err);
                next();
            } else {
                doc.remove();
                res.status(200).send(doc);
            }
        })
    } else {
        res.status(400).send({message: '权限不足'});
    }
}