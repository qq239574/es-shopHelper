<template>
	<div class='pages-self-index'>
		self
		<Button @click='toTest'>Test</Button>
<Button @click='toEcharts'>echarts</Button>
	</div>
</template>

<script>
	export default {
		methods: {
			toTest() {
				uni.navigateTo({
					url: '../../pagesTest/pages/test'
				})
			},toEcharts(){
				uni.navigateTo({
					url: '../../pagesTest/pages/echarts'
				})
			}
		},

	}
</script>

<style lang="scss" scoped>

</style>
