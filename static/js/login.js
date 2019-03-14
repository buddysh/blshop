//
$(function(){
//	var namer =  $.cookie("usename");
//	var pass  = $.cookie("password");
	
	
	
	$("#box4").click(function(){
//		var usename = $("#box1").find("input").get(0).value;
//		var pwd = $("#box2").find("input").get(0).value;
		
		var xhr = new XMLHttpRequest();
            xhr.open("post", "http://localhost/e/js/04_login.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var str = "username=" + $("#box1").find("input").get(0).value   + "&password=" + $("#box2").find("input").get(0).value;
            xhr.send(str);
            xhr.onreadystatechange = function () {
                if (xhr.readyState==4 && xhr.status==200) {
                    console.log(xhr.responseText);
                   	var obj = JSON.parse(xhr.responseText);
                   	
                   	if(obj.status == 1){
                   		alert("登录成功");
                   		location.href = "../index.html?name=" + $("#box1").find("input").get(0).value;
                   	}
                   	else {
                   		alert("密码错误")
                   	}
                }

            }
		
		
		
	})
	
	

	
	
	
	
	
})

	
	
	
	
	

