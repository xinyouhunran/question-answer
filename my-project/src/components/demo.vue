<template>
	<div id="demo">
		<h2>123</h2>
		<a href="#/demo/child?id=1">lai</a>
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