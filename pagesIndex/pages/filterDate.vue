<template>
    <view class='filte-date page'>
        <dateBlock :items='items' @click='getDay' :default='selectNearDays'></dateBlock>
        <view class='radio'>
            <inputItem :disabled='true' label='自定义日期' value=' ' labelStyle='color:#6f7685'></inputItem>
            <radio :value="item.value" :checked="true" color='#fb6638' v-if='selectNearDays<0' />
        </view>
        <DatePicker @change='getStart'>
            <selectItem label='开始日期' :value='startDate'></selectItem>
        </DatePicker>
        <DatePicker @change='getEnd'>
            <selectItem label='截止日期' :value='endDate'></selectItem>
        </DatePicker>
        <view class="tip">*最大筛选日期长度为90天</view>
        <langButton @click='goBack'>确定</langButton>
        <van-toast id="van-toast" />
    </view>
</template>

<script>
    import dateBlock from '../components/FilteDate--radioGroup'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import langButton from '../../components/my-components/LongButton.vue'
    import DatePicker from '../../components/my-components/DatePicker.vue'
    import Toast from '../../wxcomponents/vant-weapp/toast/toast';
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    import {
        setData
    } from '../../store/cache.js'
    let searchSection = []; //搜索日期区间
    let fromPage = ''; //页面传参
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
                    value: 7,
                    id: 0
                }, {
                    label: '近15日',
                    value: 15,
                    id: 1
                }, {
                    label: '近30日',
                    value: 30,
                    id: 2
                }],
                nearDay: 7,
                startDate: '',
                endDate: '',
                selectNearDays: 0
            }
        },
        onLoad(option) {
            this.initPage();
            fromPage = option.from;
        },
        onShow() {
            this.initPage();
        },
        methods: {
            initPage() {
                searchSection = [getDate(-7), getDate(0), '近7日'];
                // this.startDate = searchSection[0];
                // this.endDate = searchSection[1];
            },
            getStart(date) {
                this.startDate = date;
                this.nearDay = 0;
                selectNearDays = this.selectNearDays = -1;
                searchSection[0] = this.startDate;
            },
            getEnd(date) {
                this.endDate = date;
                this.nearDay = 0;
                selectNearDays = this.selectNearDays = -1;
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
                        searchSection[2] = searchSection[0] + '-' + searchSection[1];
                    }
                    setData('filte-date-' + fromPage, searchSection);
                    uni.navigateBack({
                        animationType: 'pop-in',
                        animationDuration: 200
                    });
                } else {
                    Toast('开始日期不能超过截止日期')
                }
            },
            getDay(val) {
                this.nearDay = val.value;
                searchSection = [getDate(-val.value), getDate(0), val.label];
                this.selectNearDays = val.id;
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
            line-height: 70 upx;
            color: #6f7685;
            font-size: 26upx;
            padding: 0 20upx;
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