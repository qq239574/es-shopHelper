import getShops from '../../pagesLogin/components/getShopList.js'
import {
    getJurisdiction
} from '../../components/my-components/getJurisdiction.js'
let cacheData = {}; //缓存登录信息 
function checkJurisdiction() { //检查权限
    let that = this;
    return new Promise((resolve, reject) => {
        getJurisdiction.call(that, true).then(res => {
            resolve(res);
        }).catch(res => {
            that.closePageLoading();
            reject(res);
        })
    })

}

function selectShop() { //检测是否只有一个店铺
    let that = this;

    return new Promise((resolve, reject) => {
        that.Request('shoplist', { //如果只有一个店铺就绕过选择店铺的页面
            pageSize: 2,
            page: 1,
        }).then(res => {

            if (res.error == 0) {

                let shops = getShops(res.list);

                if (shops.length == 1) { //只有一个合格的店铺就直接跳转首页；如果是从首页跳转的就不必
                    let shop = shops[0];
                    that.Cacher.setData('selectShop', {
                        from: 'selectShop',
                        shopInfo: shop.shopInfo,
                        totalShops: res.total,
                        left: shop.days > 0 ? (shop.days + '天后到期') : '已过期',
                        expireDay: shop.days,
                    });
                    that.Request('switchShop', {
                        id: shop.shopInfo.id
                    }).then(res => {
                        if (res.error == 0) {
                            checkJurisdiction.call(that).then(res => { //检查该店铺的权限
                                if (res['apps_index_view']) {
                                    uni.reLaunch({
                                        url: '../index/index?from=selectShop&status=onlyOne'
                                    });
                                } else {
                                    resolve()
                                }
                            }).catch(res => {
                                resolve()
                            })
                        } else {
                            that.Toast(res.message || '暂无店铺信息')
                        }
                    }).catch(res => {

                        that.Toast(res.message)
                    })
                } else {
                    resolve()
                }
            } else {
                resolve()
            }
        }).catch(res => {
            resolve()
        })


    })
}

function getWxInfo() { //获取用户微信信息
    let that = this;
    return new Promise((resolve, reject) => {
        uni.login({ //微信登录
            provider: 'weixin',
            success: function (loginRes) {
                that.Request('wechatLogin', { //小程序获取登录session
                    code: loginRes.code
                }).then(res => {
                    that.Cacher.setData('needBindWx', {
                        testWx: true, //尝试微信登录
                        needBind: true, //需要绑定微信true需要
                        haveBind: false, //已经绑定
                    });
                    if (res.error == 0) {
                        cacheData = Object.assign(cacheData, res);

                        that.Cacher.setData('login', cacheData);
                    }
                    uni.getUserInfo({ // 获取用户信息
                        provider: 'weixin',
                        success: function (infoRes) {
                            cacheData = Object.assign(cacheData, infoRes);
                            that.Cacher.setData('login', cacheData);
                            resolve(res)
                        },
                        fail(res) {
                            console.log('get info fails', res)
                            resolve(res)
                        }
                    });

                }).catch(res => {
                    that.Cacher.setData('needBindWx', {
                        testWx: true, //尝试微信登录
                        needBind: true, //需要绑定微信true需要
                        haveBind: false, //已经绑定
                    })
                    resolve(res)
                })
            }
        });
    })
}

export function wxLogin() { //微信登录流程
    let that = this;
    return new Promise((resolve, reject) => {
        uni.login({ //微信登录
            provider: 'weixin',
            success: function (loginRes) {
                that.Request('wechatLogin', { //小程序获取登录session
                    code: loginRes.code
                }).then(res => {
                    if (res.error == 0) {
                        cacheData = res;
                        that.Cacher.setData('login', cacheData);
                        that.Request('login', {
                            account: '',
                            password: '',
                            open_id: res.openid,
                            is_authorization: 1
                        }).then((res) => {
                            // 验证通过

                            if (res.error == 0) {
                                cacheData = Object.assign(cacheData || {}, {
                                    userId: res.uid
                                })
                                that.Cacher.setData('needBindWx', {
                                    testWx: true, //尝试微信登录
                                    needBind: false, //需要绑定微信true需要
                                    haveBind: true, //已经绑定
                                })
                                selectShop.call(that).then(r => { //先判断是否只有一个店铺
                                    resolve(res);
                                })
                            } else {
                                that.Cacher.setData('needBindWx', {
                                    testWx: true, //尝试微信登录
                                    needBind: true, //需要绑定微信true需要
                                    haveBind: false, //已经绑定
                                })
                                reject(res);
                            }
                        }).catch(res => {

                            if (res.error == -3) { //已登录
                                that.Cacher.setData('needBindWx', {
                                    testWx: true, //尝试微信登录
                                    needBind: false, //需要绑定微信true需要
                                    haveBind: true, //已经绑定
                                })
                                selectShop.call(that).then(r => { //先判断是否只有一个店铺
                                    resolve(res);
                                })
                            } else {
                                that.Cacher.setData('needBindWx', {
                                    testWx: true, //尝试微信登录
                                    needBind: true, //需要绑定微信true需要
                                    haveBind: false, //已经绑定
                                })
                                reject(res)
                            }
                        })
                        uni.getUserInfo({ // 获取用户信息
                            provider: 'weixin',
                            success: function (infoRes) {
                                cacheData = Object.assign(cacheData, infoRes);
                                that.Cacher.setData('login', cacheData);
                            },
                            fail(res) {
                              
                            }
                        });

                    }
                }).catch(res => {
                    that.Cacher.setData('needBindWx', {
                        testWx: true, //尝试微信登录
                        needBind: true, //需要绑定微信true需要
                    })
                    reject(res)
                })
            }
        });
    })
}

export function login() { //账号密码登录流程
    let that = this;

    return new Promise((resolve, reject) => {
        getWxInfo.call(that).then(res => {

            that.Request('login', {
                account: that.userId,
                password: that.password,
                is_authorization: 0
            }).then((res) => {
                // 验证通过
                if (res.error == 0) {
                    cacheData = Object.assign(cacheData || {}, {
                        userId: res.uid
                    })
                    that.Cacher.setData('cache-user-login', {
                        userId: that.userId,
                        password: that.password
                    })
                    that.Cacher.setData('login', cacheData);
                    selectShop.call(that).then(r => { //先判断是否只有一个店铺
                        resolve(res);
                    })

                } else {
                    reject(res);
                    that.Toast(res.message)
                }
                that.closePageLoading();
            }).catch(res => {

                if (res.error == -3) { //已登录
                    that.Cacher.setData('login', cacheData)
                    that.Cacher.setData('cache-user-login', {
                        userId: that.userId,
                        password: that.password
                    })
                    selectShop.call(that).then(r => { //先判断是否只有一个店铺
                        resolve(res);
                    })
                } else {
                    if (res.message == '帐号不存在' || res.message == '帐号或密码错误') { //统一提示‘账号或密码错误’
                        reject(res);
                    } else {
                        that.Toast(res.message)
                    }
                }
            })

        })

    })

}