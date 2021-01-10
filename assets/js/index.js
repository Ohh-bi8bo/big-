
$(function (){
    //获取用户信息
    getUserInfo()
    function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function (res){
            console.log(res)
            if(res.status!==0){
                return layui.layer.msg('获取失败')
            }
            //调用renderAvatar函数渲染头像
            renderAvatar(res.data)
            // console.log(res)
        }
    })
    }
    // 渲染用户的头像
    function renderAvatar(user){
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        //渲染头像
        if(user.user_pic !==null){
        $('.layui-nav-img').attr('src',"user_pic").show();
        $('.text-avatar').hide()
        }else{
            //渲染文本头像
            $('.layui-nav-img').hide()
            //toUpperCase将小写转换为大写
            var first=name[0].toUpperCase()
            $('.text-avatar').html(first).show()

        }
    }
    var layer=layui.layer
    $('#btnLogout').on('click', function(e) {
        // 提示用户是否确认退出
        e.preventDefault()
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = 'login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})