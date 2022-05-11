$(function () {
    getUserInfo()
    let layer = layui.layer
    $('#logOut').on('click', function () {
        layer.confirm('退出当前账号?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })

})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('登录失败!')
            }
            render(res.data)
        },
    })

}
function render(user) {
    let name = user.nickname || user.username
    $('.welcome i').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.firstWord').hide()
    } else {
        $('.firstWord').show()
        $('.layui-nav-img').hide()
    }

}