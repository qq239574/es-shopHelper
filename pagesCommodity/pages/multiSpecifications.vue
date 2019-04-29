<template>
    <view class='multi-specification page'>
        <Block1 :info='goodDetail.info1' @click='clickCell' @input='inputCell'></Block1>
        <Block2 :info='goodDetail.info2' @click='clickCell' @input='inputCell'></Block2>
        <selectItem :value='goodDetail.info3.status.value' label='状态' @click='clickCell'></selectItem>
        <view class="footer">
            <longButton @click='save'>保存</longButton>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import Block1 from '../components/editGood-MultiBlock1.vue'
    import Block2 from '../components/editGood-MultiBlock2.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import {
        multiData
    } from '../components/goodDetail.js' //测试用数据
    import toEditPage from '../components/toEditPage-multi.js'
    import updateGoodInfo from '../components/updateGoodInfo-multi.js'
    let cacheGoodDetail = {};
    let DataFrom = {};
    export default {
        components: {
            Block1,
            Block2,
            selectItem,
            longButton
        },
        data() {
            return {
                goodDetail: {}
            }
        },
        methods: {
            initPage() {
                if (DataFrom.from == 'editName') { //编辑名称页面，编辑分类页面，编辑运费页面
                    DataFrom = this.Cacher.getData(DataFrom.from);
                    cacheGoodDetail = DataFrom.goodDetail;
                } else if (DataFrom.from) {
                    DataFrom = this.Cacher.getData(DataFrom.from);
                }
                this.goodDetail = cacheGoodDetail;
            },
            clickCell(val) {
                toEditPage.call(this, val, cacheGoodDetail)
            },
            inputCell(val) {
                cacheGoodDetail = updateGoodInfo.call(this, val, cacheGoodDetail)
            },
            save() {
                this.goodDetail = cacheGoodDetail;
            }
        },
        onLoad(option) {
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from);
            }
            cacheGoodDetail = multiData(); //智能load的时候请求一次，show的时候不可
            this.initPage()
        },
        onShow() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .multi-specification {
        padding: 0 0 200upx;
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