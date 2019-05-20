let userInfo = null;
let needBindWx = null;

function bindWechat() {
    return new Promise((resolve, reject) => {
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
    })

}

export function bindWx(rebind) {
    let that = this;
    return new Promise((resolve, reject) => {
        userInfo = this.Cacher.getData('login');
        needBindWx = this.Cacher.getData('needBindWx'); 
        if (!userInfo.haveBindWx && userInfo.encryptedData && needBindWx.testWx && needBindWx.needBind && !rebind) {
            this.Request('myInfo').then(res => { //检查是否绑定了微信
                if (res.error == 0 && !res.wxapp_openid) {
                    that.Cacher.setData('needBindWx', {
                        testWx: true, //尝试微信登录
                        needBind: false, //需要绑定微信true需要
                        haveBindWx: false
                    })
                    that.closePageLoading();
                    that.Dialog.confirm({
                        title: '没有绑定微信',
                        message: '为方便您的使用，是否与微信账号绑定？',
                        confirmButtonText: '绑定',
                        confirmButtonOpenType:'getUserInfo'
                    }).then(() => {
                        that.pageLoading();
                        bindWechat.call(that, userInfo).then(res => {
                            that.Toast('绑定成功');
                            resolve(res)
                        }).catch(res => {
                            that.Toast('绑定失败');
                            reject(res)
                        })
                    });
                }
            })
        } else if (rebind) {
            let cacheData = that.Cacher.getData('login')
            uni.getUserInfo({ // 获取用户信息
                provider: 'weixin',
                success: function (infoRes) {
                    cacheData = Object.assign(cacheData, infoRes);
                    that.Cacher.setData('login', cacheData);
                    userInfo=cacheData;
                    bindWechat.call(that, userInfo).then(res => {
                        that.Toast('绑定成功');
                        resolve(res);
                    }).catch(res => {
                        that.Toast('绑定失败');
                        reject(res);
                    })
                },
                fail(res) {
                    that.Toast('绑定微信需要用户信息权限')
                }
            });

        }
    })

}