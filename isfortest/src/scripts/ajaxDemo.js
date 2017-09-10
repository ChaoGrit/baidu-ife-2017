(function() {
	// $('.js-ajax-btn').on('click',function(){
	// 	// $.ajax({
	// 	// 	url: 'form/submit',
	// 	// 	type: 'post',
	// 	// 	dataType: 'json',
	// 	// 	success: function(data){
	// 	// 		if (data.success) {
	// 	// 			console.log(data);
	// 	// 		}
	// 	// 	},
	// 	// 	error: function(){
	// 	// 		console.log('can not find');
	// 	// 	}
	// 	// })
	// 	$.post('form/submit',{ff:'333'},function(data){
	// 			 console.log(data)
	// 	},'json');
	// $.getJSON('form/submit',function(data){console.log(data)})//为何不能用json格式传参
	// });
	// $('.js-ajax-btn2').on('click',function(){
	// 	$.post('form/submit2',{ff:'333'},function(data){
	// 			 console.log(data)
	// 	},'json')
	// });
	// $(document).ajaxComplete(function(event,xhr,settings){ //只要是ajax请求成功都会触发，所以可以加个if进行判断
	// 	if (settings.url == 'form/submit') {
	// 		console.log('It is completed');
	// 	}
	// });
	// $(document).ajaxComplete(function(event,xhr,settings){ //只要是ajax请求成功都会触发，所以可以加个if进行判断
	// 	if (settings.url == 'form/submit') {
	// 	}
	// 	console.log('It is sent');
	// });

	/*原生ajax*/
	$('.js-ajax-btn').on('click', function() {
		var xhr = new XMLHttpRequest();
		xhr.open("get", "form/submit", true);
		xhr.send();
		xhr.onreadystatechange = function(data) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(data);
				console.log(xhr.responseText);
				/*json字符串转换为对象*/
				var jsonStr = JSON.parse(xhr.responseText);
				// var jsonStr = $.parseJSON(xhr.responseText);
				var jsonStr = eval('(' + xhr.responseText + ')');
				/*json对象转换为字符串*/
				// var jsonObj = JSON.stringify(jsonStr);
				console.log(jsonStr);
			}
		}
	});
	// var i = 1;
	// // console.log(window.i);
	// function show(){
	// 	console.log(i);
	// 	var i = 3; //var i = 3;相当于两步，1.var i;（会被提前），2.i = 3;
	// 	console.log(i);
	// }

	// show();
	// console.log(i);

	/*********************/
	// // var bar;
	// function bar(){
	// 	// return foo;
	// 	function foo(){};
	// 	foo = 10;
	// 	var foo = 11;
	// }
	// console.log(typeof bar);

	/*函数声明会被提到最前面，在var之前*/

	var myName = 1;

	function myName() {
		console.log("Rich");
	}
	console.log(typeof myName); //结果是number

	var myName;

	function myName() {
		console.log("Rich");
	}
	console.log(typeof myName); //结果是function
	/*****************/
	// function bar(){
	// 	return foo;
	// 	function foo(){};
	// 	foo = 10;
	// 	var foo = 11;
	// }
	// console.log(foo);//即使返回值是函数内部的foo，外部也是获取不到的
})()