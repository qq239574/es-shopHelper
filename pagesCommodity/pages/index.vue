<template>
    <!-- 单规格 -->
    <view class='pagesCommodity-pages-index page' ref='page'>
        <goodInfo :info='goodDetail.info1' @click='clickCell' @getImages='getImages' @input='inputCell' @startmove='startmove'></goodInfo>
        <goodInfo2 :info='goodDetail.info2' @click='clickCell' @input='inputCell'></goodInfo2>
        <view class="margin20"></view>
        <goodInfo3 :info='goodDetail.info3' @click='clickCell' @input='inputCell'></goodInfo3>
        <view class="margin20"></view>
        <selectItem :value='goodDetail.info4.status.value' label='状态' @click='clickCell'></selectItem>
        <view class="padding"></view>
        <view class="footer">
            <longButton @click='save'>保存</longButton>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import {
        goodData
    } from '../components/goodDetail.js' //测试用数据
    import goodInfo from '../components/editGood-Block1.vue';
    import goodInfo2 from '../components/editGood-Block2.vue'
    import goodInfo3 from '../components/editGood-Block3.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import updateGoodInfo from '../components/updateGoodInfo.js'
    import toEditPage from '../components/toEditPage.js'
    import editGoodModel from '../components/goodEditDataModel.js'
    let cacheGoodDetail = {};
    let cacheSubmitData={};
    let DataFrom = {};
    let DataGo = {};
    export default {
        components: {
            goodInfo,
            goodInfo2,
            goodInfo3,
            selectItem,
            longButton
        },
        data() {
            return {
                moving: false,
                goodDetail: {}
            }
        },
        methods: {
            startmove() {},
            inputCell(val) {
                cacheGoodDetail = updateGoodInfo.call(this, val, cacheGoodDetail);
            },
            getImages(list) {
                cacheGoodDetail = updateGoodInfo.call(this, list, cacheGoodDetail)
            },
            clickCell(val) { 
                toEditPage.call(this, val, cacheGoodDetail);
            },
            save() {
                this.goodDetail = cacheGoodDetail;
                let data=editGoodModel(cacheGoodDetail,cacheSubmitData);
                this.Request('editGoodDetail', data).then(res => {
                    if (res.error == 0) {
                        uni.navigateBack();
                    } else {
                        this.Toast(res.message);
                    }
                }).catch(res => {
                    this.Toast(res.message);
                })
            },
            initPage() {
                DataGo = this.Cacher.getData('editGood'); 
                DataGo = Object.assign(DataGo, this.Cacher.getData(DataGo.go));
                if (DataGo.go) {
                    // DataGo = this.Cacher.getData(DataGo.go);
                }
                if (DataGo.go == 'editName' || DataGo.go == 'editSubTitle' || DataGo.go == 'selectType' || DataGo.go == 'editCode' || DataGo.go == 'setFreight' || DataGo.go == 'editForm' || DataGo.go == 'editStatus' || DataGo.go == 'editMultiCode' || DataGo.go == 'autoDeliverContent') {
                    cacheGoodDetail = updateGoodInfo.call(this, DataGo.needChange, cacheGoodDetail);
                    this.goodDetail = cacheGoodDetail;
                }
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.Cacher.setData('editGood', {
                from: option.from || ''
            })  
            this.initPage();
            this.Request('getGoodDetail', {
                goods_id: DataFrom.item.detail.goodId,
            }).then(res => {
                cacheSubmitData=res;//提交的时候要一一对应
                cacheGoodDetail = goodData.call(this,res); 
                this.goodDetail = cacheGoodDetail;
            });
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .pagesCommodity-pages-index {
        width: 100%;
        height: 100%;
        .padding {
            height: 160upx;
            background: #f7f7f7;
        }
        .margin20 {
            background: #f7f7f7;
            height: 20upx;
        }
        .footer {
            position: fixed;
            height: 124upx;
            width: 100%;
            border-top: 1upx solid #eee;
            background: #fff;
            bottom: 0;
            left: 0;
            z-index: 1000;
            overflow: hidden;
            padding-top: 18upx;
            box-sizing: border-box;
            long-button {
                margin: 10upx auto 0;
            }
        }
    }
</style>