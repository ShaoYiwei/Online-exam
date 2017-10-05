var Joi = require('joi')
const mongoose = require('mongoose');
const db = mongoose.connection;
const Student = mongoose.model('Student');

/**
 * 学生信息
 * @param req
 * @param res
 * @param next
 */
exports.stuInfo = function (req, res, next) {
    Student.find({}, function (err, docs) {
        res.json({
            code: 0,
            msg: "",
            count: docs.length,
            data: docs
        });
    });
}

/**
 * 创建学生
 * @param req
 * @param res
 * @param next
 */
exports.createstu = function (req, res, next) {
    let register_info = {};
    register_info.username = req.body.username;
    register_info.password = req.body.password;
    register_info.sex = req.body.sex;
    register_info.className = req.body.className;
    register_info.name = req.body.name;
    register_info.remarks = req.body.remarks;

    let schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        name: Joi.string().required(),
        remarks: Joi.string().required(),
        className: Joi.string().required(),
        sex:Joi.string().required()
    });

    Joi.validate(register_info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render('back/stu_op', {user: register_info, error: error});
        } else {
            Student.find({username: register_info.username}, function (err, docs) {
                if (err) {
                    res.end(err)
                } else {
                    if (docs.length == 0) {
                        let user = new Student(register_info);

                        user.save(function (err) {
                            if (err) {
                                res.end(err);
                            } else {
                                res.redirect('/admin/stuindex')
                            }
                        })
                    } else {
                        res.render('back/stu_op', { error: {message: '用户名已被使用'},title:'教师管理'});
                    }
                }
            })
        }
    });
}


exports.updatestu = function (req, res, next) {
    let register_info = {};
    register_info.username = req.body.username;
    register_info.password = req.body.password;
    register_info.sex = req.body.sex;
    register_info.className = req.body.className;
    register_info.name = req.body.name;
    register_info.remarks = req.body.remarks;

    let schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        name: Joi.string().required(),
        remarks: Joi.string().required(),
        className: Joi.string().required(),
        sex:Joi.string().required()
    });

    Joi.validate(register_info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render('back/stu_op', {userModify: register_info, error: error,title:'学生管理'});
        } else {
            Student.find({username: register_info.username}, function (err, doc) {
                if (err) {
                    res.end(err)
                } else {
                    Student.update({username: register_info.username}, {
                        $set: register_info
                    }, function (err, next) {
                        if (err) {
                            res.end(err);
                            return next();
                        }
                        res.redirect('/admin/stuindex')
                    })
                }
            });
        }
    });
}


exports.updateStuGet = function (req, res, next) {
    Student.find({username: req.params.username}, function (err, docs) {
        if (err) {
            res.end(err);
        }
        res.render('back/stu_op', {title: '学生管理', userModify: docs[0]});
    });
}


exports.delStu = function (req, res, next) {
    if (req.session.user.role === 'rooter') {
        Student.findOne({_id: req.params.id}, function (err, doc) {
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