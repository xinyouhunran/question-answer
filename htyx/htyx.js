//控制侧边栏
$(function(){
	/*$(".menu_section").eq(0).css("display","block").siblings().css("display","none");*/
	$(".mynav ul li").click(function(){
		var index = $(this).index();
		console.log(index);
		$(this).addClass("active").siblings().removeClass("active");
		console.log($(".menu_section"));
		$(".menu_section").eq(index).css("display","block").siblings().css("display","none");
	})
	
	$(".sideright").load("./test.html");
	$("a").click(function(){
		if($(this).attr("id")=="dataAnalyse"){
			$(".sideright").load("./dataAnalyse/dataAnalyse.html");
		}
		if($(this).attr("id")=="portalTotal"){
			$(".sideright").load("./dataTotal/portalTotal.html");
		}
	})
})



