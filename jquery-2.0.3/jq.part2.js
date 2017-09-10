(96,280) 给jq对象添加方法或属性，通过面向对象的方法，挂在prototype底下

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery, //后面的this.constructor = jQuery->见源码
	init: function( selector, context, rootjQuery ) {//选择器，上下文，跟节点
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;// return 生成的对象
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {//
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				//完整标签
				match = [ null, selector, null ];

			} else {//不完整标签和id才会有值，其他都是null
				match = rquickExpr.exec( selector );//搜索匹配，返回一个数组或null,
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {//id不需要上下文,因为唯一

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {//处理标签
					//传入的context，指定owerDocument，默认是document，也可以是iframe.contentWindow.document，没有特别的意义
					//判断是否是jq对象，是的话取jq对象的0，原生的就取原生的，最终得到的都是原始document
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],//整个字符串
						context && context.nodeType ? context.ownerDocument || context : document,//上下文
						true//是否能传入包含<script>的字符串
					) );//->得到一个json格式的jQuery对象 this= {0:xxx,1:xxx,length:2}

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {//当context是纯对象时，表示的就是要给标签加的属性
						for ( match in context ) {//for in 对context对象进行循环
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {//如果jquery对象上存在与key同名的函数，那么直接调用，如html。有点像wsfe？
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );//不含有的话就调用attr的方法把属性加上去
							}
						}
					}

					return this;//创建标签结束，返回jQuery对象

				// HANDLE: $(#id)
				} else {//处理id，原生方法最快
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {//一个元素能在页面上存在的话必有父节点
						// Inject the element directly into the jQuery object
						this.length = 1;//给this对象手动加length
						this[0] = elem;
					}

					this.context = document;//上下文肯定是document
					this.selector = selector;
					return this; //return jQuery object
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {//无上下文||上下文是jquery对象
				return ( context || rootjQuery ).find( selector );//无上下文的情况,$(document).find(selector)

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {//剩下的class，标签名，需要上下文的，直接通过find查找
				return this.constructor( context ).find( selector );//jQuery(context).find(selector)
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {//selector非字符串 && selector有nodeType
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );//$(documnet).ready(function(){})
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",//存选择器

	// The default length of a jQuery object is 0
	length: 0,//类数组对象的长度，很重要

	toArray: function() {//将类数组转化为数组，只给jquery使用
		return core_slice.call( this );//调用[].slice.call({0:x,1:xx,length:2})->[x,xx]
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );//num<0从后往前算
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;//用于end时找到底层
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;//其实就是新的this对象，加了prevObject这个属性
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {//加强版for循环
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};