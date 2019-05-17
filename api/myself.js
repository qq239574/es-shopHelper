export const myInfo = { //获取用户信息
    url: '/api/site/account/profile/get-info',
    data: {

    },
    headers: {

    },
    type: 'get'
}
export const myAccount={//获取账号信息
    url: '/api/site/account/login',
    data: {

    },
    headers: {

    },
    type: 'get'
}
export const changeUserInfo = { //修改用户名,用户联系方式
    url: '/api/site/account/profile/set',
    data: { 
    },
    headers: {

    },
    type: 'post'
}
export const changeUserPassword = { //修改用户密码
    url: '/api/site/account/change-password',
    data: {
        original_password: '',
        new_password: ''
    },
    headers: {

    },
    type: 'post'
}