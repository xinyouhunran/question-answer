<template>
	<div id="child">
		<h1 v-text="msg" @click="getData()"></h1>
		<p>{{newId}}</p>
		<input type="text" v-model="id" @change="getInput"/>
		<p v-text="authorName"></p>
		<!--<xfooter></xfooter>-->
		<el-row :gutter="20">
		  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
		</el-row>
		<i class="el-icon-share"></i>
		<el-upload
		  class="avatar-uploader"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  :on-error="handleAvatarError"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<img :src="imageUrl" class="avatar"/>
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
				mydata:[],
				imageUrl: ''
			}
		},
		computed:{
			newId:{
					get:function(){
					return this.id;
				},
					set: function (id) {
			      	this.id = id;
			    }
			},
			authorName:function(){
				var _this = this;
				/*new Promise(function(resolve,reject){*/
					_this.$store.dispatch('increment',{detial:{author:{loginname:"456"}}});
					/*resolve()
				}).then(function(){*/
					//console.log(_this.$store.state.detial);
					return _this.$store.state.detial.author.loginname;
				/*})*/
				
				
			}
		},
		methods:{
			getData(){
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
			},
			getInput(){
				this.id = this.id+"haha";
			},
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
		    handleAvatarError(err,file){
		    	alert(err);
		    },
		      beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        console.log(file);
		        var reader = new FileReader();
		        var self = this;
	            reader.onload = (function (theFile) {
	                return function (e) {
	                	/*$(_this).prev().attr("src",e.target.result);*/
	                	console.log(theFile);
	                	console.log(e);
	                	self.imageUrl = e.target.result;
	                };
	            })(file);
	            reader.readAsDataURL(file);
		        return isJPG && isLt2M;
		      }
		},
		mounted(){
			this.id = this.$route.query.id;
			console.log(this.id);
			/*console.log(this.$store.state.detial);*/
			this.$store.dispatch('increment',{detial:{author:{loginname:"789"}}});
			//console.log(this.$store.state.detial.author.loginname);;
		},
		/*watch:{
			'id':'getData'
		}*/
	}
</script>

<style scoped>
	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>