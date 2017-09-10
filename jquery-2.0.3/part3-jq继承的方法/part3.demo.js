/*
 * (5)constructor: jQuery,
 */
function Aaa() {}

Aaa.prototype.constructor = Aaa;
console.log(Aaa.constructor) //Aaa

Aaa.prototype.constructor = Array;
console.log(Aaa.constructor) //Array

/*#1 只是在原有prototype上新增*/
Aaa.prototype.name = 'hello';
Aaa.prototype.age = 30;
console.log(Aaa.constructor) //Aaa

/*#2 字面量重写prototype，也会改写函数的constructor*/
Aaa.prototype = {
	name: 'hello',
	age: 30
};
console.log(Aaa.constructor) //Object，prototype被改写成{}

/*#2 字面量重写prototype，手动修正constructor的简便写法*/
Aaa.prototype = {
	constructor: Aaa, //改写constructor
	name: 'hello',
	age: 30
};
console.log(Aaa.constructor) //Aaa

/*
 * (5)constructor: init:function( selector, context, rootjQuery ) {...},
*/

//对$(selector) 和jQuery(selector)中selector的处理
1. 对不正确选择元素的处理：直接返回this，即目前的对象
$(""), $(null), $(undefined), $(false)的处理

2. 对字符串的判断
$("#div"), $(".box"), $("p"), $("#div div.box")

3. 创建标签
$("<li>"),$("<li>1</li><li>2</li>")

4. 对DOM元素进行处理
$(this), $(document)

5. 传入函数
$(function(){})

6. 传入数组
$([]) $({})

/*
 * (127) jQuery.parseHTML(data, context, keepScripts) (475) ->
 * 外部取不到？还是高版本的jquery删掉？
*/
	var str = '<li>1</li><li>2</li><li>3</li><script>alert(1)<\/script>';//闭合标签的时候需要转义，不然会和外部的<script>形成闭合

	var arr = jQuery.parseHTML(str, document, true);//传入str，document和是否传入<script>默认为false，返回一个数组
	//arr->['li','li','li']
	$.each(arr,function(i){
		$('ul').append(arr[i]);
	});
	//html -> <ul></ul>

	var arr1 = ['a','b'];
	var arr2 = ['c','b'];
	var jquery = {//jquery是一个特殊的json对象，类似数组（key为有序数且有长度），所以可以和数组合并
		0:'a',
		1:'b',
		length: 2
	};
	//jQuery.merge(first,second)对外提供的方法是合并两个数组,只改变first元素
	jQuery.merge(arr1,arr2)//不去重->['a','b','c','b']
	jQuery.merge(jquery,arr2)//不去重->jquery={0: "a", 1: "b", 2: "c", 3: "b", length: 4}


/*
 * for (variable in object) {...} 
 * variable:在每次迭代时,将不同的属性名分配给变量。object:被迭代枚举其属性的对象。
 * 
*/

var object = {
	k1:'v1',
	k2:'v2',
	k3:'v3'
};
for (item in object) {
	console.log(item)
}//v1 v2 v3


/*
 * (193) return jQuery.makeArray( selector, this ); ->
 * 将类数组对象，转化为数组对象
*/
	$(function(){
		var divs = document.getElmentsByTagName('div');//获取divs为HTMLCollection的伪数组，没有数组的方法
		divs.push(1)//报错
		$.makeArray(divs).push(1)//正常
	});

	<body>
		<div></div>
		<div></div>
		<div></div>
	</body>


/*
 * $(selector) 关于selector的判断具体代码
*/

几种选择器：

$("#div"), $(".box"), $("p"), $("#div div.box")
$("li",document), $("li",$(document))
$("<li>"), $("<li>1</li><li>2</li>")
$("<li>hello")
$("#id1,#id2,#id3")
$("<li></li>","{title:'hi',html: 'abcd',css: {color: 'red'}}")

init(selector, context, rootjQuery){//选择器，上下文，根节点

	if(){//是sting

		if () {//完整标签

			$("<li>"), $("<li>1</li><li>2</li>")

			match = [ null, selector, null ];//selector即传入字符串

		}else{// 当为id和不完整标签，match才会有值
			对match进行处理
		}
		if (true) {//通过match区分不完整标签和id
			$(".box"), $("p"), $("#div div.box"),$("#id1,#id2,#id3") -> match = null 
			$("#div") -> match = [ '#div', undefined, 'div' ]
			$("<li>hello") -> match = [ '<li>hello', '<li>', undefined ]

			//正则判断 -> 返回数组match=[xx,xx,xx]格式
			if () {//标签
				
				$("<li>hello")//处理方式等价于变为$("<li></li>")处理eg: $("<li>hello").appendTo('ul')
				if () {//单标签且context传入的是一个纯对象
						$("<li></li>","{title:'hi',html: 'abcd'}")
					for( match in context ){//对context对象进行for in枚举

						if (true) {//如果jquery对象上存在与key同名的函数，那么直接调用，如html
							$("<li></li>").html("abcd");
							$("<li></li>").css({color: 'red'});
						}else{//不含有的话就调用attr的方法把属性加上去
							$("<li></li>").attr("title","hi");
						}
					}
				}
			}else{//处理id

				$("#div")//直接用document.getElmentById('div')查找
				挂载相关属性到this，返回this
			}

		}else if () {//无上下文||上下文是jquery对象
			$(".box") ->$(document).find(".box")
			$("p")    ->$(document).find("p")
			$("#div div.box")  ->$(document).find("#div div.box")

			$("li",$(document)) ->$(document).find("li")

			find()调用sizzle里面的方法

		}else{//执行上下文存在(非jquery对象)
			$("li",document) -> $(document).find("#div div.box")
		}

	}else if(selector.nodeType){//非string的情况，传入的值有nodeType属性

		return this = {
			0:selector,
			length:1
		}

	}else if (true) {//selector是一个函数，直接执行

		//$(function(){})和$(document).ready(function(){})效果一样

		//但$(function(){})  调用 -> $(document).ready(function(){})

		$(document).ready(selector)

	}

	if (true) {//针对selector是jquery对象的写法

		$($('#id')) -> $('#id')

	}

	return jQuery.makeArray(selector ,this);//在jquery内部可以将数组对象转化为类数组的json对象，和对外使用用很多区别
}



/*
 * 供jQuery对象使用方法
*/

toArray(){

	调用[].slice.call(jQueryObject) -> array

	$('div') -> {0:div,1:div,2:div,length:3}
	$('div').toArray() -> [div,div,div]
	
	//[].slice.call({0:x,1:xx,length:2})->[x,xx]
}

get(){

	jQuery对象中取原生对象
	$('div').get() 	-> this.toArray()//整个数组
	$('div').get(0).innerHTML = 22222 -> this.toArray()[0]//数组第一位
	$('div').get(-1) ->this.toArray()[this.length -1]//数组最后一位

}

pushStack(){

	jQ对象的入栈处理
	内部使用多且重要


}

