/**
 * Created by HUI on 16/9/10.
 */
var mongoose = require('mongoose');

var BankSchema = mongoose.Schema({
    user_id:Array,
    subject:String,//学科
    type: String,//题型
    tips:String,//知识点
    level:String,//难度
    public:Boolean,//是否公开
    question:String,//题目
    filepath:Array,//题目文件
    answer:String,//答案
});


mongoose.model('Bank', BankSchema);