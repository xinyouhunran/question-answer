//表格下载
$(".export").click(function(){
	console.log($('.layui-table-view').eq(0));
	$('.layui-table-view').eq(0).tableExport({
        type: 'excel',
        excelstyles: ['border-bottom', 'border-top', 'border-left', 'border-right']
    });
})

//表格数据操作
//指定行政区已登记总量
function allArea(){
	$.ajax({
		type:"get",
		url: basePath + "/query/queryTotalsForArea",
		async:true,
		dataType:"json",
		success:(data)=>{
			console.log(data);
			findTable("#wgqyfwtj",data,'adsName', basePath + "/query/queryTotalsForArea",true);
		}
	});
}
allArea();
function findTable(el,data,firstcol,url,flag){//选择器,分页，数据，首列
	$(el).html("");
	layui.use(['table','laypage'],function(){
			var table = layui.table;
			var laypage = layui.laypage;
			table.render({
				elem:el,
				cellMinWidth:80,
				height:470,
				url:url,
				response: {
				   statusName: 'status' //规定数据状态的字段名称，默认：code
				    ,statusCode: 200 //规定成功的状态码，默认：0
				    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
				    ,dataName: 'data' //规定数据列表的字段名称，默认：data
				 },
				 totalRow:true,
				cols:[
					[{
						field:firstcol,
						title:'行政区域',
						align:'center',
						totalRowText: '总量：'
					},
					{
						field:'propertyCompanyCounts',
						title:'物业公司数量',
						totalRow:true,
						align:'center'
					},
					{
						field:'propertyCounts',
						title:'物业管理处数量',
						totalRow:true,
						align:'center'
					},
					{
						field:'buildingCounts',
						title:'楼宇数量',
						totalRow:true,
						align:'center'
					},
					{
						field:'enterpriseCounts',
						title:'企业数量',
						totalRow:true,
						align:'center'
					},
					{
						field:'employeeCounts',
						title:'从业人员数量',
						totalRow:true,
						align:'center'
					},
					{
						field:'ventureEnterpriseCounts',
						title:'风险企业数量',
						totalRow:true,
						align:'center'
					}]
				],
				done: function(res, curr, count){
					if(!flag){
						$('#mytable .layui-table-body .layui-table td:nth-child(1)').css({
							'color':'#666',
							'text-decoration': 'none'
						})
					}
				    //如果是异步请求数据方式，res即为你接口返回的信息。
				    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
				    console.log(res);
				    console.log(curr,count);
				    var arr = $(".layui-table-total td");
				    for(var j=1;j<arr.length;j++){
				    	console.log($(arr[j]).text());
				    	$(arr[j]).children().text(''+parseInt($(arr[j]).text())+'');
				    }
				    var ads = $("[data-field='adsName']");
				    for(var i=1;i<=res.data.length;i++){
				    	$("[data-field='adsName']").eq(i).attr("data-adsId",`${res.data[i-1].adsId}`);
				    }
				    
				  }
			})
		})
}
/*findTable("#wgqyfwtj");*/

//表格中第一列点击时触发
//行政区域
var firstflag = true;//记录是否是第一次点击第一列
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(1)",function(){
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
			url: basePath + "/query/queryTotalsByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				findTable("#wgqyfwtj",data,'name', basePath + "/query/queryTotalsByAdsId?adsId="+adsId,false);
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

var areah = parseInt(($(window).height()))
function getHeight(){
	var hh = window.screen.height;
	/*var hh = document.documentElement.clientHeight;*/
	console.log(hh);
	var mytop = (hh-600)/8+'px';//弹出层距离上边的距离
	return mytop;
}

