var n = 1;//因为页面自身有一个，一进来时删除了，所以初始值为2，记录当前有几个tab
var flag3 = false,//记录第一个页面
		flag4 = false,
		flag5 = false,
		flag6 = false,
		flag7 = false;
layui.use('element', function(){
	    var $ = layui.jquery
	   ,element = layui.element;
	    
		
//物业管理处点击
		$("body").on("click",".layui-table-body tbody tr td",function(){
			if($(this).attr("data-field")=="propertyCounts"){
			var height = $(".layui-layer-iframe").height();
			console.log(height);
			if($(this).parent().children().eq(2).attr("data-field")=="unitCreditCode"){
				var unitCreditCode = $(this).parent().children().eq(2).text();
				console.log(unitCreditCode);
				if(!flag3){
					n++;
				element.tabAdd('demo', {
			        title: '物业管理处' //用于演示
			        ,content: `<div id="createtable3">
			
				</div>
				<div class="layui-layer-btn layui-layer-btn-"><a class="layui-layer-btn0">导出</a></div>`
			        ,id: 3 //实际使用一般是规定好的id，这里以时间戳模拟下
			      })
				}
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:"#createtable3",
						cellMinWidth:80,
						page:false,
						headers: header,
						where: {
							accessToken: accessToken
						},
						url: basePath + '/query/queryPropertyListByUnitCode?unitCreditCode='+unitCreditCode,
						totalRow:true,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{field:'zizeng',fixed: 'left', title:'序号',align:'center', templet:'#zizeng',totalRowText:"总量："},{
								field:'propertyName',
								title:'管理处名称',
								align:'center'
							},
							{
								field:'unitName',
								title:'公司名称',
								align:'center'
							},
							{
								field:'propertyAddress',
								title:'管理处地址',
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
								totalRow:true,
								align:'center'
							}/*,
							{
								field:'propertyId',
								title:'物业管理处主键',
								align:'center'
							}*/]
						],
						done: function(res, curr, count){
						    //如果是异步请求数据方式，res即为你接口返回的信息。
						    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
						    console.log(res);
						    console.log(curr,count);
						    var arr4 = $("#createtable3").next().find(".layui-table-total td");
						    console.log(arr4);
						    for(var j=6;j<arr4.length;j++){
						    	console.log($(arr4[j]).text());
						    	$(arr4[j]).children().text(''+parseInt($(arr4[j]).text())+'');
						    }
						    $(".layui-table-body tbody").find("[data-field='buildingCounts']").css({"color":"#1E9FFF","text-decoration": "underline","cursor": "pointer"});

						    var ads = $("#createtable3").next().find("[data-field='propertyName']");
						    console.log(ads);
						    for(var i=1;i<=res.data.length;i++){
						    	ads.eq(i).attr("data-propertyId",`${res.data[i-1].propertyId}`);
						    }
						  }
					})
				})
				element.tabChange("demo", 3);
				flag3 = true;//存在
			}
			}
		})
		
		//楼宇点击
		$("body").on("click",".layui-table-body tbody tr td",function(){
			if($(this).attr("data-field")=="buildingCounts"){
			if($(this).parent().children().eq(1).attr("data-propertyId")){
				var propertyId = $(this).parent().children().eq(1).attr("data-propertyId")
				console.log(propertyId);
				if(!flag4){
					n++;
				element.tabAdd('demo', {
			        title: '楼宇' //用于演示
			        ,content: `<div id="createtable4">
			
				</div>
				<div class="layui-layer-btn layui-layer-btn-"><a class="layui-layer-btn0">导出</a></div>`
			        ,id: 4 //实际使用一般是规定好的id，这里以时间戳模拟下
			      })
				}
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:"#createtable4",
						cellMinWidth:80,
						page:false,
						headers: header,
						where: {
							accessToken: accessToken
						},
						url: basePath + '/query/queryBuildingListByPropertyId?propertyId='+propertyId,
						totalRow:true,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{field:'zizeng',fixed: 'left', title:'序号',align:'center', templet:'#zizeng',totalRowText:"总量："},{
								field:'buildingName',
								title:'名称',
								align:'center'
							},
							{
								field:'propertyName',
								title:'物业管理处名称',
								align:'center'
							},
							{
								field:'buildingAddress',
								title:'地址',
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
								field:'communityPoliceName',
								title:'负责社区名警',
								align:'center'
							},
							{
								field:'communityPolicePhone',
								title:'社区名警联系方式',
								align:'center'
							},
							{
								field:'enterpriseCounts',
								title:'楼宇内登记企业数量',
								totalRow:true,
								align:'center'
							},
							{
								field:'contactCounts',
								title:'经办人数量',
								totalRow:true,
								align:'center'
							}]
						],
						done: function(res, curr, count){
						    //如果是异步请求数据方式，res即为你接口返回的信息。
						    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
						    console.log(res);
						    console.log(curr,count);
						    var arr4 = $("#createtable4").next().find(".layui-table-total td");
						    console.log(arr4);
						    for(var j=8;j<arr4.length;j++){
						    	console.log($(arr4[j]).text());
						    	$(arr4[j]).children().text(''+parseInt($(arr4[j]).text())+'');
						    }
						     $(".layui-table-body tbody").find("[data-field='enterpriseCounts']").css({"color":"#1E9FFF","text-decoration": "underline","cursor": "pointer"});
                             $(".layui-table-body tbody").find("[data-field='contactCounts']").css({"color":"#1E9FFF","text-decoration": "underline","cursor": "pointer"});
						    var ads1 = $("#createtable4").next().find("[data-field='buildingName']");
						    for(var i=1;i<=res.data.length;i++){
						    	ads1.eq(i).attr("data-buildingId",`${res.data[i-1].buildingId}`);
						    }
						  }
					})
				})
				element.tabChange("demo", 4);
				flag4 = true;//存在
				
			}
			}
		})
		
		//经办人点击
		$("body").on("click",".layui-table-body tbody tr td",function(){
			if($(this).attr("data-field")=="contactCounts"){
			if($(this).parent().children().eq(1).attr("data-buildingId")){
				var buildingId = $(this).parent().children().eq(1).attr("data-buildingId")
				console.log(buildingId);
				if(!flag5){
					n++
				element.tabAdd('demo', {
			        title: '经办人' //用于演示
			        ,content: `<div id="createtable5">
			
				</div>
				<div class="layui-layer-btn layui-layer-btn-"><a class="layui-layer-btn0">导出</a></div>`
			        ,id: 5 //实际使用一般是规定好的id，这里以时间戳模拟下
			      })
				}
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:"#createtable5",
						cellMinWidth:80,
						page:false,
						headers: header,
						where: {
							accessToken: accessToken
						},
						url: basePath + '/query/queryContactListByBuildingId?buildingId='+buildingId,
						totalRow:true,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{field:'zizeng',fixed: 'left', title:'序号',align:'center', templet:'#zizeng'},{
								field:'buildingName',
								title:'写字楼名称',
								align:'center'
							},
							{
								field:'contactName',
								title:'姓名',
								align:'center'
							},
							{
								field:'contactPhone',
								title:'联系方式',
								align:'center'
							}]
						],
						done: function(res, curr, count){
						    //如果是异步请求数据方式，res即为你接口返回的信息。
						    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
						    console.log(res);
						  }
					})
				})
				element.tabChange("demo", 5);
				flag5 = true;//存在
				
			}
			}
		})
		
		//企业
		$("body").on("click",".layui-table-body tbody tr td",function(){
			if($(this).attr("data-field")=="enterpriseCounts"){
			if($(this).parent().children().eq(1).attr("data-buildingId")){
				var buildingId = $(this).parent().children().eq(1).attr("data-buildingId")
				console.log(buildingId);
				if(!flag6){
					n++;
				element.tabAdd('demo', {
			        title: '企业' //用于演示
			        ,content: `<div id="createtable6" lay-filter="test">
			
				</div>
				<div class="layui-layer-btn layui-layer-btn-"><a class="layui-layer-btn0">导出</a></div>`
			        ,id: 6 //实际使用一般是规定好的id，这里以时间戳模拟下
			      })
				}
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:"#createtable6",
						cellMinWidth:80,
						page:false,
						headers: header,
						where: {
							accessToken: accessToken
						},
						url: basePath + '/query/queryEnterpriseListByBuildingId?buildingId='+buildingId,
						totalRow:true,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{field:'zizeng',fixed: 'left', title:'序号',align:'center', templet:'#zizeng',totalRowText:"总量："},{
								field:'enterpriseName',
								title:'名称',
								align:'center'
							},
							{
								field:'enterpriseAddress',
								title:'地址',
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
								title:'负责人',
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
								field:'hasAbnormalOperation',
								title:'是否风险企业',
								align:'center'
							},
							{
								field:'employeeCounts',
								title:'从业人员数量',
								totalRow:true,
								align:'center'
							},{fixed: 'right', title:'详情',width:'80',align:'center', toolbar: '#toolbarDemo'}]
						],
						done: function(res, curr, count){
						    //如果是异步请求数据方式，res即为你接口返回的信息。
						    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
						    console.log(res);
						    console.log(curr,count);
						    $(".layui-table-body tbody").find("[data-field='employeeCounts']").css({"color":"#1E9FFF","text-decoration": "underline","cursor": "pointer"});
						    var arr = $("#createtable6").next().find(".layui-table-total td");
						    var ads2 = $("#createtable6").next().find("[data-field='enterpriseName']");
						    console.log(ads2);
						    for(var i=1;i<=res.data.length;i++){
						    	
						    	ads2.eq(i).attr("data-enterpriseId",`${res.data[i-1].enterpriseId}`);
						    }
						    for(var j=9;j<arr.length;j++){
						    	if(j==10){
						    		return;
						    	}
						    	console.log($(arr[j]).text());
						    	$(arr[j]).children().text(''+parseInt($(arr[j]).text())+'');
						    }
						    
						  }
						  
					
					})
					//监听工具条
					table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
					  var data = obj.data; //获得当前行数据
					  var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
					  var tr = obj.tr; //获得当前行 tr 的DOM对象
					 
					 console.log(data);
					  if(layEvent === 'detail'){ //查看
					  	var areaw = parseInt(($(window).width())*0.95);
					  	var areah = parseInt($(window).height());
					    //do somehing
					    layer.open({
							title:'企业详情',
							area:[areaw+'px',areah+'px'],
							type:2,
							offset:'t',
							content: 'enterpriseDetail.html?url='+'/query/getEnterpriseInfoById?enterpriseId='+data.enterpriseId,
							btn:['关闭'],
							moveOut:'true'
						});	
					   
					  } else if(layEvent === 'del'){ //删除
					    layer.confirm('真的删除行么', function(index){
					      obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
					      layer.close(index);
					      //向服务端发送删除指令
					    });
					  } else if(layEvent === 'edit'){ //编辑
					    //do something
					    
					    //同步更新缓存对应的值
					    obj.update({
					      username: '123'
					      ,title: 'xxx'
					    });
					  }
					});
				})
				element.tabChange("demo", 6);
				flag6 = true;//存在
				
			}
			}
		})
		
		//从业人员点击
		$("body").on("click",".layui-table-body tbody tr td",function(){
			if($(this).attr("data-field")=="employeeCounts"){
			if($(this).parent().children().eq(1).attr("data-enterpriseId")){
				var enterpriseId = $(this).parent().children().eq(1).attr("data-enterpriseId")
				console.log(enterpriseId);
				if(!flag7){
					n++;
				element.tabAdd('demo', {
			        title: '从业人员' //用于演示
			        ,content: `<div id="createtable7">
			
				</div>
				<div class="layui-layer-btn layui-layer-btn-"><a class="layui-layer-btn0">导出</a></div>`
			        ,id: 7 //实际使用一般是规定好的id，这里以时间戳模拟下
			      })
				}
				layui.use('table',function(){
					var table = layui.table;
					table.render({
						elem:"#createtable7",
						cellMinWidth:80,
						page:false,
						headers: header,
						where: {
							accessToken: accessToken
						},
						url: basePath + '/query/queryEmployeeListByEnterpriseId?enterpriseId='+enterpriseId,
						totalRow:true,
						response: {
						   statusName: 'status' //规定数据状态的字段名称，默认：code
						    ,statusCode: 200 //规定成功的状态码，默认：0
						    ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
						    ,dataName: 'data' //规定数据列表的字段名称，默认：data
						 },
						cols:[
							[{field:'zizeng',fixed: 'left', title:'序号',align:'center', templet:'#zizeng'},{
								field:'employeeName',
								title:'姓名',
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
						done: function(res, curr, count){
						    //如果是异步请求数据方式，res即为你接口返回的信息。
						    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
						    console.log(res);
						  }
					})
				})
				element.tabChange("demo", 7);
				flag7 = true;//存在
				
			}
			}
		})
		
		element.on('tabDelete(demo)', function(data){//删除时触发
			console.log(n);
					n--;
				  console.log(this); //当前Tab标题所在的原始DOM元素
				  if(/物业管理处/.test($(this).parent().text())){
				  //console.log(data.index); //得到当前Tab的所在下标
				  //console.log(data.elem); //得到当前的Tab大容器
				  flag3 = false;
				  }
				  console.log("flag3:"+flag3);
				  if(/楼宇/.test($(this).parent().text())){
				  flag4 = false;
				  }
				  console.log("flag4:"+flag4);
				  if(/经办人/.test($(this).parent().text())){
				  flag5 = false;
				  }
				  console.log("flag5:"+flag5);
				  if(/企业/.test($(this).parent().text())){
				  flag6 = false;
				  }
				  console.log("flag6:"+flag6);
				  if(/从业人员/.test($(this).parent().text())){
				  flag6 = false;
				  }
				  console.log("flag7:"+flag7);
				  console.log(n);
				 // debugger;
				  if(n==0){
				  	//当你在iframe页面关闭自身时
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index); //再执行关闭   
				  }
				});
		})