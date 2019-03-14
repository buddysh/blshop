$(function(){
	//判断用户名
	var flag1 = false;
	var flag2 = false;
	var flag3 = false;
	var flag4 = false;
	var flag5 = false;
	var flag6 = false;
	var flag7 = false;
	var flag8 = false;
	
		$("#inpt-show1").blur(function(){
			$(this).parent().next("span").css("display","inline-block");
			var reg = /^[a-zA-Z0-9]{4,20}$/;
			var reg1 = /[a-zA-Z]/;
			var str = $(this).get(0).value;
			if(reg.test(str) && reg1.test(str)){
				// $(this).parent().next("span").find("img").get(0).attr("src", "{% static 'images/yes.png' %}");
				$('.inpt-show1').attr('src',"/static/images/yes.png")
				$(this).parent().next("span").find("a").css("display","none");
				flag1 = true;
			}
			else{
				// $(this).parent().next("span").find("img").get(0).attr("src", "{% static 'images/no.png' %}");
				$('.inpt-show1').attr('src',"/static/images/no.png")
				$(this).parent().next("span").find("a").css("display","inline-block");
				flag1 = false;
			}
		})

	$("#inpt-show2").blur(function(){
		$(this).parent().next("span").css("display","inline-block");
		var str = $(this).val();
		if(str.length<=5){

			$('.inpt-show2').attr('src',"/static/images/no.png")
			$(this).parent().next("span").find("a").html("请重新输入密码");
			$(this).parent().next("span").find("ul").css("display","none");
			flag2 = false;
		}
		else if(str.length >= 6 && str.length <= 20){
			// $(this).parent().next("span").find("img").get(0).src = "../images/yes.png";
			$('.inpt-show2').attr('src',"/static/images/yes.png")
			// $(this).parent().next("span").find("a").html("  ")
			$(this).parent().next("span").find("ul").css("display","none")
			flag2 = true;
		}
	})

	$("#inpt-show3").blur(function(){
		var str = $(this).val();
		var str1 = $("#inpt-show2").val();
		$(this).parent().next("span").css("display","inline-block");
		if(str == str1 ){
			$('.inpt-show3').attr('src',"/static/images/yes.png")
			$(this).parent().next("span").find("a").html("  ");
			flag3 = true;
		}
		else{
			$('.inpt-show3').attr('src',"/static/images/no.png")
			$(this).parent().next("span").find("a").html("两次输入密码不一致");
			flag3 = false;
		}
	})


	//邮箱验证
	$("#inpt-show7").blur(function(){
		$(this).parent().next("span").css("display","inline-block");
		var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		var str = $(this).val();

		if(reg.test(str)){
			$('.inpt-show7').attr('src',"/static/images/yes.png")
			$(this).parent().next("span").find("a").html(" ");
			flag7 = true;
		}
		else{
			$('.inpt-show7').attr('src',"/static/images/no.png")
			$(this).parent().next("span").find("a").html("邮箱格式不正确");
			flag7 = false;
		}
	})
	$("#check").click(function(){
		if($("#check").is(':checked')){
			flag8 = true;
		}
		else{
			flag8 = false;
		}
		console.log(flag8);
	})
	
	

	
	//
	// $("#inpt-show8").click(function(e){
	// 	e.preventDefault();
	//
	// 	var ainpt = $("#inpt-show1").get(0).value;
	// 	var binpt = $("#inpt-show2").get(0).value;
	// 	var cinpt = $("#inpt-show4").get(0).value;
	// 	console.log(ainpt + " + " + binpt + " + " + cinpt);
	// 	var xhr = new XMLHttpRequest();
    //
    //             xhr.open("post", "http://localhost/e/js/02_register.php", true);
    //             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //             var str = "username="+  ainpt  + "&password=" + binpt + "&phone=" + cinpt;
    //             //console.log(str);
    //             xhr.send(str);
    //             xhr.onreadystatechange = function () {
    //                 if (xhr.readyState==4 && xhr.status==200) {
    //                     console.log(xhr.responseText);
    //                     //json解析
    //                     //如果注册成功则进入登录页面
    //                     //如果失败则弹出提示信息
    //                     var obj = JSON.parse(xhr.responseText);
    //
    //                		if(obj.status == 1){
	//                    		alert("注册成功");
	//                    		location.href = "login.html";
	//                    	}
    //
    //                 }
    //             }
    //
    //
                
//		if(flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8){
////			$.cookie("usename", $("#inpt-show1").get(0).value, {expires:10, path:"/"});
////			$.cookie("password", $("#inpt-show2").get(0).value, {expires:10, path:"/"});
//			location.href = "login.html";
//		}
//		else{
//			alert("您的填写信息有误！");
//		}
// 	})
//
	
	//



	
	
	///mysql

})	