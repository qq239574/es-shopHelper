/*
graceUI-JS - 网络请求工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海

版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/

export default {

	get(url, data, header, callback) {
		uni.request({
			url: url,
			data: data,
			method: "GET",
			header: header || {},
			dataType: "json",
			success: (res) => {
				callback(res.data);
			},
			fail: () => {
				uni.showToast({
					title: "网络请求失败",
					icon: "none"
				});
			}
		});
	},

	post(url, data, contentType, headers, callback) { 
		switch (contentType) {
			case "form":
				var headerObj = {
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				};
				break;
			case "json":
				var headerObj = {
					'content-type': 'application/json'
				};
				break;
			default:
				var headerObj = {
					'content-type': 'application/json'
				};
		}
		for (let k in headers) {
			headerObj[k] = headers[k];
		}
		
		wx.request({
			url: url,
			data: data,
			method: "POST",
			dataType: "json",
			header: headerObj,
			success: (res) => {
				console.log('what happende::', res)
				callback(res.data);
			},
			fail: () => {
				uni.showToast({
					title: "网络请求失败",
					icon: "none"
				});
			}
		});
	}
}