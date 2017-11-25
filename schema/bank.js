const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = mongoose.Schema({
    user_id:[{type:Schema.Types.ObjectId,ref:'Teacher'}],
    subject:String,//学科
    type: String,//题型
    tips:String,//知识点
    level:String,//难度
    public:Boolean,//是否公开
    question:String,//题目
    filepath:Array,//题目图片
    answer:String,//答案
    createTime:{
        type:Date,
        default:Date.now
    },//创建时间
    updateTime:{
        type:Date,
        default:Date.now
    },//更新时间
},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

mongoose.model('Bank', BankSchema);

