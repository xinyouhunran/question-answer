var dele=[];
 var counter=0;
 var parentName=null;
 function initPage(entity){
		var str1 = `<div id="outerdiv2"
		     style="position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);z-index:20000;width:100%;height:100%;display:none;">
			    <div id="innerdiv2" style="width:100px;height:100px;position:absolute;top:0;right:0;bottom:0;left: 0;margin:auto;">
			        <img id="bigimg2" src="../../static/img/img-loading.gif"/>
			        <p style="text-align:center;color:#fff;">正在提交</p>
			    </div>
			</div>`;
			$("body").append(str1);
			
 	$("#latitude").attr("maxlength",'9');
	$("#longitude").attr("maxlength",'10');
		var id=getUrlParam("id");
		if(id != null){
			$.ajax({
				url:serviceUrl+"/"+entity+"/detailedData?id="+id+"&accessToken="+frontendAccessToken,
			    type:"get",
			    dataType: "json",
			    headers:{'requestType':"tymh",'applyID':frontendApplyID,'secretKey':frontendSecretKey},
			    xhrFields: {
	                withCredentials: true
	            },
			    success:function(data){
			    	var result=data.result;
			    	var photoUrl=result.photoUrls;
			    	var photoPath=result.photoPaths;
			    	$("[name="+entity+"Id]").val(result[entity+'Id']);
			    	$("#"+entity+"Name").val(result[entity+"Name"]);
			    	$("#address").val(result.address);
			    	$("#longitude").val(result.longitude);
			    	$("#latitude").val(result.latitude);
			    	$("#dutyPhones").val(result.dutyPhones);    	
			    	$("#serviceContent").val(result.serviceContent);
			    	$("#note").val(result.note);
			    	$("#status").val(result.status);
			    	$("#serviceTimeType").val(result.serviceTimeType)
			    	$("#serviceTime").val(result.serviceTime);
			    	$("#districtId").val(result.districtId);
			    	
			    	if(entity=="directlyUnder"){
			    		console.log(result.type);
			    		$("#type").val(result.type);
			    	}
			    	if(parentName!=null){
			    		$("#"+parentName).val(result[parentName]);
			    	}
			    	if(photoUrl!=null&&photoUrl!=""){
			    	var photoUrls=photoUrl.split(",");
			    	$.each(photoUrls,function(i,n){
			    		dele.push(0);
			    		console.log("url:"+n);
			    		var m=$(".myfl").eq(i);
			    		m.css({"background":"url("+n+") no-repeat center","background-size":"cover"});
			    		m.parent().addClass('myheng');
			    		m.attr("data-src",n);
			    		m.attr("data-name","");
			    		m.find("img").attr("src","../../../static/img/button-cross.png");
			    	})
			    	}
					var url = serviceUrl+"/"+entity+"/commonSave/"+$("[name="+entity+"Id]").val()+"?accessToken="+frontendAccessToken;
					 $(".btn").click(function(){
						 if(!valit(entity)){
							 return ;
						 }
						 var formdata=new FormData($("form")[0]);
						 var s="";
						 $.each(dele,function(i,n){
							 if(n==null){
								 s+=i;
							 }
						 })
						 if(s!=""){
						 formdata.append("delete",s)
						 }
						 if(photoUrl!=""&&photoUrl!=null){
							 formdata.append("photoUrl",photoUrl);
						 }
						 if(photoPath!=""&&photoPath!=null){
							 formdata.append("photoPath",photoPath);
						 }
						 console.log("click事件触发")
						 console.log(formdata.getAll("uploadFiles"));
						 var arr=formdata.getAll("uploadFiles");
						 var buffer=[null,null,null];
						 counter=0;
                             $.each(arr,function(i,n){
							 //执行压缩图片
							 if(n.size>1024*1024){
								 photoCompress(n, {
					                    quality: 0.1
					                }, function(base64Codes){		                	
					                    var bl = convertBase64UrlToBlob(base64Codes);	                   
                                        buffer[i]=bl;
					                    if(counter==2){
					                     	for(var f=0;f<buffer.length;f++){
					                    		if(f==0){
					                    		formdata.set("uploadFiles",buffer[0])
					                    		}else{
					                    			formdata.append("uploadFiles",buffer[f])
					                    		}
					                    	}
					                     	submit(url,formdata);
					                    }else{
					                    	counter++;
					                    }
					                });
							 }else{	
								 buffer[i]=n;
				                    if(counter==2){
				                    	for(var f=0;f<buffer.length;f++){
				                    		if(f==0){
				                    		formdata.set("uploadFiles",buffer[0])
				                    		}else{
				                    			formdata.append("uploadFiles",buffer[f])
				                    		}
				                    	}
				                    	submit(url,formdata);
				                    }
				                    else{
								 counter++
								 }
							 }
                             });

					 });
			    
			}
			});
		}else{
			var h=$(".box-title ").eq(1).html();
			console.log(h);
			$(".box-title ").eq(1).html(h.replace("修改","添加"));
			$(".btn").click(function(){
				 if(!valit(entity)){
					 return ;
				 }
			var url=serviceUrl+"/"+entity+"/commonSave?accessToken="+frontendAccessToken;		
			var formdata=new FormData($("form")[0]);
			submit(url,formdata);
			})
		}
		new AddressPluginAutoComplete({
			textId: 'address',
			markBtnId: 'get_coord_on_map',
			defaultVal: '广东省深圳市南山区南头街道南海大道21号',
			addressKey: 'maplite',
			defaultCoord: {
			x: 113.92754,
			y: 22.561898
			},
			maxheight: 288,
			onChooseFunc: function (data, obj) {
				console.log('choose:' + JSON.stringify(data));
				console.log(data.x);
				console.log(data.y);
				$("#longitude").val(data.x);
				$("#latitude").val(data.y);
				
			}
		}); 
 }
