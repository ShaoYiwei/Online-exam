layui.use(['layer', 'table'], function () {
    var table = layui.table, //表格
        layer = layui.layer; //弹层
    //监听工具条

    var tabObj = table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        ,height: 600 //容器高度
        ,url: '/rooter/schoolinfo'
        ,checkbox:true
        ,page:true
        ,id:'idTest'
        ,cols: [[
            {checkbox:true, fixed: true},
            {field:'_id', width:240 ,title:'ID'},
            {field:'name', width:240,title:'学校名'},
            {field:'content',width:480, title:'学校信息'},
            {fixed: 'right', width:300, align:'center', toolbar: '#barDemo'}
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