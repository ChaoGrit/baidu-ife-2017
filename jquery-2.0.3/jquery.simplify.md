
//所有代码放进匿名函数自执行，局部，防止冲突
(function(){

	(21,94) 定义一些变量和函数

	(61) 很重要的=> jQuery = function(){return jq对象 };暂时是局部的，$()和jQuery()都是调用这个函数，返回对象

	(96,280) 给jq对象添加方法或属性，通过面向对象的方法，挂在prototype底下
		$('#div1').css();
		$('#div1').html();
		=>类似
		var arr = new Array();
		arr.push();
		arr.sort();
		给同种对象原型链上加上共有的方法

	(285,347) extend:jQuery继承的方法，后续添加的方法可以通过这个extend添加到jQuery对象之中，
		方便扩展，而不是把所有代码一开始就写在prototype下面，这样不利于独立性和后期的维护或扩展

	(349,817) jQuery.extend():拓展一些工具方法，工具方法是基础的方法
		jQuery提供了两种操作代码的方式：

		实例方法，更高层，只供jq对象调用。用jQuery.fn.extend()添加
		$().css();
		$().html();
		&
		工具方法，$是指函数，最底层，jq对象的方法调用这些工具方法完成。用jQuery.extend()添加
		$.trim();
		$.proxy();


	(877,2856) Sizzle:复杂选择器的实现，较为独立，可单独下载
		$('ul>li+p input.class')

	(2880,3042) Callbacks:回调对象=>进行函数的统一管理
		function fn1(){alert(1)}
		function fn2(){alert(2)}

		var cb = $.Callbacks();//新增函数管理
		
		cb.add(fn1)//给cb添加函数fn1
		cb.add(fn2)//给cb添加函数fn2

		cb.fire()//按添加顺序执行，弹窗1,2
		cd.remove(fn2)//移除已有函数

	(3043,3183) Deferred:延迟对象=>对异步的统一管理，异步操作：定时器，ajax，创建<script>
		可用于bui组件加载完成再对对象或dom进行绑定，参考list.js
		var dfd = $.Deferred();
		setTimeout(function(){
			alert(1);
			dfd.resolve();
		});
		dfd.done(function(){
			alert(2);
		});

	(3184,3295) support:功能检测，通过一些浏览器的特性来判断浏览器信息，判断浏览器方法

	(3308,3652) data(): 数据缓存，数据缓存的挂载机制，
		并不会将数据直接拓展到dom上，也不是添加在元素上（直接拓展复杂对象造成内存泄漏？）而是会寄存起来
		$('#div').data('name','hello');
		$('#div').data();//hello
		//attr()方法会加载dom结构上

	(3653,3797) queue/dequeue: 队列管理 ,动画效果常用，也可用于函数执行顺序的管理
		分开写的，动画保持执行顺序
		$('#div').animate({left:100});
		$('#div').animate({top:100});
		$('#div').animate({width:300});

	(3803,4299) 对元素属性的操作=>attr(),prop(),val(),addClass()等等

	(4300,5128) 事件操作的相关方法=> on() off() trigger()等等

	(5140,6057) DOM操作：添加，删除，获取，包装，DOM筛选

	(6058,6620) css方法：样式的操作（考虑到兼容性，写法，单位，代码量比较多）

	(6621,7854) 提交的数据和ajax操作：$.ajax() , $('#div').load() , $.getJSON()

	(7855,8584) 动画：$.animate() 和封装好的show(),hide(),fadeIn()

	(8585,8792) 位置与尺寸： offset() weight() height()

	(8804,9921) jQuery支持模块化

	(8826)将jQuery挂在window底下 window.jQuery = window.$ = jQuery;


})()