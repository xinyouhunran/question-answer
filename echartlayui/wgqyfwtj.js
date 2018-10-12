//表格数据操作
//指定行政区已登记总量
function allArea(){
	$.ajax({
		type:"get",
		url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryTotalsForArea",
		async:true,
		dataType:"json",
		success:(data)=>{
			console.log(data);
			findTable("#wgqyfwtj",false,'adsName',"https://msjwt.szga.gov.cn/wgqyfwt/query/queryTotalsForArea");
		}
	});
}
allArea();
function findTable(el,ispage,firstcol,url){//选择器,分页，数据，首列
	$(el).html("");
	layui.use('table',function(){
			var table = layui.table;
			table.render({
				elem:el,
				cellMinWidth:80,
				page:ispage,
				url:url,
				response: {
				   statusName: 'status' //规定数据状态的字段名称，默认：code
				    ,statusCode: 200 //规定成功的状态码，默认：0
				    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
				    ,dataName: 'data' //规定数据列表的字段名称，默认：data
				 },
				cols:[
					[{
						field:firstcol,
						title:'行政区域',
						align:'center'
					},
					{
						field:'propertyCompanyCounts',
						title:'已登记物业数量',
						align:'center'
					},
					{
						field:'propertyCounts',
						title:'已登记物业管理处数量',
						align:'center'
					},
					{
						field:'buildingCounts',
						title:'已登记楼宇数量',
						align:'center'
					},
					{
						field:'enterpriseCounts',
						title:'已登记企业数量',
						align:'center'
					},
					{
						field:'employeeCounts',
						title:'已登记从业人员数量',
						align:'center'
					},
					{
						field:'ventureEnterpriseCounts',
						title:'风险企业',
						align:'center'
					}]
				],
				done: function(res, curr, count){
				    //如果是异步请求数据方式，res即为你接口返回的信息。
				    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
				    console.log(res);
				    var ads = $("[data-field='adsName']");
				    for(var i=1;i<=res.data.length-1;i++){
				    	$("[data-field='adsName']").eq(i).attr("data-adsId",`${res.data[i-1].adsId}`);
				    }
				    count = res.data.length-1;
				  }
			})
		})
}
/*findTable("#wgqyfwtj");*/

//表格中第一列点击时触发
var firstflag = true;//记录是否是第一次点击第一列
$("#mytable").on("click","tbody tr td:nth-child(1)",function(){
	if(firstflag){
		var index = $(this).index();
		var xinzheng = $(this).text();
		$(".quyu").text(">>"+xinzheng);
		var str = $(".quyu").text().slice(2);
		console.log(str);
		var adsId = $(this).attr("data-adsId");
		console.log(adsId);
		firstflag = false;
		$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryTotalsByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				findTable("#wgqyfwtj",false,'name',"https://msjwt.szga.gov.cn/wgqyfwt/query/queryTotalsByAdsId?adsId="+adsId);
				$(".quyu").attr("data-adsId",adsId);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		})
	}else{
		return;
	}
})

//返回第二列数据
function secondClick(adsId){
	$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryPropertyCompaniesByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryPropertyCompaniesByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'unitName',
								title:'物业公司名称',
								align:'center'
							},
							{
								field:'unitCreditCode',
								title:'物业公司社会信用代码',
								align:'center'
							},
							{
								field:'substation',
								title:'所属分局',
								align:'center'
							},
							{
								field:'policeStation',
								title:'所属派出所',
								align:'center'
							},
							{
								field:'jbrCounts',
								title:'物业公司经办人数量',
								align:'center'
							},
							{
								field:'propertyCounts',
								title:'物业公司管理处数量',
								align:'center'
							}]
						],
					})
				})
				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable").html(),
		success:function(){
			$(".layui-layer-title").attr("data-adsId",adsId);
		}
	});
}
//表格中第二列点击时触发
$("#mytable").on("click","tbody tr td:nth-child(2)",function(){
	var adsId = getadsId(this);
	secondClick(adsId);
})

//表格中第三列点击时触发
$("#mytable").on("click","tbody tr td:nth-child(3)",function(){
	var adsId = getadsId(this);
	$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryPropertyByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryPropertyByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'unitName',
								title:'物业公司名称',
								align:'center'
							},
							{
								field:'propertyName',
								title:'物业管理处名称',
								align:'center'
							},
							{
								field:'propertyAddress',
								title:'物业管理处地址',
								align:'center'
							},
							{
								field:'contactName',
								title:'物业管理处对应经办人',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable").html()
	});
})

