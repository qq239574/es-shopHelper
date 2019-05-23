/*
graceUI-JS - 网络请求工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海

版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
let storeNetWork = true; //判断断网
export default {
	get(url, data, header, callback) {
		uni.request({
			url: url,
			data: data,
			method: "GET",
			header: header || {},
			dataType: "json",
			success: (res) => {
				storeNetWork = true;
				callback(res.data);
			},
			fail: () => {
				if (storeNetWork) {
					storeNetWork = false;
					setTimeout(() => {
						storeNetWork = true;
					}, 3000)
					uni.navigateTo({
						url: '/pagesLogin/pages/noWeb'
					})
				}else{
					callback({
						error:-100,
						message:'网络较差，请稍后重试'
					})
				}

			}
		});
	},

	post(url, data, contentType, headers, callback) {
		let noweb = getApp(); // 取得全局App
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

		uni.request({
			url: url,
			data: data,
			method: "POST",
			dataType: "json",
			header: headerObj,
			success: (res) => {
				storeNetWork = true;
				callback(res.data);
			},
			fail: () => {
				if (storeNetWork) {
					storeNetWork = false;
					setTimeout(() => {
						storeNetWork = true;
					}, 3000)
					uni.navigateTo({
						url: '/pagesLogin/pages/noWeb'
					})
				}else{
					callback({
						error:-100,
						message:'网络较差，请稍后重试'
					})
				}
			}
		});
	}
}