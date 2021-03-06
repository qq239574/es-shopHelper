let userInfo = null;
let needBindWx = null;

function bindWechat() {
    return new Promise((resolve, reject) => {
        if (userInfo.userId) {
            this.Request('bindWechat', {
                encrypted_data: userInfo.encryptedData,
                session_key: userInfo.session_key,
                iv: userInfo.iv,
                user_id: userInfo.userId
            }).then(res => {
                if (res.error == 0) {
                    this.Cacher.setData('needBindWx', {
                        testWx: true, //尝试微信登录
                        needBind: false, //需要绑定微信true需要
                        haveBindWx: true
                    })
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(res => {
                reject(res)
            })
        }else{
            this.Toast('请用账号密码登录后重试')
        }

    })

}

export function bindWx(rebind) {
    let that = this;
    return new Promise((resolve, reject) => {
        userInfo = this.Cacher.getData('login');
        needBindWx = this.Cacher.getData('needBindWx');
        if (needBindWx.testWx && needBindWx.needBind && !rebind) {
            this.Request('myInfo').then(res => { //检查是否绑定了微信
                if (res.error == 0 && !res.wxapp_openid) {
                    that.Cacher.setData('needBindWx', {
                        testWx: true, //尝试微信登录
                        needBind: false, //需要绑定微信true需要
                        haveBindWx: false
                    })
                    that.closePageLoading();
                    that.Dialog.confirm({ //二次确认
                        title: '没有绑定微信',
                        message: '为方便您的使用，是否与微信账号绑定？',
                        confirmButtonText: '绑定',
                        confirmButtonOpenType: 'getUserInfo'
                    }).then(() => {
                        that.pageLoading();
                        bindWx.call(that, true);
                    }).catch(res => {
                        that.closePageLoading()
                    });
                }
            })
        } else if (rebind) { //重新绑定
            let cacheData = that.Cacher.getData('login')
            uni.getUserInfo({ // 获取用户信息
                provider: 'weixin',
                success: function (infoRes) {
                    cacheData = Object.assign(cacheData, infoRes);
                    that.Cacher.setData('login', cacheData);
                    userInfo = cacheData;
                    bindWechat.call(that, userInfo).then(res => {
                        that.closePageLoading();
                        that.Toast('绑定成功');
                        resolve(res);
                    }).catch(res => {
                        that.closePageLoading();
                        that.Toast('绑定失败，请稍后重试');
                        reject(res);
                    })
                },
                fail(res) {
                    that.closePageLoading()
                    that.Toast('绑定微信需要用户信息权限')
                }
            });

        }
    })

}