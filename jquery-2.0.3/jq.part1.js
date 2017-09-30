

(21,94) 定义一些变量和函数

/*chao:
** 1.匿名函数自执行，内部变量都是局部的
** 2.以参数形式穿传入window有两个好处：
**    (1)方便压缩代码，如果直接取window是不能被压缩
**    (2)性能更高,window是js的最顶端,js会逐层网上查找变量,查找速度慢,
**      参考作用域链原理。传参方式就不用去外层取window
** 3.传入undefined，因为undefined不是关键字，防止部分浏览器(低版本IE)允许对undefined进行改写
chao*/
(function(window,undefined){

/*chao:在https://bugs.jquery.com/输入索引#13335找到更详细解释*/

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";


var
	// A central reference to the root jQuery(document)
	rootjQuery,   /*chao:把jQuery(document)存起来，便于压缩和代码维护*/

	// The deferred used on DOM ready
	readyList,

	// Support: IE9 老版本浏览器==undefined判断不出来
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,  /*chao: 寄存'undefined'字符串，typeof判断全兼容 */

	// Use the correct document accordingly with window argument (sandbox)
	/*chao: 寄存一些变量，便于压缩 */
	location = window.location,
	document = window.document,
	docElem = document.documentElement,//docElem 为html标签

	/*chao: 两句防冲突  先把window下原有的$寄存为_$或者_jQuery,使用$.noConfilct()的时候会返还，否则就把原来的覆盖了*/
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	/*chao: $.type()用到，做类型判断，存储格式为{'[Object String]':'string','[Object,Array]':'array'}*/
	// [[Class]] -> type pairs
	class2type = {},//2来自于[Object String]，两个内容

	/*chao: 之后的版本删除了，没啥用*/
	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",


	/*chao: 对一些方法进行局部自变量存储，方便后面使用和压缩*/
	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers 匹配数字 css方法用到
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace 匹配单词，找空格分隔
	core_rnotwhite = /\S+/g,


	/*chao：防注入*/
	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag 匹配独立空标签
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing css3前缀转化为驼峰写法
	rmsPrefix = /^-ms-/,//获取IE -ms-开头的css样式
	rdashAlpha = /-([\da-z])/gi,//大小写转化

	// Used by jQuery.camelCase as callback to replace()
	/*转驼峰*/
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	/*dom加载成功后触发*/
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

})(window)