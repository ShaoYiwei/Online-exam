var Joi = require('joi')
const mongoose = require('mongoose');
const db = mongoose.connection;
const Teacher = mongoose.model('Teacher');
const path = 'backend/admin/';
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
            res.render(path+'teacher_op', {user: register_info, error: error});
        } else {
            register_info.school_id = req.session.user.school;
            Teacher.find({username: register_info.username,school_id:register_info.school_id}, function (err, docs) {
                if (err) {
                    res.end(err)
                } else {
                    if (docs.length == 0) {
                        let user = new Teacher(register_info);
                        user.save(function (err) {
                            if (err) {
                                res.end(err);
                            } else {
                                res.redirect('/admin/teacher');
                            }
                        })
                    } else {
                        res.render(path+'teacher_op', {user: register_info, error: {title:'教师管理',message: '用户名已被使用'}});
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
            res.render(path+'teacher_op', {teacherModify: register_info, error: error,id:req.body.id});
        } else {
            Teacher.find({username: register_info.username,school_id:req.session.user.school}, function (err, docs) {
                if (err) {
                    res.end(err)
                } else {
                    if(docs.length>0){
                        res.render(path+'teacher_op', {teacherModify: register_info, error: {message:'已存在用户名'},id:req.body.id});
                    }else{
                        Teacher.update({_id:req.body.id}, {
                            $set: register_info
                        }, function (err, next) {
                            if (err) {
                                res.end(err);
                                return next();
                            }
                            res.redirect('/admin/teacher')
                        })
                    }
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
    let page = ~~req.query.page;
    let rows = ~~req.query.limit;
    let name = req.query.name;
    let school_id = req.session.user.school;
    let query = Teacher.find({school_id:school_id});
    query.skip((page - 1) * rows);
    query.limit(rows);
    query.where({
        name: new RegExp(name)
    });
    query.exec(function (err,docs) {
        if(err){
            res.error(err);
        }else{
            Teacher.find({school_id:school_id}, function (err, result) {
                if(err){
                    res.error(err);
                }else{
                    res.json({
                        code: 0,
                        msg: "",
                        count: result.length,
                        data: docs
                    });
                }
            });
        }
    })
}

/**
 * 更新教师Get请求
 * @param req
 * @param res
 * @param next
 */
exports.updateTeacherGet = function (req, res, next) {
    Teacher.findOne({_id: req.params.id}, function (err, doc) {
        if (err) {
            res.end(err);
        }
        res.render(path+'teacher_op', {title: '教师管理', teacherModify: doc,id:req.params.id});
    });
}

/**
 * 删除用户信息
 * @param req
 * @param res
 * @param next
 */
exports.delTeacher = function (req, res, next) {
        Teacher.findOne({_id: req.body.id}, function (err, doc) {
            if (err) {
                res.status(400, err);
                next();
            } else {
                doc.remove();
                res.status(200).send(doc);
            }
        })
}