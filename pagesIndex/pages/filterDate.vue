<template>
    <view class='filte-date page'>
        <dateBlock :items='items' @click='getDay' :default='selectNearDays'></dateBlock>
        <view class='radio'>
            <inputItem :disabled='true' label='自定义日期' value=' ' labelStyle='color:#6f7685'></inputItem>
            <radio :value="item.value" :checked="true" color='#fb6638' v-if='selectNearDays<0' />
        </view>
        <DatePicker @change='getStart' :showLimit='showLimit'>
            <selectItem label='开始日期' :value='startDate'></selectItem>
        </DatePicker>
        <DatePicker @change='getEnd' :showLimit='showLimit'>
            <selectItem label='截止日期' :value='endDate'></selectItem>
        </DatePicker>
        <view class="tip">
            <view v-if='showLimit'>*最大筛选日期长度为90天
            </view>
        </view>
        <langButton @click='goBack'>确定</langButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import dateBlock from '../components/FilteDate--radioGroup.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import langButton from '../../components/my-components/LongButton.vue'
    import DatePicker from '../../components/my-components/DatePicker.vue'
    import Toast from '../../wxcomponents/vant-weapp/toast/toast';
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    let searchSection = []; //搜索日期区间
    let DataFrom = {}; //页面传参
    let selectNearDays = 0;
    export default {
        components: {
            dateBlock,
            selectItem,
            inputItem,
            langButton,
            DatePicker
        },
        data() {
            return {
                items: [{
                    label: '近7日',
                    from: -7,
                    to: 0,
                    id: 0
                }, {
                    label: '近15日',
                    from: -15,
                    to: 0,
                    id: 1
                }, {
                    label: '近30日',
                    from: -30,
                    to: 0,
                    id: 2
                }],
                nearDay: 0,
                startDate: '',
                endDate: '',
                selectNearDays: 0,//标识，用于判断返回“今天”还是返回"from~to"
                showLimit: true
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            if (DataFrom.from == 'toper') {
                this.showLimit = false;
                this.items = [{
                    label: '今日',
                    from: 0,
                    to: 0,
                    id: 0
                }, {
                    label: '昨日',
                    from: -1,
                    to: -1,
                    id: 1
                }, {
                    label: '近7日',
                    from: -7,
                    to: 0,
                    id: 2
                }];
            } else {
                this.showLimit = true;
            }
        },
        onShow() {
            this.initPage();
        },
        methods: {
            initPage() {
                searchSection = [getDate(this.items[0].from), getDate(this.items[0].to), this.items[0].label]; //默认第一选项
                // this.startDate = searchSection[0];
                // this.endDate = searchSection[1];
            },
            getStart(date) {
                this.startDate = date;
                this.nearDay = 0;
                selectNearDays = -1;
                this.selectNearDays = selectNearDays;
                searchSection[0] = this.startDate;
            },
            getEnd(date) {
                this.endDate = date;
                this.nearDay = 0;
                selectNearDays = -1;
                this.selectNearDays = selectNearDays;
                searchSection[1] = this.endDate;
            },
            goBack() {
                if (!searchSection[0]) {
                    Toast('请选择开始日期')
                } else if (!searchSection[1]) {
                    Toast('请选择截止日期')
                } else if (new Date(searchSection[1]) - new Date(searchSection[0]) >= 0) {
                    searchSection[0] = this.startDate || searchSection[0];
                    searchSection[1] = this.endDate || searchSection[1];
                    if (selectNearDays < 0) {
                        searchSection[2] = searchSection[0] + ' ~ ' + searchSection[1];
                    }
                    this.Cacher.setData('filterDate', {
                        from: 'filterDate',
                        date: searchSection
                    });
                    uni.navigateBack({
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                } else {
                    Toast('开始日期不能超过截止日期')
                }
            },
            getDay(val) {
                this.nearDay = val.to - val.from;
                searchSection = [getDate(val.from), getDate(val.to), val.label];
                this.selectNearDays = val.id;
                selectNearDays=val.id;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .filte-date {
        width: 100%;
        .tip {
            width: 100%;
            height: 80upx;
            view {
                width: 100%;
                height: 80upx;
                line-height: 70 upx;
                color: #6f7685;
                font-size: 26upx;
                padding: 0 20upx;
            }
        }
        .radio {
            position: relative;
            radio {
                position: absolute;
                top: 20upx;
                right: 20upx;
                transform: scale(.8);
            }
        }
    }
</style>