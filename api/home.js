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
export const checkDealInfo = { //查询今天，昨天，7天的信息
    url: '/shop/manage/dashboard/deal-info',
    data: {
        type: 'today'
    },
    headers: {

    },
    type: 'get'
}
export const getStatisticsData = { //数据概览
    url: '/shop/manage/statistics/index',
    data: {
        is_yesterday: 0
    },
    headers: {

    },
    type: 'get'
}
export const getGoodStatisticsData = { //商品分析图表查询
    url: '/shop/manage/statistics/goods/chart',
    data: {
        start: 0,
        end: 0
    },
    headers: {

    },
    type: 'get'
}
export const getGoodNumberByDate = { //获取指定日期的商品数
    url: '/shop/manage/statistics/goods/number',
    data: {
        date: ''
    },
    headers: {

    },
    type: 'get'
}
export const goodsTop10 = { //获取前10销售商品
    url: '/shop/manage/statistics/goods/get-top-good',
    data: {
        type: '', //	1:今天，2:昨天，3:7天，4:自定义
        start: '', //	自定义开始时间
        end: '' //	自定义结束时间
    },
    headers: {

    },
    type: 'get'
}
export const vipsTop10 = { //获取前10销售商品
    url: '/shop/manage/statistics/member/get-top-member',
    data: {
        type: '', //	1:今天，2:昨天，3:7天，4:自定义
        start: '', //	自定义开始时间
        end: '' //	自定义结束时间
    },
    headers: {

    },
    type: 'get'
}