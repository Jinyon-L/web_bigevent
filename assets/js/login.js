$(function () {

    // 登录\注册切换
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 验证
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听表单提交
    let layer = layui.layer

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功!');
            $('#link-login').click()
        })

    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $('#form_login').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户名或密码错误!')

                }
                layer.msg('登陆成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })



})