var areaw = parseInt(($(window).width()-200));
function getWidth(){
	var ww = $(window).width();
	var myleft = (ww-areaw-200)/2+200+'px';//弹出层距离左边的距离
	return myleft;
}
//设置初始表格样式


	/*$('#mytable').on('mouseover','.layui-table-body .layui-table td',function(){
		$(this).css({
			'color':'#1E9FFF',
			'text-decoration': 'underline'
		})
	})*/
	/*$('#mytable').on('mouseout','.layui-table-body .layui-table td',function(){
		$(this).css({
			'color':'#666',
			'text-decoration': 'none'
		})
	})*/
	
//返回第二列数据
//物业管理公司

function secondClick(page,adsId,urlc){//到哪个页面，传的参数，接口url和参数
	/*$('.layui-table-view .layui-table td:nth-child(1)').hover(function(){
		$(this).css({'color':'#666','text-decoration':'none'})
	})*/
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
	layer.open({
		title: "数据展示",
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		/*content:$("#alerttable").html(),*/
		content:page+adsId+urlc,
		btn:['关闭'],
	});
}

$("#mytable").on("click",".layui-table-body tbody tr td",function(){
	var df = $(this).attr("data-field");
	var adsId = getadsId(this);
	if(df=="propertyCompanyCounts"){
		secondClick('propertyCompaniesInfoList.html?adsId=',adsId,'=name=物业公司=url='+'/query/queryPropertyCompaniesByAdsId?adsId');
	}
	if(df=="propertyCounts"){
		secondClick('propertyInfoList.html?adsId=',adsId,'=name=物业管理处=url='+'/query/queryPropertyByAdsId?adsId');
	}
	if(df=="enterpriseCounts"){
		secondClick('enterpriseInfoList.html?adsId=',adsId,'=name=企业=url='+'/query/queryEnterpriseByAdsId?adsId');
	}
	if(df=="buildingCounts"){
		secondClick('buildingInfoList.html?adsId=',adsId,'=name=楼宇=url='+'/query/queryBuildingByAdsId?adsId');
	}
	if(df=="employeeCounts"){
		secondClick('employeeInfoList.html?adsId=',adsId,'=name=从业人员=url='+'/query/queryEmployeeByAdsId?adsId');
	}
	if(df=="ventureEnterpriseCounts"){
		secondClick('ventureEnterpriseInfoList.html?adsId=',adsId,'=name=风险企业=url='+'/query/queryVentureEnterpriseByAdsId?adsId');
	}
})
//表格中第二列点击时触发
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(2)",function(){
	var adsId = getadsId(this);
	secondClick(adsId);
})

//表格中第三列点击时触发
//物业管理处
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(3)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
	var adsId = getadsId(this);
	$.ajax({
			type:"get",
			url: basePath + "/query/queryPropertyByAdsId?adsId="+adsId,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				/*layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:'#creattable',
						
						cellMinWidth:80,
						page:false,
						url: basePath + "/query/queryPropertyByAdsId?adsId="+adsId,
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
								field:'buildingCounts',
								title:'管辖写字楼数量',
								align:'center'
							}]
						],
					})
				})*/
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		title: "物业管理处",
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		/*content:$("#alerttable").html(),*/
		content:basePath+'/propertyInfoList?url='+'/query/queryPropertyByAdsId?adsId='+adsId,
		btn:['关闭']
	});
})

//表格中第四列点击时触发
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(4)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
	var adsId = getadsId(this);
	/*$.ajax({
			type:"get",
			url: basePath + "/query/queryBuildingByAdsId?adsId="+adsId,
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
						url: basePath + "/query/queryBuildingByAdsId?adsId="+adsId,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{
								field:'buildingName',
								title:'楼宇名称',
								align:'center'
							},
							{
								field:'propertyName',
								title:'物业管理处名称',
								align:'center'
							},
							{
								field:'buildingAddress',
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
								field:'communityPolicePhone',
								title:'社区民警联系方式',
								align:'center'
							},
							{
								field:'enterpriseCounts',
								title:'楼宇内登记企业数量',
								align:'center'
							},
							{
								field:'contactCounts',
								title:'经办人数量',
								align:'center'
							}]
						],
					})
				})
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})*/
	layer.open({
		title: "楼宇",
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		content:basePath+'/buildingInfoList?url='+'/query/queryBuildingByAdsId?adsId='+adsId,
		btn:['关闭']
	});
})

