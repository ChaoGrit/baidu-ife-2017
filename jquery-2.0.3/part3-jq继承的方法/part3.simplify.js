



jQuery.extend = jQuery.fn.extend= jQuery.prototype.extend = function() {
	//注：传入的参数统一由arguments获取函数内部参数
	/*
	**继承：
	**JQ中：拷贝继承
	**JS：类式继承/原型继承-> 通过构造函数 new xx()/{}.prototype=xxx
	**$.extend() -> this 是 $ -> this.aaa(jQuery上挂载) ->调用 $.aaa();
	**$.fn.extend() -> this 是 $.fn -> this.aaa(即原型上挂载) ->调用时要先创建对象才能调用得到 $().aaa();
	**
	**
	*/


	定义了一些变量

	if () {//判断是否是深拷贝

	}

	if () {//判断参数是否正确

	}

	if () {//判断是否只传了一个对象，即拓展插件的情况

	}

	for(){
		if () {//防止循环引用

		}

		if () {//深拷贝

		}else if () {//浅拷贝

		}
	}

}