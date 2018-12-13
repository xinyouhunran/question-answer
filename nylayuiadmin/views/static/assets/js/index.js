/*
* @Author: Larry
* @Date:   2016-12-15 17:20:54
* @Last Modified by:   qinsh
* @Last Modified time: 2016-12-24 22:06:18
* +----------------------------------------------------------------------
* | LarryBlogCMS [ LarryCMS网站内容管理系统 ]
* | Copyright (c) 2016-2017 http://www.larrycms.com All rights reserved.
* | Licensed ( http://www.larrycms.com/licenses/ )
* | Author: qinshouwei <313492783@qq.com>
* +----------------------------------------------------------------------
*/
'use strict';
layui.use(['jquery','layer','element'],function(){
	window.jQuery = window.$ = layui.jquery;
	window.layer = layui.layer;
  var element = layui.element();
  
// larry-side-menu向左折叠
$('.larry-side-menu').click(function() {
  var sideWidth = $('#larry-side').width();
  if(sideWidth === 200) {
      $('#larry-body').animate({
        left: '0'
      }); //admin-footer
      $('#larry-footer').animate({
        left: '0'
      });
      $('#larry-side').animate({
        width: '0'
      });
  } else {
      $('#larry-body').animate({
        left: '200px'
      });
      $('#larry-footer').animate({
        left: '200px'
      });
      $('#larry-side').animate({
        width: '200px'
      });
  }
});

 
$(function(){
   // 刷新iframe操作
    $("#refresh_iframe").click(function(){
       $(".layui-tab-content .layui-tab-item").each(function(){
          if($(this).hasClass('layui-show')){
             $(this).children('iframe')[0].contentWindow.location.reload(true);
          }
       });
    });
   $('#lock').mouseover(function(){
   	   layer.tips('请按Alt+L快速锁屏！', '#lock', {
             tips: [1, '#FF5722'],
             time: 4000
       });
   })
   // 快捷键锁屏设置
    $(document).keydown(function(e){
         if(e.altKey && e.which == 76){
         	 lockSystem();
         }
    });
   function startTimer(){
   	    var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        $('#time').html(h+":"+m+":"+s);
        t=setTimeout(function(){startTimer()},500);
   }
   // 锁屏状态检测
   function checkLockStatus(locked){
        // 锁屏
        if(locked == 1){
        	$('.lock-screen').show();
            $('#locker').show();
            $('#layui_layout').hide();
            $('#lock_password').val('');
        }else{
        	$('.lock-screen').hide();
            $('#locker').hide();
            $('#layui_layout').show();
        }
    }

   checkLockStatus('0');
   // 锁定屏幕
   function lockSystem(){
   		
   	   var url = '';
   	   $.post(
   	   	   url,
   	   	   function(data){
   	   	   if(data=='1'){
   	   	   	  checkLockStatus(1);
   	   	   }else{
              layer.alert('锁屏失败，请稍后再试！');
   	   	   }
   	   });
   	   startTimer();
   }
   //解锁屏幕
   function unlockSystem(){
        // 与后台交互代码已移除，根据需求定义或删除此功能
        
   	    checkLockStatus(0);
    }
   // 点击锁屏
   $('#lock').click(function(){
   	    lockSystem();
   });
   // 解锁进入系统
   $('#unlock').click(function(){
        unlockSystem();
   });
   // 监控lock_password 键盘事件
   $('#lock_password').keypress(function(e){
        var key = e.which;
        if (key == 13) {
            unlockSystem();
        }
    });
    
    //ls add
    
    //显示修改密码
	$(".opeater").children().eq(0).hover(function(){
		$("#updatePass").show();
	},function(){
		$("#updatePass").hide();
	})   
    //关闭全部
    $(".closePageAll").click(function(){
    	//console.log($('.layui-tab-title li:gt(0)'));
    	$('.layui-tab-title li:gt(0)').each(function(i,v){
    		console.log(i,v);
    		$(v).find(".layui-tab-close").trigger('click');//触发关闭事件
    	})
    	$(".layui-tab-title").css("left","50px");
    })
    
    //关闭其他  
    $(".closePageOther").click(function(){
    	//console.log($('.layui-tab-title li:gt(0)'));
    	$('.layui-tab-title li:gt(0)').each(function(i,v){
    		if(!$(v).hasClass("layui-this")){
    			$(v).find(".layui-tab-close").trigger('click');
    		}	
    	})
    	$(".layui-tab-title").css("left","50px");
    })
    
    //计算layui-tab-title的宽度
    function retab(){
    	var w = $(window).width()-200-118-100;
    	$(".layui-tab-title").width(w);
    }
    $(window).resize(function(){
    	retab();
    })
    retab();
    
    //点击修改密码
	$(".opeater").on("click","#updatePass",function(){
	       var $a = $(this).children('a');
	       var href = $a.data('url');
	       //var icon = $a.children('i:first').data('icon');
	       var title = "修改密码";
	       var data = {
	             href: href,
	             //icon: icon,
	             title: title
	       }
	       var navtab = layui.navtab({
					elem: '.larry-tab-box'
				});
	       navtab.tabAdd(data);
	       $(this).parent().css("background","none");
	 });
    
    //回到最左边
    $("#titleLeft").click(function(){
		$(".layui-tab-title").css("left","50px");
		element.tabChange("demo",0);
	  })
    
    //回到最右边
  	$("#titleRight").click(function(){
  		var mw = 0,//所有li的宽度和
	        lw = 0,//距离左边的距离
	        ltt = $(window).width()-200-118-100,
	        ali = $(".layui-tab-title li");
	            ali.each(function(i,v){
	            	mw+=$(v).width()+20;
	            	
	            })
	        lw = -(mw-ltt)+50+'px';
	        if(mw>ltt){
	        	$(".layui-tab-title").css("left",lw);
	        }
		element.tabChange("demo",$(".layui-tab-title").find('li').length - 1);
	  })
  	
  	/*$("#titleLeftPrev").click(function(){
  		var id = $(".layui-tab-title li").last().find(".layui-icon").data("id")-1;
		$(".layui-tab-title").css("left","100px");
		element.tabChange("demo",id);
	  })*/
});


});
