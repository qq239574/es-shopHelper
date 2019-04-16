<template>
    <view class='page pages-index-index'>
        <view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
            <view class="grace-form">
                
            </view>
        </view>
        <LongButton @click='toLogin'></LongButton>
    </view>
</template>
<script>
    import LongButton from '../../components/my-components/LongButton'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import switchItem from '../../components/my-components/editBlock-SwitchItem.vue'
    export default {
        components: {
            LongButton,
            selectItem,
            inputItem,
            switchItem
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
