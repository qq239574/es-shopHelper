<template>
    <view class='compony-list page'>
        <radioGroup :hideRightArrow='true' placeholder=' ' :items='list' @click='select'></radioGroup>
    </view>
</template>

<script>
    import radioGroup from '../../components/my-components/editBlock-RadioBlock'
    export default {
        components: {
            radioGroup
        },
        data() {
            return {
                list: [{
                    label: '公司1',
                    value: '',
                    id: 0
                }, {
                    label: '公司2',
                    value: '',
                    id: 0
                }, {
                    label: '公司3',
                    value: '',
                    id: 0
                }, ]
            }
        },
        methods: {
            select(item) {
                
                uni.naigateBack();
            }
        },
        onLoad(option){

        }
    }
</script>

<style lang="scss" scoped>
    .compony-list {
        background: #fff;
    }
</style>