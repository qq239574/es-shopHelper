<template>
    <view class='multi-block  page'>
        <view class="block" v-for='(item,index) in list' :key='index'>
            <goodModal :info='item' @delete='delSpec' @input='getSpec'></goodModal>
        </view>
        <view class='isSingle' v-if='!list.length'>单规格</view>
        <view class='addType' @click='addType' v-if='list.length<3'>
            +添加规格
        </view>
        <view class='maxLength' v-else>*最多添加3个规格</view>
        <view class="footer">
            <longButton @click='sure'>确认</longButton>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import multiLine from '../../components/my-components/editBlock-MultiLine.vue'
    import goodModal from '../components/addGoodModal.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import checkTypes from '../components/checkAddSpecs.js'
    let DataFrom = {};
    let cacheList = [];
    let specIndex = 0;
    export default {
        components: {
            inputItem,
            selectItem,
            multiLine,
            goodModal,
            longButton
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            sure() {
                let canSub = checkTypes.call(this, this.list);
                if (canSub) {
                    DataFrom.needChange.other.list=this.list;
                    this.Cacher.setData('addGoodType', DataFrom);
                    uni.navigateBack();
                }
            },
            delSpec(val) {
                this.list = this.list.filter(item => {
                    return val.id != item.id
                })
            },
            getSpec(val) {
                this.list = this.list.map(item => {
                    if (item.id == val.id) {
                        return val;
                    } else {
                        return item;
                    }
                })
            },
            addType() {
                specIndex++;
                this.list.push({
                    id: 'spec' + specIndex,
                    title: '',
                    items: []
                })
            },
            inputCell(val) {},
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            if (DataFrom) {
                this.list = DataFrom.needChange.other.list;
                this.Cacher.setData('addGoodType', DataFrom); 
            }
        }
    }
</script>

<style lang="scss" scoped>
    .multi-block {
        width: 100%;
        margin: 0 auto 20upx;
        .isSingle {
            font-size: 40upx;
            font-weight: 700;
            color: #ccc;
            text-align: center;
            line-height: 200upx;
        }
        .addType {
            width: 710upx;
            height: 100upx;
            line-height: 98upx;
            font-size: 26upx;
            margin: 20upx auto 300upx;
            background: #fff;
            color: #fb6638;
            text-align: center;
            border-radius: 4upx;
        }
        .block {
            width: 710upx;
            margin: 20upx auto 0;
            background: #fff;
            border-radius: 4upx;
            overflow: hidden;
        }
        .maxLength {
            font-size: 26upx;
            line-height: 120upx;
            text-align: center;
            color: #ccc;
            margin-bottom: 200upx;
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