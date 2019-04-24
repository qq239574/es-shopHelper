<template>
    <view class='compony-list page'>
        <radioGroup :hideRightArrow='true' placeholder=' ' :items='list' @clickItem='select'></radioGroup>
    </view>
</template>

<script>
    import radioGroup from '../../components/my-components/editBlock-RadioBlock'
    let DataFrom = {}
    let compList = []
    export default {
        components: {
            radioGroup
        },
        data() {
            return {
                list: [{
                    label: '公司1',
                    value: '',
                    id: 0,
                    code: ''
                }]
            }
        },
        methods: {
            select(item) {
                let express=item.detail.__args__[0];
                express.express=express.label;
                this.Cacher.setData('componyList',express);  
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            compList = DataFrom.value.info.express.map(item => {
                return {
                    label: item.name,
                    value: '',
                    key: item.key,
                    code: item.code,
                    id: item.id,
                    
                }
            })
            this.list = compList;
            this.Cacher.setData('componyList', compList[0])
        }
    }
</script>

<style lang="scss" scoped>
    .compony-list {
        background: #fff;
    }
</style>