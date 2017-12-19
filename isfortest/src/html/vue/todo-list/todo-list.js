var ListStorage = 'vue-todo-list';
//Html5 本地缓存
var todoStorage = {
		fetch: function() {
			var todolist = JSON.parse(localStorage.getItem(ListStorage) || '[]');
			todolist.forEach(function(item, index) {
				item.id = index;
			});
			todoStorage.totalId = todolist.length;
			return todolist;
		},
		save: function(todolist) {
			localStorage.setItem(ListStorage, JSON.stringify(todolist));
		}
	}
	//用于computed
var filter = {
	all: function(list) {
		return list;
	},
	left: function(list) {
		return list.filter(function(item) {
			return !item.hasDone;
		});
	},
	done: function(list) {
		return list.filter(function(item) {
			return item.hasDone;
		});
	}
}
new Vue({
	el: '#todo-list',
	data: {
		// todolist: [{
		// 	text: 'zhou',
		// 	hasDone: true
		// }, {
		// 	text: 'mo',
		// 	hasDone: true
		// }, {
		// 	text: 'qu',
		// 	hasDone: false
		// }, {
		// 	text: 'wan',
		// 	hasDone: false
		// }, {
		// 	text: 'youxi',
		// 	hasDone: false
		// }, {
		// 	text: 'ba',
		// 	hasDone: false
		// }],
		todolist: todoStorage.fetch(),
		btnGroup: [{
			title: '全部',
			status: 'all'
		}, {
			title: '未完成',
			status: 'left'
		}, {
			title: '已完成',
			status: 'done'
		}],
		whattodo: '',
		select: 'all',
		editItem: null
	},

	methods: {
		addTodo: function() {
			//this指当前Vue这个实例
			if (this.whattodo && this.whattodo.trim()) {
				this.todolist.push({
					text: this.whattodo,
					hasDone: false,
					id: todoStorage.totalId++
				});
				this.whattodo = '';
			}
		},
		removeItem: function(currentItem) {
			// console.log(currentItem);//传入的当前item
			this.todolist.splice(this.todolist.indexOf(currentItem), 1);
		},
		removeDone: function() {
			this.todolist = filter.left(this.todolist);
		},
		changeStatus: function(currentItem) {
			switch (currentItem.status) {
				case 'all':
					this.select = 'all'
					break;
				case 'left':
					this.select = 'left'
					break;
				case 'done':
					this.select = 'done'
					break;
			}
		},
		editTodo: function(currentItem) {
			this.beforeEditCache = currentItem.text;
			this.editItem = currentItem;
		},
		doneEdit: function(currentItem) {
			if (!this.editItem) {
				return;
			}
			this.editItem = null;
			currentItem.text = currentItem.text.trim();
			if (!currentItem.text) {
				this.removeItem(currentItem);
			}
		},
		cancelEdit: function(currentItem) {
			this.editItem = null;
			currentItem.text = this.beforeEditCache;
		}
	},

	watch: {
		todolist: {
			handler: function(val) {
				todoStorage.save(val);
			},
			deep: true
		}
	},

	computed: {
		filterList: function() {
			return filter[this.select](this.todolist);
		},
		total: function() {
			return this.todolist.length;
		},
		remaining: function() {
			return filter.left(this.todolist).length;
		}
	},

	filters: {
		pluralize: function(value) {
			return value === 1 ? 'item' : 'items';
		}
	},

	directives: {
		autofocus: function(e) { //inserted是钩子函数
			e.focus();
		}
	}
});