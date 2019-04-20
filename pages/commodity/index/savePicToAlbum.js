export default function (that, downloadUrl) {
    function downloadFile() {
        that.Toast("开始下载图片");
        uni.downloadFile({
            url: downloadUrl,
            success: function (res) {
                // 保存图片到系统相册  
                uni.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        that.Toast({
                            title: '保存成功',
                        });
                    },
                    fail(res) {
                        that.Toast({
                            title: '保存失败',
                        });
                    }
                })
            },
            fail: function (res) {
                that.Toast("下载图片失败");
            }
        })
    }

    if (!uni.saveImageToPhotosAlbum) {
        that.Dialog.alert({
            title: '提示',
            message: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        }).then(() => {
            // on close
        });
        return;
    }

    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope  
    uni.getSetting({
        success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
                // 接口调用询问  
                uni.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                        downloadFile.call(that, downloadUrl);
                    },
                    fail() {
                        // 用户拒绝了授权  
                        // 打开设置页面  
                        uni.openSetting({
                            success: function (data) {
                            },
                            fail: function (data) {
                            }
                        });
                    }
                })
            } else {
                downloadFile.call(that, downloadUrl);

            }
        },
        fail(res) {
            that.Toast("获取权限失败")
        }

    })

}