//表格中第四列点击时触发
$("#mytable").on("click","tbody tr td:nth-child(4)",function(){
	var adsId = getadsId(this);
	$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryBuildingByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryBuildingByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'officeBuildingName',
								title:'楼宇名称',
								align:'center'
							},
							{
								field:'propertyName',
								title:'物业管理处名称',
								align:'center'
							},
							{
								field:'officeBuildingAddress',
								title:'楼宇地址',
								align:'center'
							},
							{
								field:'longitude',
								title:'经度',
								align:'center'
							},
							{
								field:'latitude',
								title:'纬度',
								align:'center'
							},
							{
								field:'substation',
								title:'管辖公安分局',
								align:'center'
							},
							{
								field:'station',
								title:'管辖派出所',
								align:'center'
							},
							{
								field:'communityPoliceName',
								title:'负责社区民警',
								align:'center'
							},
							{
								field:'enterpriseCounts',
								title:'楼宇内登记企业数量',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable").html()
	});
})

//表格中第五列点击时触发
$("#mytable").on("click","tbody tr td:nth-child(5)",function(){
	var adsId = getadsId(this);
	$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryEnterpriseByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryEnterpriseByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'enterpriseName',
								title:'企业名称',
								align:'center'
							},
							{
								field:'enterpriseAddress',
								title:'企业地址',
								align:'center'
							},
							{
								field:'isBusinessRegistration',
								title:'是否工商注册',
								align:'center'
							},
							{
								field:'businessRegistrationCode',
								title:'工商注册号',
								align:'center'
							},
							{
								field:'principalName',
								title:'负责人姓名',
								align:'center'
							},
							{
								field:'principalIdentityCard',
								title:'负责人身份证号码',
								align:'center'
							},
							{
								field:'principalPhone',
								title:'负责人联系电话',
								align:'center'
							},
							{
								field:'employeeCounts',
								title:'从业人员数量',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable").html()
	});
})

//表格中第六列点击时触发
$("#mytable").on("click","tbody tr td:nth-child(6)",function(){
	var adsId = getadsId(this);
	$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryEmployeeByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryEmployeeByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'employeeName',
								title:'从业人员名称',
								align:'center'
							},
							{
								field:'enterpriseName',
								title:'所属企业',
								align:'center'
							},
							{
								field:'substation',
								title:'所属分局',
								align:'center'
							},
							{
								field:'station',
								title:'所属派出所',
								align:'center'
							},
							{
								field:'employeeIdentifyCard',
								title:'身份证号码',
								align:'center'
							},
							{
								field:'employeeTelephone',
								title:'联系电话',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable").html()
	});
})

//表格中第七列点击时触发
$("#mytable").on("click","tbody tr td:nth-child(7)",function(){
	var adsId = getadsId(this);
	$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryVentureEnterpriseByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryVentureEnterpriseByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'enterpriseName',
								title:'风险企业主键',
								align:'center'
							},
							{
								field:'enterpriseAddress',
								title:'企业地址',
								align:'center'
							},
							{
								field:'isBusinessRegistration',
								title:'是否工商注册',
								align:'center'
							},
							{
								field:'businessRegistrationCode',
								title:'工商注册号',
								align:'center'
							},
							{
								field:'principalName',
								title:'负责人姓名',
								align:'center'
							},
							{
								field:'principalIdentityCard',
								title:'负责人身份证号码',
								align:'center'
							},
							{
								field:'principalPhone',
								title:'负责人联系电话',
								align:'center'
							},
							{
								field:'employeeCounts',
								title:'从业人员数量',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable").html()
	});
})

function getadsId(t){
	var adsId;
	if($(".quyu").text()==""){
	var index = $(t).index();
	var xinzheng = $(t).parent().children().eq(0).text();
	adsId = $(t).parent().children().eq(0).attr("data-adsId");
	console.log(adsId);
	console.log(xinzheng);
	}else{
	adsId = $(".quyu").attr("data-adsId");
	}
	return adsId;
}

