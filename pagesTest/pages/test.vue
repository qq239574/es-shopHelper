<template>
	<div class='test page'>
		<!-- <myButtonGroup></myButtonGroup>
						<myCellSimple>
							<span slot='pre' class=''>tag</span>
							<span slot='aft'>222</span>
						</myCellSimple>
						<myCellBlock>
							<span slot='pre'>1</span><span slot='mid'>2</span><span slot='aft'>3</span>
						</myCellBlock>
						<muLongButton @click='clickBut'></muLongButton>
						<muRoundButton @click='clickBut'></muRoundButton> -->
		<!-- <graceLoading :loadingType="loadingType" :show="show">123</graceLoading> -->
		<move></move>
	</div>
</template>

<script>
	import myButtonGroup from '../../components/my-components/ButtonGroup.vue';
	import myCellSimple from '../../components/my-components/CellSimple.vue';
	import myCellBlock from '../../components/my-components/CellBlock.vue';
	import muLongButton from '../../components/my-components/LongButton.vue';
	import muRoundButton from '../../components/my-components/RoundButton.vue';
	import myDataShower from '../../components/my-components/DataShower.vue';
	import graceLoading from '../../graceUI/components/graceLoading.vue'
	import move from '../../components/my-components/editBlock-RadioBlock.vue'
	export default {
		components: {
			myButtonGroup,
			myCellSimple,
			myCellBlock,
			muLongButton,
			muRoundButton,
			myDataShower,
			graceLoading,
			move
		},
		data() {
			return {
				loadingType: 1,
				show: true,
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				}
			}
		},
		methods: {
			clickBut(val) {
				console.log(val)
			},
			movestart: function(e) {
				// console.log('start');
				// currindex = e.target.dataset.index;
				// this.current = e.target.dataset.index;
				x = e.touches[0].clientX;
				y = e.touches[0].clientY;
				x1 = e.currentTarget.offsetLeft;
				y1 = e.currentTarget.offsetTop;
				// var arr = [].concat(this.all_list);
				// arr.forEach(function(n,i){
				//   n._class='move';
				//   n._style='';
				// });
				this.setData({
					current: e.target.dataset.index,
					move_x: x1,
					move_y: y1
				});
			},
			move: function(e) {
				var self = this;
				// // console.log('move',e.target.dataset.current);
				x2 = e.touches[0].clientX - x + x1;
				y2 = e.touches[0].clientY - y + y1;
				// // this.setData({
				// //   current: currindex,
				// //   start: { x: x2, y: y2 }
				// // })
				var underIndex = this.getCurrnetUnderIndex();
				// var now_current=this.current;
				if (underIndex != null && underIndex != this.current) {
					var arr = [].concat(this.all_list);
					this.changeArrayData(arr, underIndex, this.current);
					// console.log(underIndex);
					// now_current = underIndex;
					this.setData({
						all_list: arr,
						current: underIndex
					})
				}
				// console.log(self.current,arr);
				this.setData({
					move_x: x2,
					move_y: y2
				});
			},
			moveend: function(e) {
				this.setData({
					current: -1,
				})
			},
			changeArrayData: function(arr, i1, i2) {
				var temp = arr[i1];
				arr[i1] = arr[i2];
				arr[i2] = temp;
				var _left = arr[i1]._left,
					_top = arr[i1]._top;
				arr[i1]._left = arr[i2]._left;
				arr[i1]._top = arr[i2]._top;
				arr[i2]._left = _left;
				arr[i2]._top = _top;
				var left = arr[i1].left,
					top = arr[i1].top;
				arr[i1].left = arr[i2].left;
				arr[i1].top = arr[i2].top;
				arr[i2].left = left;
				arr[i2].top = top;
			},
			getCurrnetUnderIndex: function(endx, endy) { //获取当前移动下方index
				var endx = x2 + this.u_w / 2,
					endy = y2 + this.u_h / 2;
				var v_judge = false,
					h_judge = false,
					column_num = (this.all_width - this.s_h) / (this.s_h + this.u_w) >> 0;
				// console.log(endx,endy);
				var _column = (endy - this.s_v) / (this.u_h + this.s_v) >> 0;
				var min_top = this.s_v + (_column) * (this.u_h + this.s_v),
					max_top = min_top + this.u_h;
				// console.log('v', _column, endy, min_top, max_top);
				if (endy > min_top && endy < max_top) {
					v_judge = true;
				}
				var _row = (endx - this.s_h) / (this.u_w + this.s_h) >> 0;
				var min_left = this.s_h + (_row) * (this.u_w + this.s_h),
					max_left = min_left + this.u_w;
				// console.log('x', _row, endx, min_left, max_left);
				if (endx > min_left && endx < max_left) {
					h_judge = true;
				}
				if (v_judge && h_judge) {
					var index = _column * column_num + _row;
					if (index > this.all_list.length - 1) { //超过了
						return null;
					} else {
						return index;
					}
				} else {
					return null;
				}
			},
			tap: function(e) {
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			}
		},
	}
</script>

<style lang="scss" scoped>
	.test {
		>.grace-list {
			flex-wrap: wrap;
			>.items {
				height: fit-content;
				overflow: hidden;
			}
		}
		.tip {
			color: #aaa;
			font-size: 12px;
		}
		.normal_title {
			font-size: 16px;
			margin: 10rpx 20rpx;
			font-weight: bold;
		}
		.item {
			position: absolute;
			border: 1px solid black;
			font-size: 13px;
			padding: 7px 0px;
			width: 90px;
			text-align: center;
			border-radius: 90px;
		}
		.item_container {
			height: 300rpx;
			width: 100%;
			/* border:1px solid black; */
			position: relative;
		}
	}
</style>
