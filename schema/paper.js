/**
 * Created by HUI on 2016/10/27.
 */
var mongoose = require('mongoose');

var PaperSchema = mongoose.Schema({
    user_id:String,
    subject:String,
    tips:Array,
    level:String,
    data:Array,
    date:Date,
    filename:String
});
mongoose.model('Paper', PaperSchema);