var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    name:String, //真实姓名
    sex:String,//性别
    className:String,//学生班级
    score:[],//学生各科的成绩
    remarks:String,//备注
});

mongoose.model('Student', StudentSchema);