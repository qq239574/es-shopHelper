<template>
	<view class='outer'>
		<view class='inner'>
			<movable-area>
				<block v-for="(item,index) in data" :key='index'>
					<view class='item' :class='curItem==index?"curItem":""' :id="item.index" :data-index='index' @longpress='_longtap'
					 @touchstart='touchs' @touchend='touchend' @touchmove='touchm'>
						<text>{{item.index}}</text>
					</view>
				</block>
				<movable-view :x="x" :y="y" direction="all" :damping="5000" :friction="1" :disabled="disabled">
					<view class='item-move' :hidden='hidden'>
					</view>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hidden: true,
				flag: false,
				x: 0,
				y: 0,
				data: [{
						index: 1
					},
					{
						index: 2
					},
					{
						index: 3
					},
					{
						index: 4
					},
					{
						index: 5
					},
					{
						index: 6
					},
					{
						index: 7
					},
				],
				disabled: true,
				elements: [],
				curItem: -1
			}
		},
		mounted(options) {
			let that = this;
			var query = uni.createSelectorQuery();
			var nodesRef = query.selectAll(".outer");
			nodesRef.fields({
				dataset: true,
				rect: true

			}, (result) => {
				that.elements = result;
				console.log('result>>>',result)
			}).exec();

		},
		methods: {

			//长按
			_longtap(e) {
				const detail = e.detail;
				this.x = e.currentTarget.offsetLeft;
				this.y = e.currentTarget.offsetTop;
				this.hidden = false;
				this.flag = true;

			},
			//触摸开始
			touchs(e) {
				this.beginIndex = e.currentTarget.dataset.index

			},
			//触摸结束
			touchend(e) {
				if (!this.flag) {
					return;
				}
				this.curItem = -1;
				const x = e.changedTouches[0].pageX
				const y = e.changedTouches[0].pageY
				const list = this.elements;
				let data = this.data;
				for (var j = 0; j < list.length; j++) {
					const item = list[j];
					if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
						const endIndex = item.dataset.index;
						const beginIndex = this.beginIndex;
						//向后移动
						if (beginIndex < endIndex) {
							let tem = data[beginIndex];
							for (let i = beginIndex; i < endIndex; i++) {
								data[i] = data[i + 1]
							}
							data[endIndex] = tem;
						}
						//向前移动
						if (beginIndex > endIndex) {
							let tem = data[beginIndex];
							for (let i = beginIndex; i > endIndex; i--) {
								data[i] = data[i - 1]
							}
							data[endIndex] = tem;
						}
						this.data = data;
					}
				}
				this.hidden = true;
				this.flag = false;
			},
			//滑动
			touchm(e) {
				if (this.flag) {
					const x = e.touches[0].pageX
					const y = e.touches[0].pageY
					this.x = x - 75;
					this.y = y - 45;
					const list = this.elements;
					let data = this.data;
					this.curItem = -1;
					for (var j = 0; j < list.length; j++) {
						const item = list[j];
						if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
							this.curItem = j;
							console.log('cur>>', j);
							break;
						}
					}
				}
			}
		}
	}
</script>

<style>
	/* test/test.wxss */
	.outer {
		width: 650rpx;
		height: 400rpx;
		border: 1px solid red;
		margin: 0 auto;
	}

	.inner {
		width: 100%;
		height: 100%;
	}

	movable-area {
		width: 100%;
		height: 100%;
	}

	.item {
		display: inline-block;
		width: 150rpx;
		height: 150rpx;
		border: 1px solid red;
		text-align: center;
		line-height: 150rpx;
	}

	.curItem {
		border: 1upx solid yellow;
	}

	.index-first {
		display: inline-block;
		width: 15rpx;
		height: 150rpx;
		background: firebrick;
	}

	.item-move {
		display: inline-block;
		width: 150rpx;
		height: 150rpx;
		border: 1px solid blue;
	}
</style>
