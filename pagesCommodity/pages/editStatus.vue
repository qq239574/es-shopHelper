<template>
    <div class='edit-status page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' :defaultIndex='defaultIndex' @clickItem='change'></radioBlock>
        <view class="bg" v-show='showpicker'>
            <van-datetime-picker class='picker' type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @input="onInput" @confirm='confirm' @cancel='cancel' />
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock.vue'
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
                defaultIndex: 0,
                currentDate: '',
                showpicker: false,
                minDate: new Date().getTime() + 5 * 60000, //5分钟后
                maxDate: new Date(getDate(365)).getTime(), //一年后
                list: [ {
                    label: '放置仓库',
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
                    subValue: ' ',
                    id: 3
                }, ]
            }
        },
        methods: {
            confirm() {
                this.showpicker = false;
                this.currentDate = currentDate;
                this.list[3].subValue = currentDate;
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
                this.Cacher.setData('editStatus', DataFrom)
            },
            cancel() {
                this.showpicker = false;
            },
            onInput(event) {
                currentDate = formatDateTime(event.detail / 1000, 'str');
            },
            initPage() { 
                this.list.forEach((item, index) => {
                    if (item.label == DataFrom.needChange.value) {
                        this.defaultIndex = index;
                        DataFrom.needChange = {
                            label: '状态',
                            value: item.label,
                            from: 'editStatus',
                            other: {
                                label: '状态',
                                value: item.label,
                                subValue: item.label == '定时上架' ? DataFrom.detail.info4.status.putaway_time : ' ',
                                id: item.id
                            }
                        }
                        if (item.label == '定时上架') {
                            this.list[3].subValue = DataFrom.detail.info4.status.putaway_time;
                        }
                        this.Cacher.setData('editStatus', DataFrom)
                    }
                })
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