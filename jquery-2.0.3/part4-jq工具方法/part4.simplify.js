

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



})