<template>
    <!-- 单规格 -->
    <view class='pagesCommodity-pages-index page' ref='page'>
        <goodInfo :info='goodDetail.info1' @click='clickCell' @getImages='getImages' @input='inputCell' @startmove='startmove'></goodInfo>
        <goodInfo2 :info='goodDetail.info2' @click='clickCell' @input='inputCell'></goodInfo2>
        <view class="margin20"></view>
        <goodInfo3 :info='goodDetail.info3' @click='clickCell' @input='inputCell'></goodInfo3>
        <view class="margin20"></view>
        <selectItem :value='goodDetail.info4.status.value' label='状态' @click='clickCell'></selectItem>
        <view class="margin20"></view>
        <selectItem :value='goodDetail.info4.sale.value' label='销量' @click='clickCell' v-if='!goodDetail.info4.sale.needHide&&goodDetail.info2.specification.value=="多规格"'></selectItem>
        <inputItem :value='goodDetail.info4.sale.value' :disabled='true' label='销量' v-if='!goodDetail.info4.sale.needHide&&goodDetail.info2.specification.value=="单规格"'></inputItem>
        <view class="padding"></view>
        <view class="footer" v-if='!showpicker'>
            <longButton @click='save'>保存</longButton>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <view class="bg" v-show='showpicker'>
            <van-datetime-picker class='picker' type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @input="onInput" @confirm='confirm' @cancel='cancel' />
        </view>
    </view>
</template>

<script>
    import {
        goodData,
        addGoodsModel
    } from '../components/goodDetail.js' //测试用数据
    import goodInfo from '../components/editGood-Block1.vue';
    import goodInfo2 from '../components/editGood-Block2.vue'
    import goodInfo3 from '../components/editGood-Block3.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import updateGoodInfo from '../components/updateGoodInfo.js'
    import toEditPage from '../components/toEditPage.js'
    import editGoodModel from '../components/goodEditDataModel.js'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import {
        formatDateTime
    } from '../../graceUI2.0/jsTools/date.js'
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    import mockApi from '../components/mockGoodDetailApi.js'
    import deleteNull from '../components/deleteNullData.js'
    import uploadImg from '../components/upLoadImage.js'
    let cacheGoodDetail = {};
    let cacheSubmitData = {};
    let DataFrom = {};
    let DataGo = {};
    let currentDate = [];
    export default {
        components: {
            goodInfo,
            goodInfo2,
            goodInfo3,
            selectItem,
            longButton,
            inputItem
        },
        data() {
            return {
                defaultIndex: 0,
                showpicker: false,
                minDate: new Date().getTime() + 5 * 60000, //5分钟后
                maxDate: new Date(getDate(365)).getTime(), //一年后
                currentDate: '',
                moving: false,
                goodDetail: {}
            }
        },
        methods: {
            confirm() {
                this.showpicker = false;
                this.currentDate = currentDate;
                cacheGoodDetail = updateGoodInfo.call(this, {
                    label: '定时下架时间',
                    value: currentDate
                }, cacheGoodDetail);
                this.goodDetail = cacheGoodDetail;
            },
            onInput(event) {
                currentDate = formatDateTime(event.detail / 1000, 'str');
            },
            cancel() {
                this.showpicker = false;
            },
            startmove() {},
            inputCell(val) {
                cacheGoodDetail = updateGoodInfo.call(this, val, cacheGoodDetail);
            },
            getImages(list) {
                cacheGoodDetail = updateGoodInfo.call(this, list, cacheGoodDetail)
            },
            clickCell(val) {
                if (val.label == '定时下架时间') {
                    this.showpicker = true;
                } else {
                    toEditPage.call(this, val, cacheGoodDetail);
                }
            },
            save() {
                this.goodDetail = cacheGoodDetail;
                let data = editGoodModel(cacheGoodDetail, cacheSubmitData);
                if (DataFrom.from == 'addGoods') {
                    data = deleteNull.call(this, data); //删除不必要字段，兼检查数据格式
                    uploadImg.call(this, data).then(res => {
                        data && this.Request('addGoods', res).then(res => {
                            if (res.error == 0) {
                                this.Cacher.clearData('editGood')
                                uni.navigateBack();
                            } else {
                                this.Toast(res.message);
                            }
                        }).catch(res => {
                            this.Toast(res.message);
                        })
                    })
                } else {
                    uploadImg.call(this, data).then(newData => { 
                        this.Request('editGoodDetail', newData).then(res => { 
                            if (res.error == 0) {
                                uni.navigateBack();
                            } else {
                                this.Toast(res.message);
                            }
                        }).catch(res => {
                            this.Toast(res.message);
                        })
                    })
                }
            },
            initPage() {
                DataGo = this.Cacher.getData('editGood');
                DataGo = Object.assign(DataGo, this.Cacher.getData(DataGo.go));
                if (DataGo.go) {
                    // DataGo = this.Cacher.getData(DataGo.go);
                }
                if (DataGo.go == 'editName' || DataGo.go == 'editSubTitle' || DataGo.go == 'selectType' || DataGo.go == 'editCode' || DataGo.go == 'setFreight' || DataGo.go == 'editForm' || DataGo.go == 'editStatus' || DataGo.go == 'editMultiCode' || DataGo.go == 'autoDeliverContent' || DataGo.go == 'addGoodType' || DataGo.go == 'editType') {
                    cacheGoodDetail = updateGoodInfo.call(this, DataGo.needChange, cacheGoodDetail);
                    this.goodDetail = cacheGoodDetail;
                    this.Cacher.clearData(DataGo.go)
                }
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.Cacher.setData('editGood', {
                from: option.from || ''
            })
            this.initPage();
            cacheSubmitData={};
            cacheGoodDetail={};
            if (DataFrom.from == 'addGoods') { //添加商品，生成模板数据
                mockApi.call(this, {
                    type: '实体商品', //'实体商品', '虚拟物品', '电子卡密',
                    typeId: 1, //1 2 3
                }).then(res => {
                    cacheSubmitData = res; //提交的时候要一一对应
                    cacheGoodDetail = addGoodsModel.call(this, res);
                    this.goodDetail = cacheGoodDetail;
                });
            } else {
                this.Request('getGoodDetail', {
                    goods_id: DataFrom.item.detail.goodId,
                }).then(res => {
                    cacheSubmitData = res; //提交的时候要一一对应
                    cacheGoodDetail = goodData.call(this, res);
                    this.goodDetail = cacheGoodDetail;
                });
            }
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
        .bg {
            position: fixed;
            background: rgba(0, 0, 0, .5);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            .picker {
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
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
            box-shadow: 0 0 10upx 0 rgba(0, 0, 0, .1);
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