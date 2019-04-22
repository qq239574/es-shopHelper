export const login = { //用户登录
    url: '/api/site/account/login/post',
    data: {
        account: 'yilianxinpin',
        password: 'Qm8xn4KVBMc0Wd70'
    },
    headers: {},
    type: 'post'
}
export const loginCheck = { //用户登录前检测[进入登录页面]
    url: '/api/site/account/login',
    data: {

    },
    headers: {},
    type: 'get'
}
export const changePassword = { //修改密码
    url: '/api/site/account/change-password',
    data: {
        original_password: '',
        new_password: ''
    },
    headers: {},
    type: 'post'
}
export const beforeSendVfCode = {
    url: ' http://user.qdev.eldev.cn/utility/captcha/get',
    data: {
        type: 'forget',
        width: 135,
        height: 32,
        timestamp: new Date().getTime()
    },
    headers: {},
    type: 'get'

}
export const sendVfCode = { //
    url: 'api/site/account/verify-code/send',
    data: {

    },
    headers: {},
    type: 'get'

}

export const verifyCode = { //找回密码验证验证码
    url: '/api/site/account/forget/verify-code',
    data: {
        session_id: '',
        type: '',
        account: '',
        verify_code: '',
        question: '',
        answer: ''
    },
    headers: {},
    type: 'post'
}
export const getSessionid = { //获取sessionid
    url: '/shop/api/site/account/login/get-sessionid',
    data: {
        session_id: '',
        type: '',
        account: '',
        verify_code: '',
        question: '',
        answer: ''
    },
    headers: {},
    type: 'get'
}