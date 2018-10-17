<template>
	<div id="demo">
		<h2>123</h2>
		<router-view :msg='msg1'></router-view>
	</div>
</template>

<script>
	export default{
		name:"demo",
		data(){
			return {
				msg1:'hahaha'
			}
		}
	}
</script>

<style>
</style>