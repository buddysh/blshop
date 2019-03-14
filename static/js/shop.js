$(function(){
				
				//获取从首页传过来的id
				// location.search : 参数部门， 如:?id=1002&name=lisi
				var param = location.search.substring(1);
				var pid = getParams(param, "id");
				console.log(pid);
				$("a").attr("target","_blank");
				
//				获取json中的数据

				$.get("JSON/sp.json", function(data){
					var arr = data;
					
					for (var i=0; i<arr.length; i++) {
						var obj = arr[i]; //每个商品数据
						
						//找到id相同的商品后，就可以使用obj了
						if (obj.id == pid) {
							loadUI(obj); 
							
						}
					}
				})
//				
					$("#box-two").find("div").eq(1).click(function(){
						$.get("JSON/sp.json", function(data){
							var arr = data;
							for (var i=0; i<arr.length; i++) {
								var aobj = arr[i]; //每个商品数据
								
								//找到id相同的商品后，就可以使用obj了
								if (aobj.id == pid) {
									var obj = arr[i];
									var arr2 = $.cookie("cart") ? JSON.parse($.cookie("cart")) : []
									var isExist = false;
									for (var j=0; j<arr2.length; j++) {
										if (arr2[j].id == obj.id) {
											if(sum!=1){
												arr2[j].num = arr2[j].num + sum;
											}
											else{
												arr2[j].num++;
											}
											isExist = true;
											break;
										}
									}
									if (isExist ==  false) {										
										obj.num =  sum;							
										obj.checked = true; //是否选中， 默认选中 
										arr2.push(obj);
									}
									
									
									//将arr2添加到cookie中
									$.cookie("cart", JSON.stringify(arr2), {expires:30, path:"/"});
									console.log( $.cookie("cart") );
								}
							}
						})
						location.href = "car.html";
					})
						$("#box-two").find("div").eq(0).click(function(){
							location.href = "car.html";
						
						})
				
				
				
				function loadUI(obj){
					console.log("123")
					$("#smallImg").find("img").get(0).src = obj.img;
					$("#bigArea").find("img").get(0).src = obj.img;
					$(".namebox").find("p").html( obj.name );
					$(".pricebox").find("p").html( obj.init + obj.price );
					$("#costbox").find("a").eq(1).html( obj.init + obj.cost);
					$("#img1").find("img").get(0).src = obj.img1;
					$("#img2").find("img").get(0).src = obj.img2;
					$("#img3").find("img").get(0).src = obj.img3;
					$("#img4").find("img").get(0).src = obj.img4;
				}
				
				
//				
//				//查找参数对应的值
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
				
//切换图片        
$("#img1").click(function(){
	$("#smallImg").find("img").get(0).src = $(this).find("img").get(0).src;
	$("#bigArea").find("img").get(0).src = $(this).find("img").get(0).src;
})
$("#img2").click(function(){
	$("#smallImg").find("img").get(0).src =$(this).find("img").get(0).src;
	$("#bigArea").find("img").get(0).src = $(this).find("img").get(0).src;
})
$("#img3").click(function(){
	$("#smallImg").find("img").get(0).src =$(this).find("img").get(0).src;
	$("#bigArea").find("img").get(0).src = $(this).find("img").get(0).src;
})
$("#img4").click(function(){
	$("#smallImg").find("img").get(0).src =$(this).find("img").get(0).src;
	$("#bigArea").find("img").get(0).src = $(this).find("img").get(0).src;
})
				
				
				
				
				
				
				

$("#smallArea").width( $("#smallImg").width() * $("#bigArea").width() / $("#bigImg").width() );
$("#smallArea").height( $("#smallImg").height() * $("#bigArea").height() / $("#bigImg").height() );
	//放大系数
				var scale = $("#bigImg").width() / $("#smallImg").width();
				
				//在小图中移动
				$("#smallImg").mousemove(function(e){
					$("#smallArea").show(); //显示小区域
					$("#bigArea").show(); //显示大区域
					 
					
					var x = e.pageX - $("#smallImg").offset().left - $("#smallArea").width()/2;
					var y = e.pageY - $("#smallImg").offset().top - $("#smallArea").height()/2;
					
					//控制不超出左右边界
					if (x < 0){
						x = 0;
					}
					else if (x > $("#smallImg").width()-$("#smallArea").width()){
						x = $("#smallImg").width()-$("#smallArea").width();
					}
					//控制不超出上下边界
					if (y < 0){
						y = 0
					}
					else if (y > $("#smallImg").height()-$("#smallArea").height()) {
						y = $("#smallImg").height()-$("#smallArea").height();
					}
					
					//小区域移动
					$("#smallArea").css({left:x, top:y});
					
					//大图移动
					$("#bigImg").css({left: -scale*x,top: -scale*y});
				})
				
				//移除小图
				$("#smallImg").mouseleave(function(){
					$("#smallArea").hide(); //隐藏小区域
					$("#bigArea").hide(); //隐藏大区域
				})
				var sum = 1;
				
				$("button").eq(0).click(function(){
					sum--;
					if(sum <1 ){
						sum =1;
					}
					$("#ini").get(0).value = sum;
				})
				$("button").eq(1).click(function(){
					sum++;
					if(sum >=99 ){
						sum =99;
					}
					$("#ini").get(0).value = sum;
				})
				$("#ini").blur(function(){
					sum = $("#ini").get(0).value;
				})

	///
			









})