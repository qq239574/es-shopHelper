<template>
    <!-- 单规格 -->
    <div class='pagesCommodity-pages-index page' >
        <goodInfo @click='clickGoodInfo' @getImages='getImages' @input='getInput'></goodInfo>
        <goodInfo2 @click='clickGoodInfo'  @input='getInput'></goodInfo2>
        <view class="margin20"></view>
        <goodInfo3 @click='clickGoodInfo'  @input='getInput'></goodInfo3>
        <view class="margin20"></view>
        <selectItem label='状态' value='上架售卖'></selectItem>
        <view class="padding"></view>
        <view class="footer">
            <longButton>保存</longButton>
        </view>
    </div>
</template>

<script>
    import goodInfo from '../components/editGood-Block1';
    import goodInfo2 from '../components/editGood-Block2.vue'
    import goodInfo3 from '../components/editGood-Block3.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import {
        mapState
    } from 'vuex'
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
                moving: false
            }
        },
        computed: {
            ...mapState({
                good: 'goodDetail'
            })
        },
        methods: {
            getInput(val){
                console.log(val)
            },
            getImages(list) {
                console.log(list)
            },
            clickGoodInfo(val) {
                console.log(val)
            },
            startmove(bool) {
                this.moving = bool;
                console.log('object', bool)
            }
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