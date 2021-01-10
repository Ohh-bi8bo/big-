// 入口函数
$(function () {
    //给登陆和注册绑定跳转事件
    //点击去注册跳转
    $('#link_reg').on('click', function () {
        // 登录显示，注册隐藏
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登陆跳转
    $('#link_login').on('click', function () {
        // 登录隐藏，注册显示
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //验证表单
    //从layui中获取form
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 再次输入密码，要和新密码对比是否一致
        rpwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入的密码不一致';
            }
        },

        // 用户名
        uname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }
    })

    // 监听注册表单的提交事件
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        //先阻止表单默认提交
        e.preventDefault();
        //获取表单数据
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        //ajax提交
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })

    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //先阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token',res.token)
                location.href = 'index.html';
            }
        })
    })
    $.ajaxPrefilter(function (options){
        options.url='http://api-breakingnews-web.itheima.net'+options.url
    })

})