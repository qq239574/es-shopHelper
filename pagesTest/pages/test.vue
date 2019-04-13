<template>
	<div class='test page'>

		<myButtonGroup></myButtonGroup>
		<myCellSimple>
			<span slot='pre' class=''>tag</span>
			<span slot='aft'>222</span>
		</myCellSimple>
		<myCellBlock>
			<span slot='pre'>1</span><span slot='mid'>2</span><span slot='aft'>3</span>
		</myCellBlock>
		<muLongButton @click='clickBut'></muLongButton>
		<muRoundButton @click='clickBut'></muRoundButton>
		<!-- <graceLoading :loadingType="loadingType" :show="show">123</graceLoading> -->
		 
	</div>
</template>

<script>
	import myButtonGroup from '../../components/my-components/ButtonGroup.vue';
	import myCellSimple from '../../components/my-components/CellSimple.vue';
	import myCellBlock from '../../components/my-components/CellBlock.vue';
	import muLongButton from '../../components/my-components/LongButton.vue';
	import muRoundButton from '../../components/my-components/RoundButton.vue';
	import myDataShower from '../../components/my-components/DataShower.vue';
	import graceLoading from '../../graceUI/components/graceLoading.vue'
	export default {
		components: {
			myButtonGroup,
			myCellSimple,
			myCellBlock,
			muLongButton,
			muRoundButton,
			myDataShower,
			graceLoading
		},
		data() {
			return {
				loadingType: 1,
				show: true
			}
		},
		methods: {
			clickBut(val) {
				console.log(val)
			}
		},
	}
</script>

<style lang="scss" scoped>
.test{
	>.grace-list{
		flex-wrap: wrap;
		>.items{
			height:fit-content;
			overflow: hidden;
		}
	}
}
</style>