function submit(url,data){
   $("#outerdiv2").show();
   //setTimeout(function(){  
   
	 $.ajax({
	     url: url,
	     type: "post",
	     data: data,
	     //async:false,
	     cache:false,
	     contentType:false,
	     processData:false,
	     headers:{'requestType':"tymh",'applyID':frontendApplyID,'secretKey':frontendSecretKey},
	     dataType: "json",
	     xhrFields: {
                withCredentials: true
            },
            beforeSend: function(xhr) {             
                console.log(xhr);
             },
	     success: function(data) {
	    	 console.log(123123);
	    	 $("#outerdiv2").hide();
	         if (data.status == 1 && data.state == "success") {
	        	 console.log("success");
	        	 layer.open({
	    		 	title:"提示",
	    		 	content:"操作成功",
	    		 	end:function(){
	    		 		history.back();
	    		 	}
	    		 })
	        	 
	        	// parent.window.document.getElementById("mainFrame").src =
				// entity+"/index.html";
	         } else {
	        	 $("#outerdiv2").hide();
	        	 layer.open({
	    		 	title:"提示",
	    		 	content:data.msg
	    		 })
	         }
	     }
	 });
   //},100)
}

	// 图片压缩
	function photoCompress(file,w,objDiv){
         var ready=new FileReader();
         /*
			 * 开始读取指定的Blob对象或File对象中的内容.
			 * 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data:
			 * URL格式的字符串以表示所读取文件的内容.
			 */
         ready.readAsDataURL(file);
         ready.onload=function(){
             var re=this.result;
             canvasDataURL(re,w,objDiv)
         }
     }
     function canvasDataURL(path, obj, callback){
         var img = new Image();
         img.src = path;
         img.onload = function(){
             var that = this;
             // 默认按比例压缩
             var w = that.width,
                 h = that.height,
                 scale = w / h;
             w = obj.width || w;
             h = obj.height || (w / scale);
             var quality = 0.7;  // 默认图片质量为0.7
             // 生成canvas
             var canvas = document.createElement('canvas');
             var ctx = canvas.getContext('2d');
             // 创建属性节点
             var anw = document.createAttribute("width");
             anw.nodeValue = w;
             var anh = document.createAttribute("height");
             anh.nodeValue = h;
             canvas.setAttributeNode(anw);
             canvas.setAttributeNode(anh);
             ctx.drawImage(that, 0, 0, w, h);
             // 图像质量
             if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                 quality = obj.quality;
             }
             // quality值越小，所绘制出的图像越模糊
             var base64 = canvas.toDataURL('image/jpeg', quality);
             // 回调函数返回base64的值
             callback(base64);
         }
     }
     /**
		 * 将以base64的图片url数据转换为Blob
		 * 
		 * @param urlData
		 *            用url方式表示的base64图片数据
		 */
     function convertBase64UrlToBlob(urlData){
         var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
             bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         while(n--){
             u8arr[n] = bstr.charCodeAt(n);
         }
         return new Blob([u8arr], {type:mime});
     }
     function valit(entity){
    	 if(isEmpty($("#"+entity+"Name").val())||/^\s*$/.test($("#"+entity+"Name").val())){
    		 /*alert("名字不能为空");*/
    		 layer.open({
    		 	title:"提示",
    		 	content:"公安局名称不能为空"
    		 })
    		 return false;
    	 }
    	 if(isEmpty($("#address").val())||/^\s*$/.test($("#address").val())){
    		 layer.open({
    		 	title:"提示",
    		 	content:"地址不能为空"
    		 })
    		 return false;
    	 }
    	 if(isEmpty($("#longitude").val())&&/^\s*$/.test($("#longitude").val())){
    		 layer.open({
    		 	title:"提示",
    		 	content:"经度不能为空"
    		 })
    		 return false;
    	 }else{
    	 	if(!($("#longitude").val()>-180&&$("#longitude").val()<180)){
    	 		layer.open({
    		 	title:"提示",
    		 	content:"请输入正确的经度"
    		 })
    	 		return false;
    	 	}else{
    	 		if($("#longitude").val().indexOf(".")!=-1){
    	 			if(!/^\d*\.\d{1,6}$/.test($("#longitude").val())){
	    	 			layer.open({
		    		 	title:"提示",
		    		 	content:"请输入正确的经度"
		    		 })
	    	 		return false;
    	 			}
    	 		}
    	 	}
    	 }
    	 if(isEmpty($("#latitude").val())||/^\s*$/.test($("#latitude").val())){
    		 layer.open({
    		 	title:"提示",
    		 	content:"纬度不能为空"
    		 })
    		 return false;
    	 }else{
    	 	if(!($("#latitude").val()>-90&&$("#latitude").val()<90)){
    	 		layer.open({
    		 	title:"提示",
    		 	content:"纬度输入错误"
    		 })
    	 		return false;
    	 	}else{
    	 		if($("#latitude").val().indexOf(".")!=-1){
    	 			if(!/^\d*\.\d{1,6}$/.test($("#latitude").val())){
	    	 			layer.open({
		    		 	title:"提示",
		    		 	content:"纬度输入错误"
		    		 })
	    	 		return false;
    	 			}
    	 		}
    	 	}
    	 }
    	 if(isEmpty($("#serviceTime").val())||/^\s*$/.test($("#serviceTime").val())){
    		 /*alert("名字不能为空");*/
    		 layer.open({
    		 	title:"提示",
    		 	content:"服务时间不能为空"
    		 })
    		 return false;
    	 }
    	 return true;
     }
     function isEmpty(s){
    	 if(s==null||s==''){
    		 return true;
    	 }
    	 return false;
     }
     $("#serviceTimeType").change(function(){
    	 var val=$(this).val();
    	 if(val=="1"){
    		 $("#serviceTime").val("周一至周五 09:00-12:00 14:00-18:00（法定节假日除外）");
    	 }else{
    		 $("#serviceTime").val("7*24小时工作");
    	 }
     })
     
     
 //	图片展示 选择逻辑
     	var arrPic = [0,1,2];//记录初始加载的图片url
	var imgArr = [0,0,0];//默认图片数组为3个
	//var maxSize = 5120000;//5Mb
	
	$(".mypic").on('change','.uploaderInput',function(evt){
		var myindeI=parseInt($(this).next().attr("data-index"));
		if(dele.length-1>=myindeI){
			dele[myindeI]=null;
			}
		
		var files = evt.target.files;
		console.log("文件:"+$(this).val());
		var _this = this;
		var myindex = $(this).attr("data-index");
		console.log(myindex);
		console.log(imgArr,files.length);
		/*console.log($(_this));*/
	    for(var i = 0,f,len = files.length; i < len; i++){
	    	f = files[i];
	    	/*console.log(f);*/
	        // 过滤掉非图片类型文件
	        if(!f.type.match('image.*')){
	        	clearImg($(this).next());
	        	 return layer.open({
		    		 	title:"提示",
		    		 	content:"请选择图片类型文件"
		    		 })
	        }
	        // 过滤掉重复上传的图片
	        if (imgArr.indexOf(f.name) != -1) {
	        	   $(this).val("");
                    return layer.open({
		    		 	title:"提示",
		    		 	content:"已上传的图片不能再次上传"
		    		 })
                }
	        /*console.log(f.size);*/
	        // 设置文件大小限制
	        /* if(f.size>maxSize){l
	        	return alert('图片大小不能超过5MB');
	        }  */ 
            imgArr.splice(myindex,1,f.name);//替换
            console.log(imgArr);
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                	/*$(_this).prev().attr("src",e.target.result);*/
                	//console.log(theFile);
                	console.log(e);
                	$(_this).parent().css({"background":"url("+e.target.result+") no-repeat center","background-size":"cover"});
                	$(_this).parent().parent().addClass('myheng');
                	$(_this).parent().attr("data-name",theFile.name);
                	$(_this).parent().attr("data-src",e.target.result);
                	$(_this).parent().find("img").attr("src","../../../static/img/button-cross.png");
                	$(_this).parent().find("span").show();
                	var jsop_api={            	     
                	     aspectRatio:1.7,
                	     addClass:"center"
                	 };
/*                 	$("#outerdiv1").show();
                	$("#bigimg1").attr("src",e.target.result);
                    $("<img/>").attr("src", e.target.result).load(function () {
                        var W = $("#innerdiv1").width(); //获取当前窗口宽度
                        var H = $("#innerdiv1").height(); //获取当前窗口高度
                        var realWidth = this.width; //获取图片真实宽度
                        var realHeight = this.height; //获取图片真实高度
                        if(realWidth/realHeight>1.7){
                        	jsop_api.boxWidth=W;
                        	jsop_api.boxHeight=W/realWidth * realHeight;
                        }else{
                        	jsop_api.boxWidth=H/realHeight*realWidth;
                        	jsop_api.boxHeight=H;
                        }
                        $("#bigimg1").Jcrop(jsop_api,function(){
                   		 $(".center").css("position","absolute");
                   	 });
                        
                    }); */
                	
                };
            })(f);
            reader.readAsDataURL(f);
            break;//此操作是为了无论你选几张图片，我只加载第一次
	    }
	    var myindeI = parseInt(myindex);
		if(dele.length-1>myindeI){
		dele[myindeI]=0;
		}
		
	})
	 $(".mypic").on("click","span",function(){//删除
				/*console.log(1);*/
				console.log(imgArr);
				/*var myindex = $(this).attr("data-index");
				var myindeI = parseInt(myindex);
				if(dele.length-1>=myindeI){
				dele[myindeI]=null;
				}
				if($(this).parent().attr("data-name")!=undefined){
					console.log($(this).parent().attr("data-name"));
					var myname = $(this).parent().attr("data-name");
					var index = imgArr.indexOf(myname);
					if(index>-1){
						imgArr.splice(myindex,1,0);//替换，将指定位置替换成0
					}
					$(this).parent().css("background","none");
					$(this).parent().attr("data-src",null)
					$(this).prev().val(null);
					$(this).parent().parent().removeClass("myheng");
					$(this).hide();
					console.log(imgArr);
				}*/
				clearImg($(this));
			})
	function clearImg(o){
		var myindex = $(o).attr("data-index");
		var myindeI = parseInt(myindex);
		if(dele.length-1>=myindeI){
		dele[myindeI]=null;
		}
		if($(o).parent().attr("data-name")!=undefined){
			console.log($(o).parent().attr("data-name"));
			var myname = $(o).parent().attr("data-name");
			var index = imgArr.indexOf(myname);
			if(index>-1){
				imgArr.splice(myindex,1,0);//替换，将指定位置替换成0
			}
			$(o).parent().css("background","none");
			$(o).parent().attr("data-src",null)
			$(o).prev().val(null);
			$(o).parent().parent().removeClass("myheng");
			$(o).hide();
			console.log(imgArr);
		}
	}
	$(".mypic").on("mouseover",".myfl",function(){
		var mysrc = $(this).attr("data-src");
		if(mysrc!=undefined){
			$(this).find("p").show();
		}
		$(".mypic").on("click",".myfl p",function(){
			imgShow("#outerdiv", "#innerdiv", "#bigimg",mysrc);
		})
	})
	$(".mypic").on("mouseout",".myfl",function(){
		$(this).find("p").hide();
	})
	
	
	function imgShow(outerdiv, innerdiv, bigimg, src) {
        $(innerdiv).css({
            "top": "50%",
            "left": "50%",
            "marginLeft": "-50px",
            "marginTop": "-50px"
        });
        $(bigimg).hide();
        /*$("#loading-img").show();*/
        //var src = _this.attr("src"); //获取当前点击的pimg元素中的src属性
        $(bigimg).attr("src", src); //设置#bigimg元素的src属性
        $(outerdiv).fadeIn("fast");

        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).load(function () {
            var windowW = $(window).width(); //获取当前窗口宽度
            var windowH = $(window).height(); //获取当前窗口高度
            var realWidth = this.width; //获取图片真实宽度
            var realHeight = this.height; //获取图片真实高度
            var imgWidth, imgHeight;
            var scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

            if (realHeight > windowH * scale) { //判断图片高度
                imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
                imgWidth = imgHeight / realHeight * realWidth; //等比例缩放宽度
                if (imgWidth > windowW * scale) { //如宽度扔大于窗口宽度
                    imgWidth = windowW * scale; //再对宽度进行缩放
                }
            } else if (realWidth > windowW * scale) { //如图片高度合适，判断图片宽度
                imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
                imgHeight = imgWidth / realWidth * realHeight; //等比例缩放高度
            } else { //如果图片真实高度和宽度都符合要求，高宽不变
                imgWidth = realWidth;
                imgHeight = realHeight;
            }
            $(bigimg).css("width", imgWidth); //以最终的宽度对图片缩放

            var w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
            var h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
            $(innerdiv).css({
                "top": h,
                "left": w,
                "marginLeft": "0px",
                "marginTop": "0px"
            }); //设置#innerdiv的top和left属性
            /*$("#loading-img").hide();*/
            $(bigimg).show();
            // $(outerdiv).fadeIn("fast"); //淡入显示#outerdiv及.pimg
        });
        
        $(outerdiv).click(function () { //再次点击淡出消失弹出层
            $(this).fadeOut("fast");
        });
    }		
	