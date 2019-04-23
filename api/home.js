export const shoplist = { //获取店铺列表

    url: '/api/site/account/shops/list',
    data: {
        keywords: ''
    },
    headers: {

    },
    type: 'get'
}
export const homeInfo = {
    url: '/shop/manage/dashboard',
    data: {},
    headers: {

    },
    type: 'get'
}
export const noticeList = { //获取公告列表
    url: '/shop/manage/site/notice/list',
    data: {},
    headers: {
        title: ''
    },
    type: 'get'
}