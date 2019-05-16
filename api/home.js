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
    data: {
        
    },
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



export const getGoodDataByDate = { //获取指定日期的商品分析图表查询
    url: '/shop/manage/statistics/goods/chart',
    data: {
        start: '',
        end: ''
    },
    headers: {

    },
    type: 'get'
}
export const getVipDataByDate = { //获取指定日期的会员分析
    url: '/shop/manage/statistics/member',
    data: {
        start: '',
        end: ''
    },
    headers: {

    },
    type: 'get'
}
export const getTradeDataByDate = { //获取指定日期的交易分析
    url: '/shop/manage/statistics/trade',
    data: {
        start: '',
        end: ''
    },
    headers: {

    },
    type: 'get'
}

export const getHistoryData = { //获取历史成交数
    url: '/shop/manage/statistics/trade/get-all-pay-price',
    data: {},
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

export const vipList = { //会员列表读取
    url: '/shop/manage/member/list',
    data: {
        keywords: '',
        tag_id: '',
        level_id: '',
        create_times: [],
        come_from: '',
        sort: '',
        buy: '',
        page: 1,
        pagesize: 20,
        create_time: '',
    },
    headers: {

    },
    type: 'get'
}

export const vipDetail = { //会员详情(单个)
    url: '/shop/manage/member/get',
    data: {
        id: ''
    },
    headers: {

    },
    type: 'get'
}
export const vipTradeInfo = { //获取会员交易信息
    url: '/shop/manage/member/get-trade',
    data: {
        member_id: ''
    },
    headers: {

    },
    type: 'get'
}

export const changeCommissionStatus = { //审核/取消审核分销商
    url: '/shop/apps/commission/manage/agent/change-status',
    data: {
        member_id: '',
        status: '' //	状态 0: 取消审核 1: 审核
    },
    headers: {

    },
    type: 'post'
}
export const manualCommissionStatus = { //手动设置成为分销商
    url: '/shop/apps/commission/manage/agent/manual-commission',
    data: {
        member_id: '', 
    },
    headers: {

    },
    type: 'post'
}
export const changeVipMoney = { //余额充值
    url: '/shop/manage/member/recharge/balance',
    data: {
        member_id: '',
        sum: '', //充值数量 正数添加余额, 负数减少积分
        remark: '' //	 
    },
    headers: {

    },
    type: 'post'
}


export const changeVipScore = { //积分充值
    url: '/shop/manage/member/recharge/credit',
    data: {
        member_id: '',
        sum: '', //充值数量 正数添加余额, 负数减少积分
        remark: '' //	 
    },
    headers: {

    },
    type: 'post'
}
export const getCouponList = { //获取可发送优惠券列表
    url: '/shop/manage/member/coupon/list',
    data: {
        keywords: ''
    },
    headers: {

    },
    type: 'get'
}
export const getVipCoupons = { //获取已领取列表
    url: '/shop/manage/member/coupon/record',
    data: {
        member_id: '',
        status: '' //	0: 全部 1: 未使用 2: 已使用 3: 已失效
    },
    headers: {

    },
    type: 'get'
}
export const sendCoupon = {//发送优惠券
    url: '/shop/manage/member/coupon/send',
    data: {
        // coupon_id:'',//	优惠券ID int或array
        // member_id: '',//	会员ID int或array
        // coupon_count: '' //	优惠券数量 int或array
    },
    headers: {

    },
    type: 'post'
}
export const Jurisdiction = {//查看权限
    url: '/shop/manage/perm/get',
    data: {
    },
    headers: {

    },
    type: 'get'
}