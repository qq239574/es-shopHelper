<template>
    <!-- 单规格 -->
    <div class='pagesCommodity-pages-index page'>
        <goodInfo :info='goodDetail.info1' @click='clickCell' @getImages='getImages' @input='inputCell'></goodInfo>
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
    </div>
</template>

<script>
    import {
        singleData
    } from '../components/testdata.js' //测试用数据
    import goodInfo from '../components/editGood-Block1';
    import goodInfo2 from '../components/editGood-Block2.vue'
    import goodInfo3 from '../components/editGood-Block3.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import {
        mapState
    } from 'vuex'
    let cacheGoodDetail={};
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
        computed: {
            ...mapState({
                good: 'goodDetail'
            })
        },
        methods: {
            inputCell(val) {
                console.log(val)
            },
            getImages(list) {
                console.log(list)
            },
            clickCell(val) {
                console.log(val)
            }, 
            save() {}
        },
        onLoad() {
            cacheGoodDetail= singleData();
            this.goodDetail =cacheGoodDetail;
        },
        beforeMount() {
            console.log(this.good)
        },
    }
</script>

<style lang="scss" scoped>
    .pagesCommodity-pages-index {
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