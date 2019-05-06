<template>
    <div>
        <web-view :webview-styles="webviewStyles" :src="from"></web-view> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
                from: ''
            }
        },
        onLoad(option) {
            this.from=decodeURIComponent(option.url); 
        }
    }
</script>

<style lang="scss" scoped>

</style>