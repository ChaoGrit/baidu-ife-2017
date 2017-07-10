window.tree = {}; //先创造个命名空间
(function(tree) { //模块化
	function addHandler(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler)
		} else {
			element["on" + type] = handler;
		}
	}

	function preTravel(node) { //traversal
		var domArr = getChildren(node);
		for (var i = 0; i < domArr.length; i++) {
			colorDom(domArr[i]);
			children = getChildren(domArr[i]);
			if (children.length > 0) {
				preTravel(children[1]);
			}
		}
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

	function colorDom(dom) {
		dom.setAttribute('background-color', '#03a9f4');
		setTimeout(function() {
			dom.setAttribute('background-color', 'white');
		}, 500);
	}
	var tree = document.getElementById('root');
	var preorder = document.getElementById('preorder');
	var inorder = document.getElementById('inorder');
	var postorder = document.getElementById('postorder');

	preTravel(tree);

})(tree)