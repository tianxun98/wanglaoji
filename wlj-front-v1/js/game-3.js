$(function(){
	//自定义全局变量
	var n = 1,arrImg = 9,time,speed = 1400,m = 10,s = 60,j = 0;
	var countTime,flag = false,autoClick,autoLi;
	/*n为每次出现随机图片出现次数，arrImg是图片总数，m是辣椒数量*/
	
	var data = {
		//随机出现的辣椒
		randomImg:function(){
			for(i = n;i--;){
			var index = Math.floor(Math.random()*arrImg);
			$("#touch .img-ico-2").eq(index).show(500);
	 		$("#touch .img-ico-2").delay(600).eq(index).hide(300);		
	 	}; 
		time = setTimeout(data.randomImg,speed);	
		return this;
		},
		//倒计时
		count_num:function(){
			countTime = setInterval(function(){
				if(m == 0){
					clearTimeout(time);
					clearInterval(countTime);
					clearInterval(autoClick);
					clearTimeout(autoLi);
					$("#mask").show();
					$("#game-success").show();
					return false;
				}else{
					$("#s").text(s--);
					if(s < 10){
						$("#s").text("0" + s);
					}
					if(s == 0){
					m-- ;	
					s = 60;
					$("#date").text("0" + m);
					}	
				}	
			},15);
		},
		//水炮点击事件
		tap_ele:function(){
			$("#touch li").on("click",function(event){
			event.preventDefault();
			flag = true;
			clearInterval(autoClick);
			var index = $(this).index();
			var $img = $(this).find(".img-ico-2");
			var $img1 = $(this).find(".choose-img");
			if(index == 0 || index == 3 || index == 6){
				$("#water-syringe").removeClass();
				$("#water-syringe").addClass("left-rotate");
			}else if(index == 2 || index == 5 || index == 8 ){
				$("#water-syringe").removeClass();
				$("#water-syringe").addClass("right-rotate");
			}else{
				$("#water-syringe").removeClass();
			};
			autoLi = setTimeout(function(){
				clearInterval(autoClick);
				flag = false;
				data.autoAdd();
				clearTimeout(autoLi);
			},1400);
			if($img.is(":visible")){
				$img1.stop(true).animate({"opacity":"1"});
				$img1.delay(500).animate({"opacity":"0"});
			}else{
				$("#error-seed li").eq(j).show();
					flag = false;	
					commons();
			}
		});
		return this;
		},
		//在玩一次
		again:function(){
			$(".again").on("touchstart",function(event){
				event.preventDefault();
				location.href = "index.html";
			});
			return this;
		},
		//遮罩层
		toggles:function(){
		$(document).on("touchstart","#call",function(event){
		event.preventDefault();
		$("#game-lose").hide();
		$("#share,.add-border").show();
		$("#share").addClass("off");
		});
		$(document).on("touchstart","#call-success",function(event){
		event.preventDefault();
		$("#game-success").hide();
		$("#share,.add-border").show();
		$("#share").addClass("on");
		});
		$("#share").on("touchstart",function(event){
			event.preventDefault();
			if($(this).hasClass("on")){
				location.href = "turntable.html";
			}else{
				location.href = "index.html";
			}
		});
		return false;
		},
		//点击自动添加辣椒
		autoAdd:function(){
			if(flag == false){
			autoClick = setInterval(function(){
				commons();
			},1400);
			}else{
				autoClick = null;
				clearInterval(autoClick);
			}
			return this;
		},
		//初始化
		init:function(){
			this.randomImg().tap_ele().again().autoAdd().toggles();
			this.count_num();		
		}
	};
function commons() {
	if (j >= 5) {
		clearInterval(autoClick);
		return false;
	} else {
		$("#error-seed li").eq(j).show();
		j++;
		$("#count-num").text(j);
		switch (j) {
			case 2:
				$("#look img").prop("src", "img/look-2.png");
				break;
			case 3:
				$("#look img").prop("src", "img/look-3.png");
				break;
			case 4:
				$("#look img").prop("src", "img/look-4.png");
				break;
			case 5:
				$("#look img").prop("src", "img/look-5.png");
				clearTimeout(time);
				clearInterval(countTime);
				clearInterval(autoClick);
				$("#mask").show();
				$("#game-lose").show();
				break;
		};
	}
}	
	data.init();
})
