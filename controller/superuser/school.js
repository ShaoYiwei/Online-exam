var Joi = require('joi');
const mongoose = require('mongoose');
const db = mongoose.connection;
const School = mongoose.model('School');

/**
 * 学校信息
 * @param req
 * @param res
 * @param next
 */
exports.schoolInfo = function (req, res, next) {
    let page=~~req.query.page;
    let rows=~~req.query.limit;
    let schoolname=req.query.name;
    let query=School.find({});
    query.skip((page-1)*rows);
    query.limit(rows);
    query.where({
        name:new RegExp(schoolname)
    })
    query.exec(function (err, result) {
        if(err){
            res.end(err)
        }else{
            School.find({ name:new RegExp(schoolname)}, function (err, docs) {
                res.json({
                    code: 0,
                    msg: "",
                    count: docs.length,
                    data: result
                });
            });
        }
    });
}


/**
 * 创建学校
 * @param req
 * @param res
 * @param next
 */
exports.createSchool = function (req, res, next) {
    let register_info = {};
    register_info.name = req.body.name;
    register_info.content = req.body.content;
    register_info.remarks = req.body.remarks;

    let schema = Joi.object().keys({
        name: Joi.string().required(),
        remarks: Joi.string().required(),
        content: Joi.string().required(),
    });

    Joi.validate(register_info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render('superuser/school_op', {school: register_info, error: error});
        } else {
            School.find({name: register_info.name}, function (err, docs) {
                if (err) {
                    res.end(err)
                } else {
                    if (docs.length == 0) {
                        let user = new School(register_info);
                        user.save(function (err) {
                            if (err) {
                                res.end(err);
                            } else {
                                res.redirect('/rooter/')
                            }
                        })
                    } else {
                        res.render('superuser/school_op', { error: {message: '学校名已存在'},title:'学校管理'});
                    }
                }
            })
        }
    });
}


exports.updateSchoolGet = function (req, res, next) {
    School.find({_id: req.params.id}, function (err, docs) {
        if (err) {
            res.end(err);
        }
        res.render('superuser/school_op', {title: '学校管理', schoolModify: docs[0]});
    });
}

exports.updateSchool = function (req, res, next) {
    let register_info = {};
    register_info.name = req.body.name;
    register_info.content = req.body.content;
    register_info.remarks = req.body.remarks;

    let schema = Joi.object().keys({
        name: Joi.string().required(),
        remarks: Joi.string().required(),
        content: Joi.string().required(),
    });

    Joi.validate(register_info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render('superuser/school_op', {schoolModify: register_info, error: error,title:'学校管理'});
        } else {
            School.find({name: register_info.name}, function (err, doc) {
                if (err) {
                    res.end(err)
                } else {
                    School.update({username: register_info.username}, {
                        $set: register_info
                    }, function (err, next) {
                        if (err) {
                            res.end(err);
                            return next();
                        }
                        res.redirect('/rooter/')
                    })
                }
            });
        }
    });
}

exports.delSchool = function (req, res, next) {
    if (req.session.user.role === 'rooter') {
        School.findOne({_id: req.body.id}, function (err, doc) {
            if (err) {
                res.end(err);
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



