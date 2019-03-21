<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
		  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="18">
		
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="活动名称">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域">
		    <el-select v-model="form.region" placeholder="请选择活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="活动时间">
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
		    </el-col>
		    <el-col class="line" :span="2">-</el-col>
		    <el-col :span="11">
		      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="即时配送">
		    <el-switch v-model="form.delivery"></el-switch>
		  </el-form-item>
		  <el-form-item label="活动性质">
		    <el-checkbox-group v-model="form.type">
		      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
		      <el-checkbox label="地推活动" name="type"></el-checkbox>
		      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
		      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
		    </el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="特殊资源">
		    <el-radio-group v-model="form.resource">
		      <el-radio label="线上品牌商赞助"></el-radio>
		      <el-radio label="线下场地免费"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="活动形式">
		    <el-input type="textarea" v-model="form.desc"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		  <el-form-item>
		  	<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" :step="2"></el-input-number>
		  	<!--
              	作者：offline
              	时间：2019-03-21
              	描述：step代表递增递减的数值
              -->
		  </el-form-item>
		</el-form>
		</el-col>
		</el-row>
		<el-transfer
		    filterable
		    :filter-method="filterMethod"
		    filter-placeholder="请输入城市拼音"
		    v-model="value2"
		    :data="data2">
		  </el-transfer>
	</div>
	
</template>

<script>
	export default{
		data(){
			const generateData2 = _ => {
	        const data = [];
	        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
	        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
	        cities.forEach((city, index) => {
		          data.push({
		            label: city,
		            key: index,
		            pinyin: pinyin[index]
		          });
		        });
		        return data;
		      };
			return{
				form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		       },
		       num1: 1,
		       data2: generateData2(),
		        value2: [],
		        filterMethod(query, item) {
		          return item.pinyin.indexOf(query) > -1;
		        }
			}
		},
		methods: {
	      onSubmit() {
	        console.log('submit!');
	      },
	      handleChange(value) {
	        console.log(value);
	      }
	    }
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
</style>