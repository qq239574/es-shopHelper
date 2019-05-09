<template>
    <div class='show-good-sale page'>
        <view class="block ">
            <view class="title row">
                <view class="col1 col">规格名称</view>
                <view class="col col2">销量（件）</view>
            </view>
            <view class="row" v-for='(item,index) in list' :key='index'>
                <view class="col col1 label">{{item.title}}</view>
                <view class="col col2 value">{{item.sales*1}}</view>
            </view>
        </view>
    </div>
</template>

<script>
    let DataFrom = {}
    export default {
        data() {
            return {
                list: [{
                    title: '',
                    sales: 0
                }]
            }
        },
        onLoad(option) {
          
            DataFrom = this.Cacher.getData(option.from);  
            this.Request('getMultiGoodSale', {
                goods_id: DataFrom.detail.info4.sale.goodsId,
            }).then(res => {
                if (res.error == 0) {
                    this.list = res.option.sort((a,b)=>b.sales-a.sales); 
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .show-good-sale {
        .block {
            width: 702upx;
            margin: 20upx auto 0;
            background: #fff;
            .row {
                min-height: 90upx;
                box-sizing: border-box;
                border-bottom: 1upx solid #eee;
                padding: 0 28upx;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                .col {
                    box-sizing: border-box;
                    padding: 29upx 0;
                }
                .col1 {
                    width: 372upx;
                    line-height: 36upx;
                    font-size: 24upx;
                }
                .col2 {
                    width: 260upx; 
                    display: flex;
                    justify-content: flex-end;
                    font-size: 28upx;
                    color: #fb6638;
                    font-weight: 700;
                    margin: auto;
                }
            }
            .title {
                .col {
                    color: #6f7685;
                    font-size: 26upx;
                    line-height: 90upx;
                    padding: 0;
                    font-weight: 700;
                }
                .col2 {
                    justify-content: flex-end;
                }
            }
        }
    }
</style>