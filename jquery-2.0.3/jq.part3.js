
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
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {//参数是否正确
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {//拓展插件时只传一个对象
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

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