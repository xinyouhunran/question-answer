<template>
	<div id="child">
		<h1 v-text="msg" @click="getData()"></h1>
	</div>
</template>

<script>
	import axios from 'axios';
	export default{
		name:'child',
		props:['msg'],
		data(){
			return{			
				msg1:"我是子"
			}
		},
		methods:{
			getData:()=>{
				axios.get('https://msjwt.szga.gov.cn/wgqyfwt/query/queryTotals')
				.then(function (response) {
				    console.log(response);
				 })
				.catch(function (error) {
				    console.log(error);
				 });
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>