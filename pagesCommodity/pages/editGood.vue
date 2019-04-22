<template>
    <div class='edit-good page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' @change='change'></radioBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cache = '修改';
    export default {
        components: {
            radioBlock
        },
        data() {
            return {
                list: [{
                    label: '不使用表单',
                    value: '',
                    subValue:''
                }, {
                    label: '西门子洗碗机表单',
                    value: ' ',
                    subValue: ''
                }, {
                    label: '吐鲁番葡萄表单',
                    value: ' ',
                    subValue: ''
                }, ]
            }
        },
        methods: {
            initPage() {
                DataFrom = this.Cacher.getData('setFreight') || {}; 
                if (DataFrom.from == 'setTotalFreight') { 
                    this.list[0].subValue=DataFrom.value.subValue;
                    this.Cacher.setData('billDetail',{
                        from:'setFreight',
                        needChange:{
                            label:'商品表单',
                            value:this.list[0].subValue
                        }
                    })
                }
            },
            change(val) {
                cacheVal = val;
                this.Cacher.setData('setFreight',{
                    from: 'setFreight',
                    value: val
                }) 
                cache = val.value;
            }
        },
        onLoad(option) {
            this.initPage()
        },
        onShow() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .setfreight {}
</style>