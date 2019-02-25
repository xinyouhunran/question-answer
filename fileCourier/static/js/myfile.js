$(function(){
	$(".content").width($(window).width()-60);
	$(window).resize(function(){
		$(".content").width($(window).width()-60);
	})
	
	$("#exit").click(function(){
		sessionStorage.removeItem("access_token");
		sessionStorage.removeItem("userinfo");
		location.href = "./view/login.html";
	})
	
	$("#updatePass").click(function(){
		$("iframe").attr("src","view/updatePass.html");
	})
	$("#myPic img").mouseover(function(){
		$("#myPic dt p").show();
	})
	
	$("#myPic img").mouseout(function(){
		$("#myPic dt p").hide();
	})
})
