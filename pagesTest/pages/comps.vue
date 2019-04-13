<template>
    <view>
        <uni-badge text="2" type="success"></uni-badge>
        <uni-card title="标题文字" thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="额外信息" note="Tips">
            内容主体，可自定义内容及样式
        </uni-card>
        <uni-card is-full="true" title="DCloud" thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="2018.12.12" note="Tips">
            内容主体，可自定义内容及样式，内容主体，可自定义内容及样式，内容主体，可自定义内容及样式
        </uni-card>
        <uni-collapse accordion="true">
            <uni-collapse-item title="标题文字">
                <view style="padding: 30upx;">
                    手风琴效果
                </view>
            </uni-collapse-item>
            <uni-collapse-item title="标题文字">
                <view style="padding: 30upx;">
                    手风琴效果
                </view>
            </uni-collapse-item>
            <uni-collapse-item title="标题文字">
                <view style="padding: 30upx;">
                    手风琴效果
                </view>
            </uni-collapse-item>
        </uni-collapse>
        <uni-drawer :visible="true">
            <view style="padding:30upx;">
                <view class="uni-title">抽屉式导航</view>
            </view>
        </uni-drawer>
        <uni-grid :options="[
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',text:'圣诞树'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/lindang.png',text:'铃铛'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/laoren.png',text:'圣诞老人'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/liwu.png',text:'礼物'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/maozi.png',text:'帽子'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/shoutao.png',text:'手套'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/xueqiao.png',text:'雪橇'},
                            {image:'https://img-cdn-qiniu.dcloud.net.cn/img/xunlu.png',text:'驯鹿'}]" column-num="4">
        </uni-grid>
        <uni-icon type="contact" size="30"></uni-icon>
        <uni-list>
            <uni-list-item title="标题文字" show-switch="true" show-arrow="false"></uni-list-item>
        </uni-list>
        <uni-load-more status="loading"></uni-load-more>
        <uni-notice-bar show-icon="true" scrollable="true" single="true" text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏">
        </uni-notice-bar>
        <uni-number-box :min="0" :max="9"></uni-number-box>
        <uni-pagination show-icon="true" total="50" current="2">
        </uni-pagination>
        <uni-rate max="10" value="5"></uni-rate>
        <uni-steps :data="[
        {title:'买家下单',desc:'2018-11-11'},
        {title:'卖家发货',desc:'2018-11-12'},
        {title:'买家签收',desc:'2018-11-13'},
        {title:'交易完成',desc:'2018-11-14'}]" direction="column" :active="2">
        </uni-steps>
        <uni-tag text="标签" type="error" :circle="true"></uni-tag>
    </view>
</template>

<script>
    import {
        uniBadge,
        uniCard,
        uniCollapse,
        uniCollapseItem,
        uniDrawer,
        uniGrid,
        uniIcon,
        uniList,
        uniListItem,
        uniLoadMore,
        uniNoticeBar,
        uniNumberBox,
        uniPagination,
        uniRate,
        uniSteps,
        uniTag 
    } from '@dcloudio/uni-ui'
    export default {
        components: {
            uniBadge,
            uniCard,
            uniCollapse,
            uniCollapseItem,
            uniDrawer,
            uniGrid,
            uniIcon,
            uniList,
            uniListItem,
            uniLoadMore,
            uniNoticeBar,
            uniNumberBox,
            uniPagination,
            uniRate,
            uniSteps,
            uniTag 
        }
    }
</script>

<style lang="scss" scoped>

</style>