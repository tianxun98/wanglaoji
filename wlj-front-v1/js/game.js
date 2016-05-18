$(function(){
	//自定义全局变量
	var n = 1,arrImg = 9,time,speed = 1600,m = 9,s = 60,j = 0;
	var countTime,flag = false,autoClick,autoLi;
	/*n为每次出现随机图片出现次数，arrImg是图片总数，m是辣椒数量*/
	var data = {
		randomImg:function(){
			for(i = n;i--;){
			var index = Math.floor(Math.random()*arrImg);
			$("#touch .img").eq(index).show(600);
	 		$("#touch .img").delay(700).eq(index).hide(300);		
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
		tap_ele:function(){
			$("#touch li").on("click",function(event){
			event.preventDefault();
			flag = true;
			var index = $(this).index();
			var $img = $(this).find(".img");
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
			},2000);
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
		again:function(){
			$("#again").on("touchstart",function(event){
				event.preventDefault();
				location.href = "index.html";
			});
			return this;
		},
		toggles:function(){
		$(document).on("touchstart","#call",function(event){
		event.preventDefault();
		$("#game-lose").hide();
		$("#share,.add-border").show();
		});
		$("#share").on("touchstart",function(event){
		event.preventDefault();
		location.href = "index.html";
		});
		return false;
		},
		autoAdd:function(){
			autoClick = setInterval(function(){
				if(flag == false){
				commons();
			}	
			},1500);
			return this;
		},
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
};	
	data.init();
})
