export const goodsList = { //发送优惠券
    url: '/shop/manage/goods/list',
    data: {
        status: 1,
        title: '',
        category_ids: '',
        group_ids: '',
        type: '',
        goods_sort: '',
        goods_by: '',
        pagesize: 20,
        page: 1
    },
    headers: {

    },
    type: 'get'
}

export const onOrOffGoods = { //批量上下架
    url: '/shop/manage/goods/change-on-sale-and-stock',
    data: {
        goods_ids: '',
        status: '' //	1上架0下架
    },
    headers: {

    },
    type: 'post'
}
export const tempDelGood = { //批量软删除
    url: '/shop/manage/goods/change-delete',
    data: {
        goods_ids: '',
    },
    headers: {

    },
    type: 'post'
}
export const realDelGood = { //批量删除
    url: '/shop/manage/goods/change-real-delete',
    data: {
        goods_ids: '',
    },
    headers: {

    },
    type: 'post'
}
export const recycleDelGood = { //批量恢复
    url: '/shop/manage/goods/change-recycle',
    data: {
        goods_ids: '',
    },
    headers: {

    },
    type: 'post'
}
export const editGood = {
    url: '/shop/manage/goods/change-recycle',
    data: {
        goods_ids: '',
    },
    headers: {

    },
    type: 'post'
}

export const goodPoster = { //获取商品海报
    url: '/shop/apps/poster/client/goods',
    data: {
        goods_id: '',
    },
    headers: {

    },
    type: 'get'

}

export const introGoodInfo = {//推广信息
    url: '/shop/manage/goods/generalize',
    data: {
        id: '',
    },
    headers: {

    },
    type: 'get'

}