//渲染日期控件
layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //执行一个laydate实例
  laydate.render({
    elem: '#start_date' //指定元素
  });
});
layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //执行一个laydate实例
  laydate.render({
    elem: '#end_date' //指定元素
  });
});
layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //执行一个laydate实例
  laydate.render({
    elem: '#mystart_date' //指定元素
  });
});
layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //执行一个laydate实例
  laydate.render({
    elem: '#myend_date' //指定元素
  });
});

//点击全部触发
$(".myall").click(function(){
	allArea();
	firstflag = true;
	$(".quyu").text("");
})

//柱状图查询
function myzhu(data1,data2){//选择器，原数据，对比数据
	var myCharts = echarts.init(document.getElementById("zhuchart"));

	var myoption = {
		color: ['#5FAE3A', '#FFD200'],
		tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['本期值','对比值']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            name:'区域',
	            data : ['罗湖','南山','宝安','福田','龙岗','龙华','光明','坪山','大鹏','盐田']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:'数量',
	            data:[100,200,300,400,500,600,700,800]
	        }
	    ],
	    series:[
		    {
		    	name:"本期值",
		    	type:'bar',
		    	data:data1
		    },
		    {
		    	name:'对比值',
		    	type:'bar',
		    	data:data2
		    }
	    ]
	}
	myCharts.setOption(myoption);
}
myzhu([100,100,100,100,100,100,100,100,100,150],[100,100,100,100,100,100,100,100,100,150]);
//下拉框选择什么比对应的日期操作
$(".selectbi").click(function(){
	var date = new Date();
	var date1 = new Date();
/*	var lastDate = new Date(date - 1000 * 60 * 60 * 24 * 30);*/
	var myselect = $(".selectbi  option:selected").text();
	console.log(myselect);
	var startDate = $("#start_date").val();
	var endDate = $("#end_date").val();
	if(startDate==""||endDate==""){
		layer.open({
		content:"请选择开始或结束日期"
	});
	}else{
		if(myselect!=="自定义"){
			$("#mystart_date").attr("disabled","disabled");
			$("#myend_date").attr("disabled","disabled");
			//将开始日期的值格式化
			var arr = startDate.split("-");
			date.setFullYear(arr[0]);
			date.setMonth(parseInt(arr[1])-1);
			date.setDate(arr[2]);
			//将结束日期的值格式化
			var arr1 = endDate.split("-");
			date1.setFullYear(arr1[0]);
			date1.setMonth(parseInt(arr1[1])-1);
			date1.setDate(arr1[2]);
			if(myselect=="同比"){//取一年时间作对比
				var mystartDate = new Date(date - 1000 * 60 * 60 * 24 * 365);
				var myendDate = new Date(date1 - 1000 * 60 * 60 * 24 * 365);
			}
			if(myselect=="环比"){//取上周时间作对比
				var mystartDate = new Date(date - 1000 * 60 * 60 * 24 * 7);
				var myendDate = new Date(date1 - 1000 * 60 * 60 * 24 * 7);
			}
			var lastY = mystartDate.getFullYear();
			var lastM = mystartDate.getMonth()+1;
			var lastD = mystartDate.getDate();
			var LDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" +(lastD < 10 ? "0" + lastD : lastD);
			var lasteY = myendDate.getFullYear();
			var lasteM = myendDate.getMonth()+1;
			var lasteD = myendDate.getDate();
			var LDatee = lasteY + "-" + (lasteM < 10 ? "0" + lasteM : lasteM) + "-" +(lasteD < 10 ? "0" + lasteD : lasteD);
			$("#mystart_date").val(LDate);
			$("#myend_date").val(LDatee);
		}else{
			$("#mystart_date").removeAttr("disabled");
			$("#myend_date").removeAttr("disabled");
		}
	}
	
})

