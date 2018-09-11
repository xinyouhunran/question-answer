$(function(){
	//淡入淡出轮播
	var index = 0;
	var inext = 2;
	var time = setInterval(function(){
		if(inext==2){
			inext=0;
		}else{
			inext++;
		}
		$(".drdc li").eq(index).fadeOut();
		$(".drdc li").eq(inext).fadeIn();
		index = inext;
	},2500);
	
	//搜索框的值
	$(".input").blur(function(){
				$(this).val("请输入关键词");
			})
	$(".input").focus(function(){
				$(this).val("");
		})
	
	//头条点播
	function toulun(){
		var oul = $(".toutiao_t .tou ul");
		var ali = $(".toutiao_t .tou ul li");
		var oul1 = $(".rili .rili_b ul");
		var ali1 = $(".rili .rili_b ul li");
		var now = 0;
		oul.width(ali.eq(0).width()*ali.length);
		oul1.width(ali1.eq(0).width()*ali1.length);
		$(".zuo").click(function(){
				if(now==ali.length-1){
					
				}else{
					now++;
					var mw = ali.eq(0).width()*now;
					var mleft = -mw+"px";
					oul.animate({left:mleft},1500);
					var mw1 = ali1.eq(0).width()*now;
					var mleft1 = -mw1+"px";
					oul1.animate({left:mleft1},1500);
				}
		})
		$(".you").click(function(){
				if(now == 0){
					
				}else{
					now--;
					var mw = ali.eq(0).width()*now;
					var mleft = -mw+"px";
					oul.animate({left:mleft},1500);
					var mw1 = ali1.eq(0).width()*now;
					var mleft1 = -mw1+"px";
					oul1.animate({left:mleft1},1500);
				}
		})
	}
	toulun();
	
	$(".toutiao_b_r .list li").eq($(".toutiao_b_r .list li").length-1).children().addClass("fontcolor");
	
	//手风琴效果
	function shoufengqin(){
		var adiv = $(".dongtaitab>li");
		adiv.eq(0).css("width","1090px").siblings().css("width","50px");
		$(".ywdt").children().eq(0).css("background","#D6403F");
		$(".dongtaitab>li").hover(function(){
			$(this).stop().animate({width:"1090px"},1000).siblings().stop().animate({width:"50px"},1000);
			/*$(this).stop().children().eq(1).animate({width:"1040px"},1000);*/
			$(this).children().eq(0).css("background","#D6403F");
			if($(this).hasClass("ywdt")){
				$(".fjdt").children().eq(0).css("background","#91B2DD");
				$(".zgdt").children().eq(0).css("background","#91B2DD");
			}
			if($(this).hasClass("fjdt")){
				$(".ywdt").children().eq(0).css("background","#91B2DD");
				$(".zgdt").children().eq(0).css("background","#91B2DD");
			}
			if($(this).hasClass("zgdt")){
				$(".fjdt").children().eq(0).css("background","#91B2DD");
				$(".ywdt").children().eq(0).css("background","#91B2DD");
			}
		})
	}
	shoufengqin();
	
	//person图片轮播
	function personlun(){
		var oul = $(".perimg ul");
		var ali = $(".perimg ul li");
		var now = 0;
		oul.width(ali.eq(0).width()*ali.length);
		$(".zuo1").click(function(){
				if(now==ali.length-1){
					
				}else{
					now++;
					var mw = ali.eq(0).width()*now;
					var mleft = -mw+"px";
					oul.animate({left:mleft},1500);
				}
		})
		$(".you1").click(function(){
				if(now == 0){
					
				}else{
					now--;
					var mw = ali.eq(0).width()*now;
					var mleft = -mw+"px";
					oul.animate({left:mleft},1500);
				}
		})
	}
	personlun();
	
	/*切换src*/
	function qiesrc(){
		var ali = $(".six ul li");
		ali.mouseover(function(){
			$(this).css("border","1px solid #125FB7");
			$(this).find(".box").children().eq(1).children().eq(1).children().attr("src","images/ckxql.png");
			var msrc = $(this).find(".box").children().eq(0).attr("data-src");
			var s = $(this).find(".box").children().eq(0).attr("src");
			if(msrc){
				$(this).find(".box").children().eq(0).attr("src",msrc);
				$(this).find(".box").children().eq(0).attr("data-src",s);
			}
		}).mouseout(function(){
			$(this).css("border","1px solid #E1E3EA");
			$(this).find(".box").children().eq(1).children().eq(1).children().attr("src","images/ckxqh.png");
			var msrc = $(this).find(".box").children().eq(0).attr("data-src");
			var s = $(this).find(".box").children().eq(0).attr("src");
			if(msrc){
				$(this).find(".box").children().eq(0).attr("src",msrc);
				$(this).find(".box").children().eq(0).attr("data-src",s);
			}
			
		})
	}
	qiesrc();
	
	/*底部选择框*/
	function selecttab(){
			$(".selectfirst").hover(function(){
				$(this).children().eq(1).stop().slideToggle();
				$(this).children().eq(1).children().eq(0).children().width("138px");
			})
		}
	selecttab();
})
		
		
