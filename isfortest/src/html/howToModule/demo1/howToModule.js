//example·封装成对象
var module1 = {
	count1: 1,
	f1: function(){
		var a = 1; 
		console.log('module1',a);
	}
};
//example·立即执行函数
var module2 = (function(){
	var count2 = 2;
	var f1 = function(){
		console.log('module2');
	};
	/*
	**只要不return出来，外面是改变不了的
	**但是return出来的外面还是能改变
	*/
	return {
		f1: f1
	}
})()
//example·放大模式 便于继承已有的模块，
//不会把原来的覆盖掉，对module2添加方法
var module3 = (function(module2){
	module2.f2 = function(){
		console.log('add new function into module2')
	}
	return module2;
})(module2);
//example·宽放大模式 当module4还没有声明时怎么办？
//第一次时预先传入一个空对象，只是保证不会报错，对于module4新增的方法并获取不到
//但是后面在给module5添加子集的时候就不能用字面量重写的方式了吧
var module5 = (function(module4){
	// console.log(module4)
	module4.f2 = function(){
		console.log('add new function into module2')
	}
	return module4;
})(window.module4 || {});
var module4 = {
	f1: function(){
		console.log('add after');
	}
}
//example·输入全局变量 
// var module6 = (function ($, YAHOO) {
// 	//把jquery和YAHOO两个库当作参数传入module1
// })(jQuery, YAHOO);
