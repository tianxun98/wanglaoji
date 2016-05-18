$(function(){
	$("#rule").on("touchstart",function(event){
		event.preventDefault();
		show("#mask-1,#pop-rule");
	});
	$("#content").on("touchstart",function(event){
		event.preventDefault();
		show("#mask,#pop-explain");
	});
	$("#mask,.return").on("touchstart",function(event){
		event.preventDefault();
		hide("#mask,#pop-explain,#human-info,#no-game");
	});
	$("#return-page1").on("touchstart",function(event){
		event.preventDefault();
		hide("#mask-1,#pop-rule");
	});
	$("#explain-info").on("touchstart",function(event){
		event.preventDefault();
		$("#human-info").show();
		$("#pop-explain").hide();
	});
	function show(id1,id2){
		$(id1,id2).show();
	};
	function hide(id1,id2){
		$(id1,id2).hide();
	};
	var i = 0,speed = 30,status = 1,time,m = 0,imgSpeed = 400,Numtime,flag = true;
	function gifshow(){
		if(status == 1){
				i++;
				$("#bg-load img").removeClass("show");
				$("#bg-load .img-" + i).addClass("show");
				if(i == 3){
					i = 0;
				}
				time = setTimeout(gifshow,imgSpeed);
			}
	};
	gifshow();
	loadNum();
	function loadNum(){
		if(flag){
		$("#add-num").html(m);
		m++;
		if(m == 100){
		$("#bg-load").fadeOut(800);
		status = 0;
		clearTimeout(time);
		clearTimeout(Numtime);
		$("#page").removeClass("hide");
		return false;
		};
		Numtime = setTimeout(loadNum,speed);
	}
	};
	//隐藏加载load
	function hideLoad(){
		clearTimeout(time);
		clearTimeout(Numtime);
		$("#bg-load").hide();
		$("#page").removeClass("hide");
	}
	//2015/12/22
function saveInput(id1,id2,id3){
	if(!($(id1).val()&&$(id2).val()&&$(id3).val())){
		$(".require-null").text("输入框不能为空哦！");
		return false;
	}else{
		$("#human-info,#mask").hide();
	}
};
$("#save").on("touchstart",function(event){
	event.preventDefault(); 
	saveInput("#input-name","#input-tel","#input-address");
});
/*游戏次数没有出现
function noGame(){
	 $("#no-game,#mask").show();
}				 
*/
});
