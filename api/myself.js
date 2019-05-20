
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
export const changeUserInfo2 = { //修改员工姓名与联系人
    url: '/shop/manage/setting/operator/edit-manager',
    data: {
        member_id: '',
        name: '',
        contact:''
    },
    headers: {

    },
    type: 'post'
}


export const myInfo = { //获取用户信息
    url: '/shop/manage/setting/operator/get-login-user',
    data: {
       
    },
    headers: {

    },
    type: 'get'
} 


