<template>
    <div class='edit-status page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' @clickItem='change'></radioBlock>
        <view class="bg" v-show='showpicker'>
            <van-datetime-picker class='picker' type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @input="onInput" @confirm='confirm' @cancel='cancel' />
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cache = ' ';
    import {
        formatDateTime
    } from '../../graceUI2.0/jsTools/date.js'
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    let currentDate = [];
    export default {
        components: {
            radioBlock,
        },
        data() {
            return {
                currentDate: '',
                showpicker: false,
                minDate: new Date().getTime() + 5 * 60000, //5分钟后
                maxDate: new Date(getDate(365)).getTime(), //一年后
                list: [{
                    label: '已删除',
                    value: ' ',
                    subValue: '',
                    id: -1
                }, {
                    label: '下架',
                    value: ' ',
                    subValue: '',
                    id: 0
                }, {
                    label: '上架售卖',
                    value: ' ',
                    subValue: '',
                    id: 1
                }, {
                    label: '上架隐藏',
                    value: ' ',
                    subValue: '',
                    id: 2
                }, {
                    label: '定时上架',
                    value: '修改',
                    subValue: '04-02 12:12:44',
                    id: 3
                }, ]
            }
        },
        methods: {
            confirm() {
                this.showpicker = false;
                this.currentDate = currentDate;
                this.list[4].subValue = currentDate;
                DataFrom.needChange = {
                    label: '状态',
                    value: '定时上架',
                    from: 'editStatus',
                    other: {
                        label: '状态',
                        value: '定时上架',
                        subValue: currentDate,
                        id: 3
                    }
                }
                this.Cacher.setData('billDetail', DataFrom)
            },
            cancel() {
                this.showpicker = false;
            },
            onInput(event) {
                currentDate = formatDateTime(event.detail / 1000, 'str');
            },
            initPage() {
                DataFrom = this.Cacher.getData('billDetail') || {};
            },
            change(val) {
                cacheVal = val;
                this.Cacher.setData('editStatus', {
                    needChange: {
                        label: '状态',
                        value: val.label,
                        other: val
                    }
                })
                if (val.value == '修改' && cache != '修改') {} else if (val.value == '修改' && cache == '修改') {
                    this.showpicker = true;
                    this.minDate = new Date().getTime() + 5 * 60000;
                    this.maxDate = new Date(getDate(365)).getTime();
                } else {}
                cache = val.value;
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from) || {};
            DataFrom.needChange = {
                label: '状态',
                value: '已删除',
                from: 'editStatus',
                other: {
                    label: '状态',
                    value: '已删除',
                    subValue: ' ',
                    id: -1
                }
            }
            this.Cacher.setData('editStatus', DataFrom)
            this.initPage()
        },
        onShow() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .edit-status {
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
    }
</style>