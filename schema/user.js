/**
 * Created by HUI on 16/9/9.
 */
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    name:String, //真实姓名
    type:String,//用户种类
    subject:[],//教师所教科目
    score:[],//学生成绩
    remarks:String,//备注
});

mongoose.model('User', UserSchema);