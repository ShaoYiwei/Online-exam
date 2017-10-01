var mongoose = require('mongoose');

var TeacherSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    name:String, //真实姓名
    subject:[],//教师所教科目
    remarks:String,//备注
});