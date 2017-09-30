
(349,863)
/*
**通过part3提到的$.extend({})拓展工具方法
**工具方法是最底层的东西
**
**
**
**
**
*/

jQuery.extend({

	expando:生成唯一jQ字符串（内部使用）
	
	noConflict(): 防止冲突

	isReady: DOM是否加载完成（内部）

	readyWait:	等待多少文件的计数器（内部）

	holdReady(): 推迟DOM触发

	ready(): 准备DOM触发

	isFunction(): 是否是函数

	isArray(): 是否是数组

	isWindow(): 是否为window

	isNumberic(): 是否为数字

	type(): 判断type类型

	isPlainObject(): 是否为对象自变量（是否是纯粹的对象，由{}或 new Object() 构建的）

	isEmptyObject(): 是否为空对象

	error(): 抛出错误

	parseHTML(): 解析节点

	parseJSON(): 解析JSON

	parseXML(): 解析XML

	noop(): 空函数

	globalEval(): 全局解析js

	camelCase(): 转驼峰

	nodeName(): 是否为制定节点名

	each(): 遍历集合

	trim(): 去前后空格

	makeArray(): 类数组转化为真数组

	inArray(): 数组版indexOf()

	merge():  合并数组

	grep(): 过滤新数组

	map(): 映射新数组

	guid: 唯一标识符（内部）

	proxy(): 改变this指向

	access():多功能值操作（内部）

	now: Date.now() 当前时间

	swap(): css交换（内部）


});

jQuery.ready.promise = function(){} 检测DOM的异步操作（内部）

function isArraylike(){}类似数组的判断 （内部）