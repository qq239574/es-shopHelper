<template>
    <view class='pagesLogin-pages-questions page'>
        <van-cell-group>
            <van-field :value="newName" placeholder="请输入用户名" @input="getName" clearable @clear='getName' />
            <van-cell :title="question" is-link @click='showQuestions' />
            <van-field :value="answer" placeholder="请输入安全提示答案" @input="getAnswer" clearable @clear='getAnswer' />
        </van-cell-group>
        <view class='margin'></view>
        <LongButton class='button' :disable='canSub' @click='nextPage'>确定</LongButton>
        <PopUp :toggle='showList'>
            <van-cell-group>
                <van-cell :title="item" v-for='(item,index) in questionList' :key='index' @tap.stop='select(item,index)'>
                    <van-icon slot='right-icon' name="checked" class='checked' custom-style='color:#fb6638;margin-top:6px;' v-if='index===checkedNo' />
                </van-cell>
            </van-cell-group>
        </PopUp>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    let userId = '',
        password = '';
    import LongButton from '../../components/my-components/LongButton';
    import PopUp from '../../components/my-components/PopUp2.vue';
    let type = '';
    let session_id = ''; //
    let questions = []; //	安全问题
    let registerType = ''; //	注册类型(username,mobile,email)
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
                questionList: [],
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
                this.showList = !this.showList;
            },
            nextPage() {
                this.pageLoading();
                this.Request('verifyCode', { //验证验证码
                    session_id: session_id,
                    type: 'username', //注册方式 (mobile 或 email)
                    account: this.newName,
                    verify_code: '',
                    question: this.question,
                    answer: this.answer
                }).then(res => {
                    this.closePageLoading();
                    if (res.error == 0) {
                        this.Cacher.setData('questions', {
                            from: 'questions',
                            info: {
                                type:'username', //验证类型
                                session_id,
                                account: this.newName,
                                registerType, //注册类型
                                question: this.question,
                                answer: this.answer,
                                verify_code:''
                            }
                        })
                        uni.navigateTo({
                            url: './setNew?from=questions'
                        })
                    } else {
                        this.Toast(res.message)
                    }
                }).catch(res => {
                    this.Toast(res.message)
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
                if (val.type == 'input') {
                    this.answer = val.detail;
                } else {
                    this.answer = '';
                }
            }
        },
        onLoad() {
            this.pageLoading();
            this.Request('initPassword', {}).then(res => {
                session_id = res.session_id;
                questions = res.settings.questions;
                registerType = res.settings.type;
                this.questionList=questions;
                this.closePageLoading();
            })
        }
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