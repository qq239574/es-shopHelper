<template>
    <view class='pagesLogin-pages-questions page'>
        <van-cell-group>
            <van-field :value="newName" placeholder="请输入用户名" @input="getName" clearable @clear='getName' />
            <van-cell :title="question" is-link @click='showQuestions' />
            <van-field :value="answer" placeholder="请输入安全提示答案" @input="getAnswer" clearable @clear='getAnswer' />
        </van-cell-group>
        <view class='margin'></view>
        <LongButton class='button' :disable='canSub' @click='nextPage'>确定</LongButton>
        <PopUp @close='closeQuestions' :show='showList'>
            <van-cell-group>
                <van-cell :title="item" v-for='(item,index) in questionList' :key='index' @tap.stop='select(item,index)'>
                    <van-icon slot='right-icon' name="checked" class='checked' v-if='index===checkedNo' />
                </van-cell>
            </van-cell-group>
        </PopUp>
    </view>
</template>

<script>
    let userId = '',
        password = '';
    import LongButton from '../../components/my-components/LongButton';
    import PopUp from '../../components/my-components/PopUp.vue';
    export default {
        components: {
            LongButton,
            PopUp
        },
        computed: {
            canSub() {
                return this.newName === '' || this.question === '请选择安全提示问题' || this.answer === '';
            }
        },
        data() {
            return {
                openEye: false,
                questionList: [
                    '您的母亲叫什么名字？',
                    '您配偶的生日是？',
                    '您的学号（或工号）是？',
                    '您的高中班主任的名字是？',
                    '您的父亲的生日是？',
                    '您最熟悉的学校宿舍室友的名字是？',
                    '您的小学老师叫什么名字？'
                ],
                checkedNo: '',
                showList: false,
                newName: '',
                answer: '',
                question: '请选择安全提示问题'
            }
        },
        methods: {
            select(val, index) {
                this.checkedNo = index;
                this.question = val;
            },
            showQuestions() {
                this.showList = true;
            },
            closeQuestions() {
                this.showList = false;
            },
            nextPage() {
                uni.reLaunch({
                    url: '../../pages/index/index'
                })
            },
            getName(val) {
                if (val.type == 'input') {
                    this.newName = val.detail;
                } else {
                    this.newName = '';
                }
            },
            getAnswer(val) {
                if(val.type=='input'){
                    this.answer = val.detail;
                }else{
                     this.answer ='';
                }
                
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pagesLogin-pages-questions {
        background: #fff;
        padding: 20upx 24upx;
        .margin {
            height: 80upx;
        }
        .checked {
            color: #fb6638;
        }
        .van-popup {
            left: 0!important;
            .grace-scroll-y {
                height: fit-content;
                max-height: 750upx;
                width: 750upx;
                .grace-items {
                    height: 96upx;
                }
            }
        }
    }
</style>