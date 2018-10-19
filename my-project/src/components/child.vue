<template>
	<div id="child">
		<h1 v-text="msg" @click="getData()"></h1>
		<p>{{newId}}</p>
		<input type="text" v-model="newId"/>
		<p v-text="authorName"></p>
		<!--<xfooter></xfooter>-->
	</div>
</template>

<script>
	import xfooter from '@/components/common/footer'
	import axios from 'axios';
	export default{
		name:'child',
		props:['msg'],
		components:{
			xfooter
		},
		data(){
			return{			
				msg1:"我是子",
				id:'2',
				mydata:[]
			}
		},
		computed:{
			newId:{
					get:function(){
					return this.id+'px';
				},
					set: function (id) {
					this.newId = '';
			      	this.id = id;
			    }
			},
			authorName:function(){
				var _this = this;
				/*new Promise(function(resolve,reject){*/
					_this.$store.commit('increment',{detial:{author:{loginname:"456"}}});
					/*resolve()
				}).then(function(){*/
					console.log(_this.$store.state.detial);
					return _this.$store.state.detial.author.loginname;
				/*})*/
				
				
			}
		},
		methods:{
			getData:()=>{
				var _this = this;
				axios.get('https://msjwt.szga.gov.cn/wgqyfwt/query/queryTotals')
				.then(function (response) {
				    console.log(response);
				    _this.mydata =[...response.data.data];
				    console.log(_this.mydata);
				 })
				.catch(function (error) {
				    console.log(error);
				 });
			}
		},
		mounted(){
			this.id = this.$route.query.id;
			console.log(this.id);
			/*console.log(this.$store.state.detial);*/
			this.$store.commit('increment',{detial:{author:{loginname:"123"}}});
			console.log(this.$store.state.detial.author.loginname);;
		},
		/*watch:{
			'id':'getData'
		}*/
	}
</script>

<style>
</style>