/**
 * Created by HUI on 13/04/2017.
 */

$().ready(function() {
    var layer,form;
    layui.use(['layer','form'], function () {
        layer = layui.layer; //弹层
        form = layui.form;
        const error=$('#error').text()
        if(error){
            layer.alert(error)
        }

        form.verify({
            username: function(value, item){ //value：表单的值、item：表单的DOM对象
                if(!new RegExp("^[a-zA-Z0-9]{6,18}$").test(value)){
                    return '用户名不符合规则';
                }
            }
            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,pass: [
                /^[a-zA-Z0-9]{6,18}$/
                ,'密码必须6到18位，只能是数字和字母'
            ]
        });
    });
// 在键盘按下并释放及提交后验证提交表单

});