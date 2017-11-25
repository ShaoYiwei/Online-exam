let upload, layer, form;
layui.use(['layer', 'form', 'upload'], function () {
    upload = layui.upload;
    layer = layui.layer;
    form = layui.form;
    var files;
    //多文件列表示例
    var demoListView = $('#demoList')
        , uploadListIns = upload.render({
        elem: '#testList'
        , url: '/teacher/upload'
        , multiple: true
        , auto: false
        , bindAction: '#testListAction'
        , size: 60
        , choose: function (obj) {
            files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));
                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });
                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                });
                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code == 200) { //上传成功
                console.log(res);
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(res.message[0].filename); //清空操作
                delete files[index]; //删除文件队列已经上传成功的文件
                return;
            }
            this.error(index, upload);
        }
        , error: function (index, upload) {
            var tr = demoListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });

    $('#createBtn').click(function () {
        createQuestion();
    });

    $('#updateBtn').click(function () {
        updateQuestion()
    })

    //创建问题
    function createQuestion() {
        var addQ_obj = {};
        var pic_groups = $("#demoList tr");
        var pic_group = [];
        pic_groups.each(function (index, item) {
            let val = $(item).find('td:last').html();
            if (val.indexOf('<button') < 0) {
                pic_group.push(val);
            }
        })
        addQ_obj.filepath = pic_group
        var tips = document.getElementById("tips");
        // var tips_index = tips.selectedIndex;

        var type = document.getElementById("type");
        var type_index = type.selectedIndex;

        // addQ_obj.filepath="../uploads/"+$("#attachment").val()
        addQ_obj.subject = subject.value;
        addQ_obj.type = type.options[type_index].text;
        addQ_obj.tips = tips.value;
        addQ_obj.level = $("input[name='level']:checked").val();
        addQ_obj.question = $('#question').val();
        addQ_obj.answer = $('#answer').val();
        addQ_obj.public = $("#isPublic").is(':checked');
        if (addQ_obj.tips && addQ_obj.question && addQ_obj.answer) {
            $.ajax({
                url: '/teacher/bank/create',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(addQ_obj),
                beforeSend: function (a) {
                    // layer.load(1, {
                    //     shade: [0.1, '#fff'] //0.1透明度的白色背景
                    // });
                },
                success: function () {
                    layer.open({
                        content: '录入成功',
                        yes: function (index, layero) {
                            window.location.href = '/home '
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                        }
                    })

                },
                error: function () {

                }
            })
        }
        else {
            layer.alert('请填写必要项')
        }
    }

    //更新问题
    function updateQuestion(id) {
        var addQ_obj = {};
        var pic_groups = $(".attachment")
        var pic_group = []
        for (let i = 0; i < pic_groups.length; i++) {
            if ($(pic_groups[i]).val()) {
                pic_group.push("../uploads/" + $(pic_groups[i]).val())
            }
        }
        addQ_obj.filepath = pic_group

        var tips = document.getElementById("tips");
        // var tips_index = tips.selectedIndex;

        var type = document.getElementById("type");
        var type_index = type.selectedIndex;

        // addQ_obj.filepath="../uploads/"+$("#attachment").val()
        addQ_obj.subject = subject.value;
        addQ_obj.type = type.options[type_index].text;
        addQ_obj.tips = tips.value;
        addQ_obj.level = $("input[name='level']:checked").val();
        addQ_obj.question = $('#question').val();
        addQ_obj.answer = $('#answer').val();
        addQ_obj.public = $("#isPublic").is(':checked');
        if (addQ_obj.tips && addQ_obj.question && addQ_obj.answer) {
            $.ajax({
                url: '/api/bank/' + id + '/update',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(addQ_obj),
                beforeSend: function (a) {
                    // layer.load(1, {
                    //     shade: [0.1, '#fff'] //0.1透明度的白色背景
                    // });
                },
                success: function () {
                    layer.open({
                        content: '修改成功',
                        yes: function (index, layero) {
                            history.go(-1)
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                        }
                    })

                },
                error: function () {

                }
            })
        }
        else {
            layer.alert('请填写必要项')
        }
    }

});