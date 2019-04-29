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

export const introGoodInfo = { //推广信息
    url: '/shop/manage/goods/generalize',
    data: {
        id: '',
    },
    headers: {

    },
    type: 'get'

}
export const getGoodDetail = { //商品修改前
    url: '/shop/manage/goods/edit',
    data: {
        goods_id: '',
    },
    headers: {

    },
    type: 'get'
}
export const editGoodDetail = { //管理端商品修改
    url: '/shop/manage/goods/edit',
    data: {
        'goods_id': '',
        'data[goods][id]': '',
        'data[goods][shop_id]': '',
        'data[goods][display_order]': '',
        'data[goods][type]': '',
        'data[goods][title]': '',
        'data[goods][sub_title]': '',
        'data[goods][status]': 1,
        'data[goods][video]': '',
        'data[goods][video_thumb]': '',
        'data[goods][thumb]': '',
        'data[goods][thumbs][0]':'',
        'data[goods][price]': 50,
        'data[goods][original_price]': 0,
        'data[goods][min_price]': 0.00,
        'data[goods][max_price]': 0.00,
        'data[goods][unit]': '',
        'data[goods][has_option]': 0,
        'data[goods][goods_code]': '',
        'data[goods][product_sn]': '',
        'data[goods][stock]':'',
        'data[goods][stock_warning]': 0,
        'data[goods][stock_hide]': 0,
        'data[goods][stock_cnf]': 0,
        'data[goods][weight]': 0.00,
        'data[goods][volume]': 0.00,
        'data[goods][sales_count]': '',
        'data[goods][sales_hide]': 0,
        'data[goods][virtual_sales]': 0,
        'data[goods][auto_complete]': 0,
        'data[goods][auto_complete_content]': '',
        'data[goods][dispatch_type]': 0,
        'data[goods][dispatch_price]': 0,
        'data[goods][dispatch_id]': '',
        'data[goods][dispatch_hide]': 0,
        'data[goods][is_buy_num_limit]': 0,
        'data[goods][max_buy_total]': 0,
        'data[goods][max_buy_once]': 0,
        'data[goods][min_buy]': 0,
        'data[goods][content]': '',
        'data[goods][create_time]': '',
        'data[goods][sellout_time]': '',
        'data[goods][delete_time]': '',
        'data[goods][view_count]': '',
        'data[goods][is_discount]': '',
        'data[goods][params_type]': 0,
        'data[goods][params_id]': 0,
        'data[goods][params_img]': '',
        'data[goods][template_id]': 0,
        'data[goods][is_invoice_support]': 0,
        'data[goods][is_free_dispatch]': 0,
        'data[goods][form_id]': 0,
        'data[goods][is_refund_support]': 1,
        'data[goods][is_join_commission]': 1,
        'data[goods][is_join_member_price]': 0,
        'data[goods][auto_delivery]': 1,
        'data[goods][auto_delivery_content]': '',
        'data[goods][short_title]': '',
        'data[goods][single_row_thumb]': '',
        'data[goods][thumbs_ratio]': '',
        'data[goods][virtual_card_id]': 0,
        'data[goods][auto_warehouse]': 0,
        'data[goods][is_delivery_pay]':'',
        'data[goods][school_ids]': '',
        'data[goods][selling_object]': 0,
        'data[goods][category_ids]': '',
        'data[specs][0][id]': '',
        'data[specs][0][title]': '',
        'data[specs][0][items][0][id]': '',
    },
    headers: {

    },
    type: 'post'
}