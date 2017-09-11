
	(285,347) extend:jQuery继承的方法，后续添加的方法可以通过这个extend添加到jQuery对象之中，
		方便扩展，而不是把所有代码一开始就写在prototype下面，这样不利于独立性和后期的维护或扩展

		
// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;//

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;//默认浅拷贝

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {//是否是深拷贝
		deep = target;//把值给deep
		target = arguments[1] || {};//对target重新赋值，直接用了arguments的属性，不需要直接传参过来
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {//参数是否正确
		target = {};//目标不是对象或不是一个函数的话，就把它变为一个对象
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {//只传一个对象，判断是不是插件的情况
		target = this;//只传一个对象时，目标元素就是this-> $ 或 $() 对象
		--i;//--i可以参与到下面的循环中
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {//后面的对象arguments[]i是否是非non情况
			// Extend the base object
			for ( name in options ) {//option是后续对象，name是对象的属性名
				src = target[ name ];//
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {// a={}; $.extend(a,{name:a})这种情况
					continue;//跳出循环
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {//数组的情况
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {//对象的情况,感觉有点类似模块化的宽放大模式
						clone = src && jQuery.isPlainObject(src) ? src : {};//src已经存在&&src是否是json？src：{}
						//var a = {person:{job:'it'}};
						//var b = {person:{age:'25'}};
						//$.extend(true,a,b);
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );//递归，针对三层以上的对象

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;//直接等于
				}
			}
		}
	}

	// Return the modified object
	return target;
};