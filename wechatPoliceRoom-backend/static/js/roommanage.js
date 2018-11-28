//控制侧边栏
$(function(){
	//收缩
	var flag = true;
	$(".shousuo").click(function(){
		if(flag){
			$(".sideleft").children().hide();
			$(".sideleft").width(0);
			$(".sideright").width("100%");
			flag = false;
		}else{
			$(".sideleft").width("15%");
			$(".sideright").width("85%");
			$(".sideleft").children().show();
			flag = true;
		}
	})
	
	//显示修改密码
	$(".opeater").children().eq(0).hover(function(){
		$(".updatePass").show();
	},function(){
		$(".updatePass").hide();
	})
	/*$(".menu_section").eq(0).css("display","block").siblings().css("display","none");*/
	//控制谁出现谁隐藏
	$(".mynav ul li").click(function(){
		var index = $(this).index();
		console.log(index);
		$(this).addClass("myactive").siblings().removeClass("myactive");
		console.log($(".menu_section"));
		$(".menu_section").eq(index).css("display","block").siblings().css("display","none");
	})
	
	$(".sideright iframe").attr("src","./room/room.html");

	$("a").click(function(){
		//个人设置
		/*if($(this).attr("id")=="updatePass"){
			$(".sideright iframe").attr("src","./personal/updatePass.html");
			
		}*/
		//警务室
		if($(this).attr("id")=="room"){
			$(".sideright iframe").attr("src","./room/room.html");
		}
		if($(this).attr("id")=="station"){
			$(".sideright iframe").attr("src","./station/station.html");
		}
		if($(this).attr("id")=="leavemessage"){
			$(".sideright iframe").attr("src","./leavemessage/leavemessage.html");
		}
		if($(this).attr("id")=="amountOfHomePageVisits"){
			$(".sideright iframe").attr("src","./jwdzdt/console/amountOfHomePageVisits.html");
		}
		
		//无证入住
		if($(this).attr("id")=="applyProofUser"){
			$(".sideright iframe").attr("src","./wzrz/ApplyProofUserMain.html");
		}
		if($(this).attr("id")=="publicAccountUser"){
			$(".sideright iframe").attr("src","./wzrz/publicAccountUser.html");
		}
		if($(this).attr("id")=="latestApplyProof"){
			$(".sideright iframe").attr("src","./wzrz/latestProof.html");
		}
		if($(this).attr("id")=="proofStat"){
			$(".sideright iframe").attr("src","./wzrz/ProofStat.html");
		}
		if($(this).attr("id")=="userStat"){
			$(".sideright iframe").attr("src","./wzrz/UserStat.html");
		}
		if($(this).attr("id")=="dataReport"){
			$(".sideright iframe").attr("src","./wzrz/DataReport.html");
		}
		if($(this).attr("id")=="logManager"){
			$(".sideright iframe").attr("src","./wzrz/LogManager.html");
		}
		
		//警务电子地图 信息管理
		//公安机关管理
		if($(this).attr("id")=="bureau"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/bureau/index.html");
		}
		if($(this).attr("id")=="institution"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/institution/index.html");
			//$(".sideright").load("./jwdzdt/console/institution/index.html");
		}
		if($(this).attr("id")=="directlyUnder"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/directlyUnder/index.html");
			//$(".sideright").load("./jwdzdt/console/directlyUnder/index.html");
		}
		if($(this).attr("id")=="subbureau"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/subbureau/index.html");
			//$(".sideright").load("./jwdzdt/console/subbureau/index.html");
		}
		//自助机管理
		if($(this).attr("id")=="aio"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/aio/index.html");
			//$(".sideright").load("./jwdzdt/templates/aio/index.html");
		}
		if($(this).attr("id")=="trafficAio"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/trafficAio/index.html");
			//$(".sideright").load("./jwdzdt/templates/trafficAio/index.html");
		}
		if($(this).attr("id")=="machine"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/machine/index.html");
			//$(".sideright").load("./jwdzdt/templates/machine/index.html");
		}
		if($(this).attr("id")=="populationMachine"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/populationMachine/index.html");
			//$(".sideright").load("./jwdzdt/templates/populationMachine/index.html");
		}
		//服务大厅管理
		if($(this).attr("id")=="executiveHall"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/executiveHall/index.html");
			//$(".sideright").load("./jwdzdt/templates/executiveHall/index.html");
		}
		if($(this).attr("id")=="householdHall"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/householdHall/index.html");
			//$(".sideright").load("./jwdzdt/templates/householdHall/index.html");
		}
		if($(this).attr("id")=="receptionHall"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/receptionHall/index.html");
			//$(".sideright").load("./jwdzdt/templates/receptionHall/index.html");
		}
		if($(this).attr("id")=="detachment"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/detachment/index.html");
			//$(".sideright").load("./jwdzdt/templates/detachment/index.html");
		}
		//户政受理点管理
		if($(this).attr("id")=="hmtResidencePermit"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/hmtResidencePermit/index.html");
			//$(".sideright").load("./jwdzdt/console/hmtResidencePermit/index.html");
		}
		//治安网点管理
		if($(this).attr("id")=="chopShop"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/chopShop/index.html");
			//$(".sideright").load("./jwdzdt/console/chopShop/index.html");
		}
		if($(this).attr("id")=="unlockShop"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/unlockShop/index.html");
			//$(".sideright").load("./jwdzdt/console/unlockShop/index.html");
		}
		//监管场所管理
		if($(this).attr("id")=="shelterEducation"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/shelterEducation/index.html");
			//$(".sideright").load("./jwdzdt/console/shelterEducation/index.html");
		}
		if($(this).attr("id")=="detoxification"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/detoxification/index.html");
			//$(".sideright").load("./jwdzdt/console/detoxification/index.html");
		}
		if($(this).attr("id")=="detentionHouse"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/detentionHouse/index.html");
			//$(".sideright").load("./jwdzdt/console/detentionHouse/index.html");
		}
		if($(this).attr("id")=="caretaker"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/caretaker/index.html");
			//$(".sideright").load("./jwdzdt/console/caretaker/index.html");
		}
		//其他场所管理
		if($(this).attr("id")=="electronicPolice"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/electronicPolice/index.html");
			//$(".sideright").load("./jwdzdt/console/electronicPolice/index.html");
		}
		//纠错信息管理
		if($(this).attr("id")=="correction"){
			$(".sideright iframe").attr("src","./jwdzdt/templates/correction/index.html");
			//$(".sideright").load("./jwdzdt/console/correction/index.html");
		}
	})
	
	function suiji(){
		var date = new Date();
		console.log(date.getTime()+(Math.random()*1000000000000+1));
		return date.getTime()+(Math.random()*1000000000000+1);
	}
})



