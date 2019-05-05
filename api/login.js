export const login = { //用户登录
    url: '/api/site/account/login/post',
    data: {
        account: 'yilianxinpin',
        password: 'Qm8xn4KVBMc0Wd70'
    },
    headers: {},
    type: 'post'
}
export const sessionid = { //获取sessionid
    url: '/shop/api/site/account/login/get-sessionid',
    data: {

    },
    headers: {

    },
    type: 'get'
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

export const switchShop = { //选择(切换)店铺
    url: '/api/site/account/shops/switch',
    data: {
        id: '',
        enter_flag: 1
    },
    headers: {},
    type: 'get'

}
export const beforeSendVfCode = {
    url: '/utility/captcha/get',
    data: {
        type: 'forget',
        width: 135,
        height: 32,
        timestamp: new Date().getTime()
    },
    headers: {},
    type: 'get'

}
export const initPassword = { //忘记密码-初始化
    url: '/api/site/account/forget',
    data: {

    },
    headers: {},
    type: 'get'
}
export const sendVfCode = { //发送短信验证码
    url: '/api/site/account/verify-code/send',
    data: {
        account: '',
        session_id: '',
        captcha_code: '',
        action: '',
        type: ''
    },
    headers: {},
    type: 'post'

}

export const setForgetPassword = { //找回密码
    url: '/api/site/account/forget/post',
    data: {
        session_id: '',
        type: '',
        account: '',
        captcha_code: '',
        verify_code: '',
        action: '',
        question: '',
        answer: '',
        password: ''

    },
    headers: {},
    type: 'post'
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

export const getSettings = { //获取站点信息
    url: '/api/site/settings/get',
    data: {},
    headers: {},
    type: 'get'
}

export const wechatLogin = { //小程序获取登录session
    url: '/shop/manage/wx-app/wx-app-login',
    data: {
        code: ''
    },
    headers: {},
    type: 'post'
}
export const bindWechat = {//小程序管理中心绑定微信登录
    url: '/shop/manage/wx-app/bind',
    data: {
        encrypted_data: '',
        session_key:'',
        iv:'',
        user_id:''
    },
    headers: {},
    type: 'post'
}