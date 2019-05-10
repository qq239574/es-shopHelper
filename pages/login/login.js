  let cacheData = {}; //缓存登录信息
  export function wxLogin() {
      let that = this;
      return new Promise((resolve, reject) => {
          uni.getProvider({
              service: 'oauth',
              success: function (res) {
                  if (~res.provider.indexOf('weixin')) {
                      uni.login({ //微信登录
                          provider: 'weixin',
                          success: function (loginRes) {
                              that.Request('wechatLogin', { //小程序获取登录session
                                  code: loginRes.code
                              }).then(res => {
                                  if (res.error == 0) {
                                      cacheData = res;
                                      uni.getUserInfo({ // 获取用户信息
                                          provider: 'weixin',
                                          success: function (infoRes) {
                                              cacheData = Object.assign(cacheData, infoRes);
                                              that.Cacher.setData('login', cacheData);
                                              that.Request('login', {
                                                  account: '',
                                                  password: '',
                                                  open_id: res.openid,
                                                  is_authorization: 1
                                              }).then((res) => {
                                                  // 验证通过
                                                  cacheData = Object.assign(cacheData, {
                                                      haveBindWx: res.error == 0 && res.open_id
                                                  })
                                                  that.Cacher.setData('login', cacheData)
                                                  if (res.error == 0) {
                                                      resolve(res);
                                                  } else {
                                                      
                                                      reject(res);

                                                  }
                                                  that.closePageLoading();
                                              }).catch(res => {
                                                  cacheData = that.Cacher.getData('login') || {}
                                                  cacheData = Object.assign(cacheData, {
                                                      haveBindWx: false
                                                  })
                                                  that.Cacher.setData('login', cacheData)
                                                  if (res.error == -3) { //已登录
                                                      resolve(res)
                                                  } else {
                                                      reject(res)
                                                  }
                                              })

                                          },
                                          fail(res) {
                                              console.log('get info fails', res)
                                          }
                                      });

                                  }
                              }).catch(res => {
                                reject(res)
                              })
                          }
                      });
                  }
              }
          });
      })

  }

  export function login() {
      let that = this;
      let cacheData = this.Cacher.getData('login') || {};

      return new Promise((resolve, reject) => {
          this.Request('login', {
              account: this.userId,
              password: this.password,
              is_authorization: 0
          }).then((res) => {
              // 验证通过
              if (res.error == 0) {
                  cacheData = Object.assign(cacheData || {}, {
                      userId: res.uid
                  })
                  that.Cacher.setData('login', cacheData)
                  resolve(res);
              } else {
                  reject(res);
                  this.Toast(res.message)
              }
              this.closePageLoading();
          }).catch(res => {

              if (res.error == -3) { //已登录
                  that.Cacher.setData('login', cacheData)
                  resolve(res)
              } else {
                  reject(res)
                  this.Toast(res.message)
              }
          })
      })

  }