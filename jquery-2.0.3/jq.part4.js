(285,347) 给jq对象添加实例方法，挂在$上
jQuery继承的方法，后续添加的方法可以通过这个extend添加到jQuery对象之中，
方便扩展，而不是把所有代码一开始就写在prototype下面，这样不利于独立性和后期的维护或扩展

jQuery.extend({
	// Unique for each copy of jQuery on the page
	//jQuery+版本号+随机数(replace将非数字的替换为空，比如说小数点)，确保唯一性，后面的数据缓存，ajax都有用到
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),//jQuery+版本号+随机数(replace将非数字的替换为空，比如说小数点)

	noConflict: function( deep ) {//防止$和jQuery的冲突
		// 当引入jQ之前$和jQuery已经被赋值了才会生效
		if ( window.$ === jQuery ) {//把_$还给$
			window.$ = _$;
		}
		//把_jQuery还给jQuery，注意代码一开始对已有的jQuery
		if ( deep && window.jQuery === jQuery ) {//把_jQuery还给jQuery
			window.jQuery = _jQuery;
		}

		return jQuery;//返还jQuery对象给新的名词
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );//isFinite() 函数用于检查其参数是否是无穷大
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {//内部调用，传位置信息，方便定位
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	//将字符串转为节点
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {//有值且为字符串
			return null;
		}
		if ( typeof context === "boolean" ) {//当第二个参数就是keepScripts的情况，略去参数context（？更加人性化？）
			keepScripts = context;
			context = false;
		}
		context = context || document;//有context就context，没有就赋值document
		//返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。
		var parsed = rsingleTag.exec( data ),//rsingleTag匹配单标签,todo正则的学习
			scripts = !keepScripts && [];//!keepScripts为真时=> scripts=[]，!keepScripts为假时=> scripts=false

		// Single tag
		if ( parsed ) {//单标签
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {//!keepScripts为假时，scripts会被删掉
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );//通过merge把dom节点转为数组，再转为json
	},
	//这里没有用eval解析，因为JSON.parse严格些（只能解析json字符串），而且性能好些
	//json对象=>json字符串 JSON.stringify()
	parseJSON: JSON.parse,//json字符串=>json对象

	// Cross-browser xml parsing
	//以前都用xml解析数据
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {//数据存在或者数据为非字符串时都不执行
			return null;
		}
		//对于IE9以下用ActiveXObject作兼容
		// Support: IE9
		try {
			tmp = new DOMParser();//主流浏览器都有这个方法
			xml = tmp.parseFromString( data , "text/xml" );//创建xml文档对象
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	//写插件或组件时，默认参数为空函数(新哥jquery.selects.js可见)
	noop: function() {},//返回空函数

	// Evaluates a script in a global context
	//把局部的js代码变为全局的js代码
	globalEval: function( code ) {
		var script,
				indirect = eval;//这样写相当于indirect = window.eval

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {//js代码中是否包含"use strict"，即js代码是不是严格模式
				//严格模式下eval()报错
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );//todo为什么要删掉？appendChild就会执行了么？
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );//注意eval()和window.eval()的区别
				//eval( code );//这样写解析不了为全局变量，因为eval()是关键字，是内部解析
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	//把css中的样式中的-转为驼峰
	//如margin-top=>marginTop
	//-ms-transform=>msTransform
	//-moz-transform=>MozTransform
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );//fcamelCase是回调函数
	},

	nodeName: function( elem, name ) {//内部方法，是否未指定节点名
		//$.nodeName(document.body,'body')
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	//数组，类数组（jq对象），json
	each: function( obj, callback, args ) {//内部使用会传args
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );//判断是否为数组或类数组

		if ( args ) {//私有的
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );//参数个数不确定，直接传args,回调函数中的this指向obj[i]

					if ( value === false ) {//如果return false跳出循环
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );//回调函数中的this指向obj[i]

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );//参数个数确定，一个个列出来上

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );//使用原生str.trim()
	},

	// results is for internal usage only
	//类数组，字符串，数字转为数组，用到了$.merge
	makeArray: function( arr, results ) {
		var ret = results || [];//results内部使用

		if ( arr != null ) {
			//注意：Object('str')=>{0:'s',1:'t',2:'r',length:3}。Object(str)会把字符串转为json对象
			if ( isArraylike( Object(arr) ) ) {//isArraylike()传入的必须是对象
				jQuery.merge( ret,
					typeof arr === "string" ?//判断是否为字符串
					[ arr ] : arr
				);
			} else {//处理数字的情况
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {//数组版的indexOf()
		//如果有多个，只返回第一个的位置，感觉就是原生的，arr.indexOf(elem)
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {//判断second的长度是否是number，如果是的话就用for循环，不是的话就用while循环
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {//当second时json的时候（没有长度属性，格式是{0:xx,1:xxx})
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;//手动改变length长度

		return first;
	},
	//跟filter差不多吧？
	grep: function( elems, callback, inv ) {//inv表示取反，对return的取反，如此设计有何好处？
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;//将某个值转为Boolean值的技巧

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );//callback 里面return真或假
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	//数组的映射：根据某种规则，将原来数组映射为新的数组
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,//唯一标识符，将事件和函数进行关联（如on，off）

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {//支持简写 $.proxy(context,'fnName')
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		//arr.slice(begin,end),begin从0开始
		args = core_slice.call( arguments, 2 );//arguments是伪数组，2是截取的起始位置
		proxy = function() {
			//注，这边的arguments是proxy函数的arguments
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	//value的set/get方法，如$().css()、$().attr()
	//elems:元素，fn:回调，key:属性名称，value：属性值，chainable：真为设置值，假为取值
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {//传入的key为对象的时候
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );//递归，一组组执行
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {//没有传key的情况，就看value
				// Bulk operations run against the entire set
				if ( raw ) {//value不是函数，是字符串
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {//value为函数时
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}
		//获取属性
		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) ://没有key时
				length ? fn( elems[0], key ) : emptyGet;//有key，看看length存不存在
	},

	now: Date.now,//函数

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	//场景：要获取display为none元素的宽度，就要先将disply:none转化为visibility:hidden;position:absolute;就可以获取到这个元素的宽度了
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});