//表格中第五列点击时触发
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(5)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
	var adsId = getadsId(this);
	/*$.ajax({
			type:"get",
			url: basePath + "/query/queryEnterpriseByAdsId?adsId="+adsId,
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
						url: basePath + "/query/queryEnterpriseByAdsId?adsId="+adsId,
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
	})*/
	layer.open({
		title: "企业",
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		content:basePath+"/enterpriseInfoList?url="+"/query/queryEnterpriseByAdsId?adsId="+adsId,
		btn:['关闭']
	});
})

//表格中第六列点击时触发
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(6)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
	var adsId = getadsId(this);
	/*$.ajax({
			type:"get",
			url: basePath + "/query/queryEmployeeByAdsId?adsId="+adsId,
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
						url: basePath + "/query/queryEmployeeByAdsId?adsId="+adsId,
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
	})*/
	layer.open({
		title: "从业人员",
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		content:basePath+"/employeeInfoList?url="+"/query/queryEmployeeByAdsId?adsId="+adsId,
		btn:['关闭']
	});
})

//表格中第七列点击时触发
$("#mytable").on("click",".layui-table-body tbody tr td:nth-child(7)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
	var adsId = getadsId(this);
	/*$.ajax({
			type:"get",
			url: basePath + "/query/queryVentureEnterpriseByAdsId?adsId="+adsId,
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
						url: basePath + "/query/queryVentureEnterpriseByAdsId?adsId="+adsId,
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
	})*/
	layer.open({
		title: "风险企业",
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		content:basePath+"/ventureEnterpriseInfoList?url="+"/query/queryVentureEnterpriseByAdsId?adsId="+adsId,
		btn:['关闭']
	});
})

