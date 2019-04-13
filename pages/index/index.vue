<template>
    <view class='page pages-index-index'>
        <view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
            <view class="grace-form">
                <form @submit="formSubmit">
                    <view class="grace-items">
                        <view class="grace-label">姓名</view>
                        <input type="text" class="input" name="name"></input>
                    </view>
                    <view class="grace-items">
                        <view class="grace-label">性别</view>
                        <view class="grace-form-r">
                            <picker @change="bindPickerChange">
                                <text>{{gender[genderIndex]}}</text>
                            </picker>
                        </view>
                    </view>
                    <view class="grace-items">
                        <view class="grace-label">出生年月</view>
                        <view class="grace-form-r">
                            <picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" end="2019-01-01">
                                <text>{{dateValue}}</text>
                            </picker>
                        </view>
                        <view class="grace-items">
                            <view class="grace-label">自动保存</view>
                            <view class="grace-form-r">
                                <switch checked />
                            </view>
                        </view>
                    </view>
                </form>
            </view>
        </view>
        <LongButton @click='toLogin'></LongButton>
    </view>
</template>
<script>
    import LongButton from '../../components/my-components/LongButton'
    export default {
        components: {
            LongButton
        },
        data() {
            return {
                genderIndex: 0,
                gender: ['男', '女'],
                dateValue: "请选择"
            }
        },
        methods: {
            toLogin() {
                uni.redirectTo({
                    url: '../login/index'
                })
            },
            bindPickerChange: function(e) {
                console.log(e);
                this.genderIndex = e.detail.value;
            },
            bindDateChange: function(e) {
                this.dateValue = e.detail.value;
            },
            formSubmit: function(e) {
                uni.showToast({
                    title: '请观察控制台',
                    icon: 'none'
                });
                console.log(JSON.stringify(e.detail.value));
            }
        }
    }
</script>
