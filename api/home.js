export const shoplist = { //获取店铺列表

    url: '/api/site/account/shops/list',
    data: {
        keywords: ''
    },
    headers: {

    },
    type: 'get'
}
export const homeInfo = { //首页信息
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
         
    },
    type: 'get'
}
export const checkDealInfo = {//查询今天，昨天，7天的信息
    url: '/shop/manage/dashboard/deal-info',
    data: {
        type: 'today'
    },
    headers: {
         
    },
    type: 'get'
}