//获取需要传递的adsId
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
  laydate.render({
  	elem:"#start_datem",
  	type:"month"
  })
  laydate.render({
  	elem:"#end_datem",
  	type:"month"
  })
  laydate.render({
  	elem:"#mystart_datem",
  	type:"month"
  })
  laydate.render({
  	elem:"#myend_datem",
  	type:"month"
  })
  //执行一个laydate实例
  laydate.render({
    elem: '#start_date' //指定元素
  });

  //执行一个laydate实例
  laydate.render({
    elem: '#end_date' //指定元素
  });
  
  laydate.render({
    elem: '#mystart_date' //指定元素
  });
  
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
function myzhu(data1,data2,myarea){//原数据，对比数据
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
	            data :myarea
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
/*myzhu([100,100,100,100,100,100,100,100,100,150],[100,100,100,100,100,100,100,100,100,150]);*/

//选择月时的操作
$(".selectdate").change(function(){
	var myselect = $(".selectdate option:selected").text();
	console.log(myselect);
	var startDate = $("#start_date").val();
	var mystartDate = $("#mystart_date").val();
	var startDatem = startDate.slice(0,7);
	var mystartDatem = mystartDate.slice(0,7);
	console.log(startDatem,mystartDatem);
	if(myselect=="月"){
		console.log("yue");
		$("#start_date").hide();
		$("#end_date").hide();
		$("#start_datem").show();
		$("#end_datem").show();
		$("#mystart_date").hide();
		$("#myend_date").hide();
		$("#mystart_datem").show();
		$("#myend_datem").show();
		$("#start_datem").val(startDatem);
		$("#end_datem").val(startDatem);
		$("#mystart_datem").val(mystartDatem);
		$("#myend_datem").val(mystartDatem);
	}
	if(myselect=="日"){
		console.log("yue");
		$("#start_date").show();
		$("#end_date").show();
		$("#start_datem").hide();
		$("#end_datem").hide();
		$("#mystart_date").show();
		$("#myend_date").show();
		$("#mystart_datem").hide();
		$("#myend_datem").hide();
		var date1 = new Date();
		var startDate = new Date(date1 - 1000 * 60 * 60 * 24 * 8);
		var endDate = new Date(date1 - 1000 * 60 * 60 * 24 * 1);
		var mystartDate = new Date(date1 - 1000 * 60 * 60 * 24 * 16);
		var myendDate = new Date(date1 - 1000 * 60 * 60 * 24 * 9);
		var time1 = getnewDate(startDate);
		$("#start_date").val(time1);
		var time2 = getnewDate(endDate);
		$("#end_date").val(time2);
		var time3 = getnewDate(mystartDate);
		$("#mystart_date").val(time3);
		var time4 = getnewDate(myendDate);
		$("#myend_date").val(time4);
	}
})

//下拉框选择什么比对应的日期操作
$(".selectbi").click(function(){
	var date = new Date();
	var date1 = new Date();
/*	var lastDate = new Date(date - 1000 * 60 * 60 * 24 * 30);*/
	var myselect = $(".selectbi option:selected").text();
	console.log(myselect);
	if($(".selectdate option:selected").text()=="日"){
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
	}
	if($(".selectdate option:selected").text()=="月"){
		var startDatem = $("#start_datem").val();
		var endDatem = $("#end_datem").val();
		if(startDate==""||endDate==""){
			layer.open({
			content:"请选择开始或结束日期"
		});
		}else{
			if(myselect!=="自定义"){
				$("#mystart_datem").attr("disabled","disabled");
				$("#myend_datem").attr("disabled","disabled");
				var arr2 = startDatem.split("-");
				
				var arr3 = endDatem.split("-");
				if(myselect=="同比"){//取一年时间作对比
					var mystartDatem = parseInt(arr2[0])-1+"-"+arr2[1];
					var myendDatem = parseInt(arr3[0])-1+"-"+arr3[1];
				}
				if(myselect=="环比"){//取上月时间作对比
					if(arr2[1]=="01"){
						arr2[0]=parseInt(arr2[0])-1;
						arr2[1]="12";
					}else{
						arr2[1] = parseInt(arr2[1])-1;
						if(arr2[1]<10){
							arr2[1]="0"+arr2[1];
						}
					}
					if(arr3[1]=="01"){
						arr3[0]=parseInt(arr3[0])-1;
						arr3[1]="12";
					}else{
						arr3[1] = parseInt(arr3[1])-1;
						if(arr3[1]<10){
							arr3[1]="0"+arr3[1];
						}
					}
					var mystartDatem = arr2[0]+"-"+arr2[1];
					var myendDatem = arr3[0]+"-"+arr3[1];
				}
				$("#mystart_datem").val(mystartDatem);
				$("#myend_datem").val(myendDatem);
			}else{
				$("#mystart_datem").removeAttr("disabled");
				$("#myend_datem").removeAttr("disabled");
			}
		}
	}
})

function getnewDate(mydate){
	var lastY = mydate.getFullYear();
	var lastM = mydate.getMonth()+1;
	var lastD = mydate.getDate();
	var LDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" +(lastD < 10 ? "0" + lastD : lastD);
	return LDate;
}
//初始默认值柱状图
function myInit(){
	var date1 = new Date();
	var startDate = new Date(date1 - 1000 * 60 * 60 * 24 * 8);
	var endDate = new Date(date1 - 1000 * 60 * 60 * 24 * 1);
	var mystartDate = new Date(date1 - 1000 * 60 * 60 * 24 * 16);
	var myendDate = new Date(date1 - 1000 * 60 * 60 * 24 * 9);
	var time1 = getnewDate(startDate);
	$("#start_date").val(time1);
	var time2 = getnewDate(endDate);
	$("#end_date").val(time2);
	var time3 = getnewDate(mystartDate);
	$("#mystart_date").val(time3);
	var time4 = getnewDate(myendDate);
	$("#myend_date").val(time4);
	$.ajax({
			type:"post",
			url: basePath + "/query/queryDatasByConditions",
			data: {
				queryType:1,
				//timeType:1,
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
				var myarea=[];
				for(var i=0;i<data.data.length;i++){
						data1.push(data.data[i].propertyCompanyCounts);
						data2.push(data.data[i].compareCounts);
						myarea.push(data.data[i].adsName);
					}
				myzhu(data1,data2,myarea);
			},
			error: function(XMLHttpRequest, textStatus, errorThrow) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrow);
			}
		})
}
myInit();

