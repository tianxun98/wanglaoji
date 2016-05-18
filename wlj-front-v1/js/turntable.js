$(function(){
		    //抽奖
	var flag = true;    
    $("#lottery,#lottery2").on('click',function(event){
    	event.preventDefault();
    	$("#pop-lottery section").hide();
    	if(flag){
    	/*
         1、谢谢参与	
            60deg 王老吉润喉糖一排 
			120deg 获得一次抽奖机会
			180deg 迷你加湿器一台
			240deg 乐视影券
			300deg 绿盒王老吉一箱
			360deg 谢谢参与
         */
        flag = false;
        updaRerotate(240);
        $("#bigwheel").addClass("start-dzp");
        setTimeout(function(){
            //显示中奖层调用ajax
            $("#mask,.pop-tip").show();
            //$("#input").text("点击领取");
            $("#lottery-2").show();
            flag = true;
        },4000)
    	}
    	return false;
    });
    /*中奖角度方法*/
function updaRerotate(deg) {
    var angle=3600+deg;
    var endStr = "100% {-webkit-transform:rotate(" + angle + "deg);}";
    //找出在样式表里面的第几行
    var keyframesRule = document.styleSheets[0].cssRules[0];
    //keyframesRule.deleteRule("100%");
    keyframesRule.insertRule(endStr);
    //keyframesRule.appendRule(endStr);
}
//2015/12/22
function saveInput(id1,id2,id3){
	if(!($(id1).val()&&$(id2).val()&&$(id3).val())){
		$(".require-null").text("输入框不能为空哦！");
		return false;
	}else{
		$(".require-null").hide();
	}
};
$("#mask").on("touchstart",function(event){
	event.preventDefault(); 
	$("#mask,.pop-tip,#human-info").hide();
});
$("#input").on("touchstart",function(event){
	event.preventDefault(); 
	$(".pop-tip").hide();
	$("#human-info").show();
});
$("#save").on("touchstart",function(event){
	event.preventDefault(); 
	saveInput("#input-name","#input-tel","#input-address");
});
});

