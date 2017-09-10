
(function() { //模块化,外部无法获取到内部元素,不会污染全局
	function addHandler(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler)
		} else {
			element["on" + type] = handler;
		}
	}

	function preOrder(node) { //traversal
		if (!node) {
			return;
		}
		preOrderArr.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}

	function inOrder(node) {
		if (!node) {
			return;
		}
		inOrder(node.firstElementChild);
		inOrderArr.push(node);
		inOrder(node.lastElementChild);
	}

	function postOrder(node) {
		if (!node) {
			return;
		}
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		postOrderArr.push(node);
	}

	function getChildren(node) {
		var nodeList = node.childNodes;
		var children = [].filter.call(nodeList, function(item) {
			if (item.nodeType === 1) {
				return item;
			}
		});
		return children;
	}

	function colorDom(count, arr) {
		if (count >= arr.length) {
			isProcss = false;
			return;
		}
		arr[count].setAttribute('style', 'background-color:#03a9f4');
		this.timer = setTimeout(function() {
			arr[count].setAttribute('style', 'background-color:white');
			count++;
			colorDom(count, arr);
		}, 500);
	}

	function reset(orderArr) {
		for (var i = 0; i < orderArr.length; i++) {
			orderArr[i].removeAttribute('style');
		}
	}
	function start(order){
		if (isProcss) {
			return;
		} else {
			isProcss = true;
		}
		var arr = [];
		clearTimeout(window.timer);
		reset(arr);
		
	}
	var father = document.getElementById('root');
	var buttonGroup = document.getElementById('buttonGroup');
	var preorder = document.getElementById('preorder');
	var inorder = document.getElementById('inorder');
	var postorder = document.getElementById('postorder');
	isProcss = false;
	addHandler(preorder, 'click', function() {
		if (isProcss) {
			return;
		} else {
			isProcss = true;
		}
		preOrderArr = [];
		clearTimeout(window.timer);
		reset(preOrderArr);
		preOrder(father);
		colorDom(0, preOrderArr);
	});

	addHandler(inorder, 'click', function() {
		if (isProcss) {
			return;
		} else {
			isProcss = true;
		}
		inOrderArr = [];
		clearTimeout(window.timer);
		reset(inOrderArr);
		inOrder(father);
		colorDom(0, inOrderArr);
	});

	addHandler(postorder, 'click', function() {
		if (isProcss) {
			return;
		} else {
			isProcss = true;
		}
		postOrderArr = [];
		clearTimeout(window.timer);
		reset(postOrderArr);
		postOrder(father);
		colorDom(0, postOrderArr);
	});


	addHandler(buttonGroup,'click',function(e){//事件委托+事件冒泡
		console.log(e.target);
		switch(e.target.id){
			case: 'preorder'
			
		}
	});

})()