$(".searchBtu").mousedown(function(){
	$(this).css({"background":"#4781e8"});
})
$(".searchBtu").mouseup(function(){
	$(this).css({"background":"#004DD5"});
})
//搜索按钮点击触发
$(".searchBtu").click(function(){
	var selectlei = $(".selectlei option:selected").val();
	var selectDate = $(".selectdate option:selected").text();
	var queryType = selectlei;
	//var timeType;
	if(selectDate=="日"){
	var time1 = $("#start_date").val();
	var time2 = $("#end_date").val();
	var time3 = $("#mystart_date").val();
	var time4 = $("#myend_date").val();
	}
	if(selectDate=="月"){
	var time1 = $("#start_datem").val();
	var time2 = $("#end_datem").val();
	var time3 = $("#mystart_datem").val();
	var time4 = $("#myend_datem").val();
	}
	/*switch (selectlei){
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
	}*/
	/*switch(selectDate){
		case "日":
			timeType = 1;
			break;
		case "月":
			timeType = 2;
			break;
		default:
			break;
	}
	console.log(queryType,timeType);*/
	if(time1==""||time2==""||time3==""||time4==""){
			layer.open({
			content:"请完整填写所有日期"
		});
	}else{
		$.ajax({
			type:"post",
			url: basePath + "/query/queryDatasByConditions",
			data:{
				queryType:queryType,
				//timeType:timeType,
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
				var myarea = [];
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
				for(var i=0;i<data.data.length;i++){
					myarea.push(data.data[i].adsName);
				}
				myzhu(data1,data2,myarea);
			}
		})
	}
})

//二次弹窗第五列
/*$("body").on("click",".layui-table-body tbody tr td:nth-child(5)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
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
			url: basePath + "/query/queryJbrByUnitCode?unitCreditCode="+unitCreditCode,
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
						url: basePath + "/query/queryJbrByUnitCode?unitCreditCode="+unitCreditCode,
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
				console.log($('.layui-table-box'));
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:[areaw+'px',areah+'px'],
		offset:[0,myleft],
		content:$("#alerttable1").html(),
		btn:['导出','关闭'],
		yes:function(index,layero){
			$('.layui-table-box').eq(1).tableExport({
		        type: 'excel',
		        excelstyles: ['border-bottom', 'border-top', 'border-left', 'border-right']
		    });
		},
		end:function(){
			secondClick(adsId);
		}
	});	
		})
		
	}
})*/

//二次弹窗第五列
/*$("body").on("click",".layui-table-body tbody tr td:nth-child(5)",function(){
	var myleft = getWidth();//弹出层距离左边的距离
	var mytop = getHeight();
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
			url: basePath + "/query/queryPropertyListByUnitCode?unitCreditCode="+unitCreditCode,
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
	})
	layer.open({
		area:[areaw+'px',areah+'px'],
		type:2,
		offset:[0,myleft],
		content:basePath+'/propertyInfoList',
		btn:['导出','关闭'],
		yes:function(index,layero){
			$('.layui-table-box').eq(1).tableExport({
		        type: 'excel',
		        excelstyles: ['border-bottom', 'border-top', 'border-left', 'border-right']
		    });
		},
	});	
		})
		
	}
})*/
