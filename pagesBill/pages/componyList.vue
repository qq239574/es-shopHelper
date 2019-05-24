<template>
    <view class='compony-list page'>
        <radioGroup :hideRightArrow='true' placeholder=' ' :defaultIndex='defaultIndex' :items='list' @clickItem='select'></radioGroup>
    </view>
</template>

<script>
    import radioGroup from '../../components/my-components/editBlock-RadioBlock.vue'
    let DataFrom = {}
    let compList = []
    export default {
        components: {
            radioGroup
        },
        data() {
            return {
                list: [], //{label:'公司1',value:'',id:0,code:''}
                defaultIndex: 0
            }
        },
        methods: {
            select(item) {
                let express = item.detail.__args__[0];
                express.express = express.label;
                this.Cacher.setData('componyList', express);
            }
        },
        onLoad(option) {
            if (option.from == 'safeQuestions') {
                uni.setNavigationBarTitle({
                    title: '选择安全提示问题'
                });
            } else {
                uni.setNavigationBarTitle({
                    title: '物流公司'
                });
            }
            DataFrom = this.Cacher.getData(option.from);
            let defaultCom = DataFrom.value.content;
            compList = DataFrom.value.info.express.map((item, index) => {
                if (defaultCom == item.name) {
                    this.defaultIndex = index;
                }
                return {
                    label: item.name,
                    value: '',
                    key: item.key,
                    code: item.code,
                    id: item.id,
                }
            })
            this.list = compList;
            this.Cacher.setData('componyList', compList[this.defaultIndex])
        }
    }
</script>

<style lang="scss" scoped>
    .compony-list {
        background: #fff;
    }
</style>