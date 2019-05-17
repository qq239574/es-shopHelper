let test = {
    'account-mode_manage': true,
    'account-mode_view': true,
    activity_index_create: true,
    activity_index_pay: true,
    activity_manage_manage: true,
    activity_manage_view: true,
    apps_index_manage: true,
    'apps_index_manage-wxapp': true, //核销小程序
    apps_index_pay: true,
    channel_manage: true,
    channel_view: true,
    commission_agent_list_manage: true,
    commission_agent_list_view: true,
    commission_apply_list_manage: true,
    commission_apply_list_view: true,
    commission_goods_list_manage: true,
    commission_goods_list_view: true,
    commission_index_view: true,
    commission_level_list_manage: true,
    commission_level_list_view: true,
    commission_order_list_manage: true,
    commission_order_list_view: true,
    commission_setting_basic_manage: true,
    commission_setting_basic_view: true,
    coupon_manage: true,
    coupon_view: true,
    customer_list_manage: true,
    customer_sessionHistory_manage: true,
    customer_session_manage: true,
    customer_settings_manage: true,
    'dashboard_index_get-activity-data': true,
    'dashboard_index_get-goods-data': true,
    'dashboard_index_get-sell-data': true,
    'dashboard_index_get-visit-data': true,
    'dashboard_index_order-data': true,
    decorate_systemtemplate_buy: true,
    decorate_systemtemplate_view: true,
    decorate_template_manage: true,
    decorate_template_page_manage: true,
    decorate_template_page_view: true,
    decorate_template_view: true,
    finance_bill_view: true,
    finance_log_balance_view: true,
    finance_log_credit_view: true,
    finance_log_recharge_refund: true,
    finance_log_recharge_view: true,
    finance_order_view: true,
    goods_batch_manage: true,
    goods_batch_view: true,
    goods_category_manage: true,
    goods_category_view: true,
    goods_group_manage: true,
    goods_group_view: true,
    goods_label_manage: true,
    goods_label_view: true,
    goods_manage: true, //商品管理权限
    goods_params_manage: true,
    goods_params_view: true,
    goods_view: true, //商品查看权限
    member_analyze_view: true,
    member_goods_manage: true,
    member_goods_view: true,
    member_import_manage: true,
    member_level_manage: true,
    member_level_view: true,
    member_list_manage: true, //会员管理权限
    member_list_view: true, //会员查看权限
    member_portrait_manage: true,
    member_tag_manage: true,
    member_tag_view: true,
    'order_batch-send': true,
    'order_change-price': true, //订单改价权限
    order_close: true,
    'order_close-and-refund': true,
    order_commment_manage: true,
    order_commment_view: true,
    'order_edit-invoice': true, //
    order_export: true,
    order_manage: true, //订单管理权限
    order_overview_view: true,
    order_send: true, //订单发货权限
    order_view: false, //订单查看权限
    sales_overview_view: true,
    setting_common_base_manage: true,
    setting_dispatch_index_manage: true,
    setting_info_manage: true,
    setting_managerrole_list_manage: true,
    setting_managerrole_list_view: true,
    setting_operator_list_manage: true,
    setting_operator_list_view: true,
    setting_payment_index_manage: true,
    statistics_goods_view: true,
    statistics_index_view: true, //数据概览
    statistics_member_view: true,
    statistics_trade_view: true,
    statistics_view_view: true,
}
export function getJurisdiction(bool) {
    let that = this;
    let cache = that.Cacher.getData('userJurisdiction');
    return new Promise((resolve, reject) => {
        // if (cache.error == 0 && cache.prems) {
        //     resolve(cache.prems); //测试例子
        // } else {
            that.Request('Jurisdiction').then(res => {
                if (res.error == 0) {
                    let prems = res.prems;
                    let newPrems = {};
                    for (let k in prems) {
                        newPrems[k.replace(/\./g, '_')] = prems[k]
                    }
                    res.prems = newPrems;
                    that.Cacher.setData('userJurisdiction', res);
                    resolve(res.prems)
                }
            }).catch(res => {
                reject(res)
            })
        // }

    })

}