let table,layer,form;
layui.use(['layer', 'table'], function () {
    table = layui.table; //表格
    layer = layui.layer; //弹层\
    form = layui.form;//表单
    //监听工具条

    var tabObj = table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        ,height: 600 //容器高度
        ,url: '/teacher/bankinfo'
        ,page:true
        ,id:'idTest'
        ,cols: [[
            {field:'_id', width:'10%' ,title:'ID'},
            {field:'name', width:'60%',title:'题目名'},
            {field:'type',width:'10%', title:'类型'},
            {fixed: 'right', width:'19%', align:'center', toolbar: '#barDemo'}
        ]], //设置表头
    });

    //查询按钮
    $('.searchBtn').click(function () {
        let data = {
            name:$('#name').val()
        }
        reload(tabObj,data);
    });

    //批量删除
    $('.batchDel').click(function () {
        var checkStatus = table.checkStatus('idTest')
            ,data = checkStatus.data;
        console.log(table)
        layer.confirm('真的删除行么', function (index) {
            //向服务端发送删除指令
            delete_all(layer,index,'/rooter/delselschool',JSON.stringify(data),function () {
                let data = {
                    name:$('#name').val()
                }
                reload(tabObj,data);
            });
        });
    });

    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        console.log(obj)
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                var data = {
                    id:obj.data._id
                }
                //向服务端发送删除指令
                delete_obj(obj,layer,index,'/rooter/delschool',JSON.stringify(data));
            });
        } else if (layEvent === 'edit') {
            window.location.href = "/rooter/updateschool/" + obj.data._id;
        }
    });
});

/**
 * 浏览试题
 * @param self
 */
function show_question(self) {
    $.ajax({
        url: '/api/findQuestion/'+self.id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (a) {
            // layer.load(1, {
            //     shade: [0.1, '#fff'] //0.1透明度的白色背景
            // });
        },
        success: function (qd) {
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    type: 1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '240px'], //宽高
                    content: '科目：'+qd[0].subject+'<br>题型：'+qd[0].type+'<br>知识点：'+qd[0].tips+'<br>难度：'+qd[0].level+'<br>题目：'+qd[0].question+'<br>答案：'+qd[0].answer+'<br>'
                });
            });
        },
        error: function () {
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    type: 1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '240px'], //宽高
                    content: '信息获取失败'
                });
            });
        }
    })
}

function delete_question(self) {
    $.ajax({
        url: '/api/bank/'+self.name+'/delete',
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
            location.reload()
        },
        error: function () {
            layer.alert('你无权限删除此条题目')

        }
    })
}

function add(self) {
    $.ajax({
        url: '/api/addtomybank/'+self.id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (a) {
            // layer.load(1, {
            //     shade: [0.1, '#fff'] //0.1透明度的白色背景
            // });
        },
        success: function (qd) {
            location.reload()
        },
        error: function () {
            layer.alert('添加失败')
            console.log('delete failed');

        }
    })
}

function remove(self) {
    $.ajax({
        url: '/api/movefrommybank/'+self.id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (a) {
            // layer.load(1, {
            //     shade: [0.1, '#fff'] //0.1透明度的白色背景
            // });
        },
        success: function (qd) {
            location.reload()
        },
        error: function () {
            layer.alert('移除失败')
            console.log('delete failed');

        }
    })
}


function cancel(self) {
    $.ajax({
        url: '/api/cancelshare/'+self.id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (a) {
            // layer.load(1, {
            //     shade: [0.1, '#fff'] //0.1透明度的白色背景
            // });
        },
        success: function (qd) {
            location.reload()
        },
        error: function () {
            layer.alert('取消失败')
            console.log('delete failed');

        }
    })
}

function edit(self) {
    $.ajax({
        url: '/api/edit_question/'+self.name,
        type: 'get',
        dataType: 'text',
        contentType: 'application/json',
        beforeSend: function (a) {
            // layer.load(1, {
            //     shade: [0.1, '#fff'] //0.1透明度的白色背景
            // });
        },
        success: function (qd) {
            window.location.href='/edit_question/'+self.name
        },
        error: function () {
            layer.alert('你没有权限编辑此题目')
        }
    })
}