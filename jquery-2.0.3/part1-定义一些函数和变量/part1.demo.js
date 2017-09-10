/*一般构造函数写法*/
function Aaa(){
}
Aaa.prototype.init = function(){//初始化
};
Aaa.prototype.css = function(){//挂载方法
};
var a1 = new Aaa();
a1.init();
a1.css();


/*jQuery写法*/
//new的操作 在这里面执行，返回一个实例对象
function jQuery(){
	return new jQuery.prototype.init();
}

//把jQuery的原型赋给jQuery.prototype.init的原型，
//由jQuery.prototype.init构造出来的函数可以直接调用jQuery.prototype上的方法
//出现了对象的引用关系，修改jQuery.prototype，jQuery.prototype.init.prototype也会相应被修改
jQuery.prototype.init.prototype = jQuery.prototype;//源码 jQuery.fn.init.prototype = jQuery.fn;(283行)

jQuery.prototype.init = function(){};
jQuery.prototype.css = function(){};

//jquery中调方式,需要jQuery()直接返回对象，就不要在每次new一个实例，再调用方法
jQuery().css();