//搜索按钮点击触发
$(".searchBtu").click(function(){
	var selectlei = $(".selectlei  option:selected").text();
	var selectDate = $(".selectdate  option:selected").text();
	var queryType;
	var timeType;
	var time1 = $("#start_date").val();
	var time2 = $("#end_date").val();
	var time3 = $("#mystart_date").val();
	var time4 = $("#myend_date").val();
	switch (selectlei){
		case "已登记物业公司":
			queryType = 1;
			break;
		case "已登记物业管理处":
			queryType = 2;
			break;
		case "已登记楼宇":
			queryType = 3;
			break;
		case "已登记企业":
			queryType = 4;
			break;
		case "已登记从业人员":
			queryType = 5;
			break;
		case "风险企业":
			queryType = 6;
			break;
		default :
			break;
	}
	switch(selectDate){
		case "日":
			timeType = 1;
			break;
		case "月":
			timeType = 2;
			break;
		default:
			break;
	}
	console.log(queryType,timeType);
	if(time1==""||time2==""||time3==""||time4==""){
			layer.open({
			content:"请完整填写所有日期"
		});
	}else{
		$.ajax({
			type:"post",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryDatasByConditions",
			data:{
				queryType:queryType,
				timeType:timeType,
				time1:time1,
				time2:time2,
				time3:time3,
				time4:time4,
			},
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				var data1=[];
				var data2=[];
				if(queryType==1){
					for(var i=0;i<data.data.length;i++){
						data1.push(data.data[i].propertyCompanyCounts);
						data2.push(data.data[i].compareCounts);
					}
				}
				if(queryType==2){
					for(var i=0;i<data.data.length;i++){
						data1.push(data.data[i].propertyCounts);
						data2.push(data.data[i].compareCounts);
					}
				}
				if(queryType==3){
					for(var i=0;i<data.data.length;i++){
						data1.push(data.data[i].buildingCounts);
						data2.push(data.data[i].compareCounts);
					}
				}
				if(queryType==4||queryType==6){
					for(var i=0;i<data.data.length;i++){
						data1.push(data.data[i].enterpriseCounts);
						data2.push(data.data[i].compareCounts);
					}
				}
				if(queryType==5){
					for(var i=0;i<data.data.length;i++){
						data1.push(data.data[i].employeeCounts);
						data2.push(data.data[i].compareCounts);
					}
				}
				myzhu(data1,data2);
			}
		})
	}
})

//二次弹窗第五列
$("body").on("click","tbody tr td:nth-child(5)",function(){
	var adsId = $(".layui-layer-title").attr("data-adsId");
	if($(this).parent().children().eq(1).attr("data-field")=="unitCreditCode"){
		var unitCreditCode = $(this).parent().children().eq(1).text();
		new Promise(function(resolve,reject){
			var index = layer.open();//记录当前打开的索引
			layer.close(index);
			resolve();
		}).then(function(){
			$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryJbrByUnitCode?unitCreditCode="+unitCreditCode,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable1',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryJbrByUnitCode?unitCreditCode="+unitCreditCode,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'unitName',
								title:'物业公司名称',
								align:'center'
							},
							{
								field:'contactName',
								title:'经办人姓名',
								align:'center'
							},
							{
								field:'userRole',
								title:'经办人角色类型',
								align:'center'
							},
							{
								field:'contactPhone',
								title:'经办人手机号码',
								align:'center'
							},
							{
								field:'contactIdentityId',
								title:'经办人身份证',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable1").html(),
		end:function(){
			secondClick(adsId);
		}
	});	
		})
		
	}
})

//二次弹窗第六列
$("body").on("click","tbody tr td:nth-child(6)",function(){
	var adsId = $(".layui-layer-title").attr("data-adsId");
	if($(this).parent().children().eq(1).attr("data-field")=="unitCreditCode"){
		var unitCreditCode = $(this).parent().children().eq(1).text();
		new Promise(function(resolve,reject){
			var index = layer.open();
			layer.close(index);
			resolve();
		}).then(function(){
			$.ajax({
			type:"get",
			url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryPropertyByUnitCode?unitCreditCode="+unitCreditCode,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable1',
						cellMinWidth:80,
						page:false,
						url:"https://msjwt.szga.gov.cn/wgqyfwt/query/queryPropertyByUnitCode?unitCreditCode="+unitCreditCode,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'unitName',
								title:'物业公司名称',
								align:'center'
							},
							{
								field:'propertyName',
								title:'物业管理处名称',
								align:'center'
							},
							{
								field:'propertyAddress',
								title:'物业管理处地址',
								align:'center'
							},
							{
								field:'contactName',
								title:'物业管理处对应经办人',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:['1200px','600px'],
		content:$("#alerttable1").html(),
		end:function(){
			secondClick(adsId);
		}
	});	
		})
		
	}
})
