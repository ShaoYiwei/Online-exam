layui.use(['layer', 'table'], function () {
    var table = layui.table, //表格
        layer = layui.layer; //弹层
    //监听工具条
    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {

                //向服务端发送删除指令
                delete_teacher(obj,layer,index);
            });
        } else if (layEvent === 'edit') {
            window.location.href = "/admin/updatestu/"+obj.data.username;
        }
    });
});

function delete_teacher(self,layer,index) {
    $.ajax({
        url: '/admin/delstu/'+self.data._id,
        type: 'delete',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (a) {
            // layer.load(1, {
            //     shade: [0.1, '#fff'] //0.1透明度的白色背景
            // });
        },
        success: function (qd) {
            console.log('delete success'+qd[0]);
            self.del(); //删除对应行（tr）的DOM结构
            layer.close(index);
        },
        error: function () {
            layer.alert('你无权限删除此条题目')
        }
    })
}
