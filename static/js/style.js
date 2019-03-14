//jQuery 写法
$(function(){
	//搜索框的css
	
	var param = location.search.substring(1);
				var pname = getParams(param, "name");
				if(pname){
					$(".right-top").find("a").eq(0).html("您好，" +pname).removeAttr("href");
					$(".right-top").find("a").eq(1).remove();
				}
				else{
					$(".right-top").find("a").eq(0).html("&#xe601;  请登录")
				}
				function getParams(str, name){
					var arr = str.split("&");
					for (var i=0; i<arr.length; i++) {
						var str1 = arr[i]; // id=1002 
						var arr1 = str1.split("=");
						if (arr1[0] == name) {
							return arr1[1];
						}
					}
					return ""; 
				}
	
	
	
	$("input").eq(0).css({"width":477,"height":35,"border":0,"padding":"0 10px"});
	$("input").eq(1).css({"width":83,"height":36,"background":"#c01133","border":0});
	$("input").eq(2).css({"width":121,"height":40,"background":"#f2f2f2","border":"solid 1px #e2e2e2","border-radius":2});
    //
    $("input").eq(3).css({"width":477,"height":35,"border":0,"padding":"0 10px"});
	$("input").eq(4).css({"width":83,"height":36,"background":"#c01133","border":0});
	//banner 轮播
	var index = 0;
	var timer = setInterval(function(){
		index++;
		move_Banner();
	},3000)
	var arr = ["#f7f0de","#fff2e1","#eaf2e7","#ecbfb9","#d0edfd","#fcf2fb"];
	function move_Banner(){
		if(index >= 6 ){
			index = 0;
		}
		if(index <0){
			index = 5;
		}
		$("#banner>img").eq(index).fadeIn().siblings("img").fadeOut();;
		$("#list>li").eq(index).addClass("active").siblings("li").removeClass("active");;
		$("#back").css({"background-color":arr[index]});
	}
	$("#span1").click(function(){
		index--;
		move_Banner();
//		timer = setInterval(function(){
//			move_Banner();
//			index++;
//		},3000)
		
	})
	$("#span2").click(function(){
		index++;
		move_Banner();
	})
	$("#list>li").mouseenter(function(){
		index = $(this).index();
		move_Banner();
	});
	$("#banner>img").mouseenter(function(){
		clearInterval(timer);
	})
	$("#banner>img").mouseleave(function(){
		clearInterval(timer);
		timer = setInterval(function(){
			move_Banner();
			index++;
		},3000)
	})

//		timer = setInterval(function(){
//			move_Banner();
//			index++;
//		},3000)
	
	
	//shop f1 轮播

	$("#f1>li").first().clone().appendTo("#f1");	
	$("#f2>li").first().clone().appendTo("#f2");	
	$("#f3>li").first().clone().appendTo("#f3");	
	$("#f4>li").first().clone().appendTo("#f4");	
	$("#f5>li").first().clone().appendTo("#f5");	
	$("#f6>li").first().clone().appendTo("#f6");	
	$("#f7>li").first().clone().appendTo("#f7");	
	$("#f8>li").first().clone().appendTo("#f8");	
	var size = $("#f1").find("li").size();
	$("#f1").width(306*size);
	$("#f2").width(306*size);
	$("#f3").width(306*size);
	$("#f4").width(306*size);
	$("#f5").width(306*size);
	$("#f6").width(306*size);
	$("#f7").width(306*size);
	$("#f8").width(306*size);
	var iis = 3;
	
	function waibu(obj,obj2){
		var i = 0;
			var timer = setInterval(function(){
				i++;
				move_Shop();
			},3000)		
		
			function move_Shop(){
			
				if (i < 0) {
					$(obj).css("left", -306*(size-1));
					i = size-2;
				}			
				if (i >= size){
					$(obj).css("left", 0);	
					i = 1;
				}
				$(obj).stop().animate({left:-i*306}, 500);
			}
		$(obj2).find("li").mouseenter(function(){
			clearInterval(timer);
			i = $(this).index();
			move_Shop();
		})
		$(obj2).find("li").mouseleave(function(){
			timer = setInterval(function(){
				i++;
				move_Shop();
			},3000)
		})
	}
	waibu("#f1","#f11");
	waibu("#f2","#f12");
	waibu("#f3","#f13");
	waibu("#f4","#f14");
	waibu("#f5","#f15");
	waibu("#f6","#f16");
	waibu("#f7","#f17");
	waibu("#f8","#f18");

	
	
	function ob(obj3){
		var ii = 0;
		var timer1 = setInterval(function(){
			ii++;
			moves(obj3);
		},3000)	
		
		function moves(lina){
			if(ii >= iis){
				ii = 0;
			}
			$(lina).find("span").eq(ii).animate({width:30},500).parent().siblings("li").find("span").css("width",0);
		}
		
		
		$(obj3).find("li").mouseenter(function(){
			clearInterval(timer1);
			ii = $(this).index();
			$(this).siblings("li").find("span").stop(true).css("width",0);
			moves(obj3);
		})
		$(obj3).find("li").mouseleave(function(){
			timer1 = setInterval(function(){
				ii++;
				moves(obj3);
			},3000)
		})
	}
	ob("#f11");
	ob("#f12");
	ob("#f13");
	ob("#f14");
	ob("#f15");
	ob("#f16");
	ob("#f17");
	ob("#f18");
	
	
	
	//list2 li 的 hover 效果
	$("#list2 li").mouseenter(function(){
		$("<span><img src='images/ha/doudou.png' style='width: 22px;height: 24px;' /></span>").css({position:"absolute",left:0,top:0,width:"100%",height:24,"z-index":-1,display:"flex","justify-content":"center"}).appendTo("#list2 li");
		$(this).find("a").css("border-bottom","solid 4px red");
		$(this).find("a").siblings("a").css("border",0);
		$(this).find("span").animate({top:-14},400).parent().siblings("li").find("span").remove();			
	})
	$("#list2 li").mouseleave(function(){
		$(this).find("a").css({"border":0});
		$("#list2 li").find("span").remove();
	})
		
		
		
		
	//dd 增加class属性 iconfont
	$(".icon dd").addClass("iconfont").addClass("dd");
	$("<span></span>").css({background:"url(images/110.png) no-repeat 0px -70px",position:"absolute",top:0,left:745,width:31,height:31}).appendTo(".bannerx");
	$(".icon dd").mouseenter(function(){
		$(this).css({"background-color":"#fff",color:"#e6133c"}).find("a").eq(0).css("color","#e6133c").find(".bannerx");
		$(this).find(".bannerx").stop(true).fadeIn(500).parent().siblings("dd").find(".bannerx").fadeOut(500);
		$(this).find(".bannerx").find("span").css({background:"url(images/110.png) no-repeat 0px -70px"});
	})
	$(".icon dd").mouseleave(function(){
		$(this).css({"background-color":"#e6133c",color:"#fff"}).find("a").eq(0).css("color","#fff");
		$(".icon dd").find(".bannerx").stop(true).fadeOut(500);
	})
	$(".bannerx").find("span").click(function(){
		$(this).css("background","url(images/110.png) no-repeat -31px -70px");
		$(this).parent().fadeOut(200);
	})
	$(".box1").find("li").css({display:"inline-block"});
	$(".box2").find("li").css({display:"inline-block"});
	
	//获取到#back的scrollTop
	$(".box3").css({position:"absolute",left:"117px",top:"75px",display:"none"})
	$(".banner-main").clone(true).appendTo(".box3");
	$(".box3").find("dt").remove();
	$(".box3").find("#list2").remove();
	$(".box3").find("#banner").remove();
	$(".box3").find(".icon").css({"padding-top":1,height:"426px"});
	$(".box3").find(".bannerx").css("top",0);
	var dl_Top = $(".icon").offset().top;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if (scrollTop >= dl_Top){
			$("#top_menu").fadeIn();
		}
		else {
			$("#top_menu").fadeOut();
		}
	})
	$(".menu_enter").mouseenter(function(){
		$(".box3").css("display","block");

		
	})
	$(".box3").mouseleave(function(){
		$(this).css("display","none");	

	})
	
	//楼梯
	var arr2 = ["green","orange","red","blue","pink","yellow","purple","#caa07d","#8dd3f7"];
	var arr4 = ["&#xe630;","&#xe650;","&#xe616;","&#xe69a;","&#xe602;","&#xe61d;","&#xe635;","&#xe640;","&#xe60e;"];
	$("#lift").find("li").find("span").css("display","none");
	$("#lift").find("li").mouseenter(function(){
		var iindex = $(this).index();
		console.log(iindex);
		$(this).css({background:arr2[iindex],"font-size":"14px"}).find("span").css("display","block").parent().find("a").css("display","none");
	})
	$("#lift").find("li").mouseleave(function(){
		var iindex = $(this).index();
		$(this).css({"background":"#f4f4f4","font-size":"24px"}).find("span").css("display","none").parent().find("a").css("display","block");
	})
	
	
		var isMoving = false;		
				//点击楼层按钮， 让页面滚动到对应的楼层
			$("#lift li").click(function(){
				var index = $(this).index();
				var top = $(".money").find(".main").eq(index).offset().top;		
				console.log(top);
				isMoving = true;
				$("html,body").stop(true).animate({scrollTop: top}, function(){
					isMoving = false;
				});		
				$(this).css({background:arr2[index],"font-size":"14px"}).find("span").css("display","block").parent().find("a").css("display","none");
		})
		$(window).scroll(function(){			
			//如果没有点击楼层按钮执行动画， 则执行代码
			if (!isMoving) {			
				var scrollTop = $(window).scrollTop();
				//遍历所有的楼层div
				var index = 0;
				var size = 0;
				$(".aposition").each(function(){
					//每个楼层div的top值
					var top = $(this).offset().top;
					var winH = $(window).height(); //页面高度
					console.log(winH);
					if (scrollTop -40 >= top) {
						index = $(this).index();
						size = index;
					}
					
				})				
				$("#lift li").eq(size).css({background:arr2[index],"font-size":"14px"}).siblings("li").css({background:"#f4f4f4"});
				$("#lift li").eq(size).find("span").css("display","block").parent().find("a").css("display","none").parent().siblings("li").find("span").css("display","none").parent().find("a").css("display","block");
				//console.log(index);
				if(scrollTop >= $(".money").offset().top){
					$("#lift").css("display","block");
				}
				else{
					$("#lift").css("display","none");
				}
			}		
		})
		
		
//88888888888888888888888888888888888888888888888888
				//全局变量， 用来保存获取到json中的所有商品数据
				
				
	
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})