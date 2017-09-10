this.deferred_ = $.Deferred();
var recycle = function() {
	var status = 1;//0成功,1失败
	// var deferred = $.Deferred();
	setTimeout(function() {
		if (status == 0) {
			console.log('done');
			this.deferred_.resolve('done msg');
		} else if (status == 1) {
			console.log('fail');
			this.deferred_.reject('fail msg');
		}
	}, 600);
	return this.deferred_.promise();//promise不可再改变
};
var a = recycle();
console.log(a);
a.resolve();
a.done(function(){
	console.log(1);
})
console.log(this.deferred_);
// recycle()
// 	.done(function(data) { //
// 		console.log(data);
// 	})
// 	.fail(function(data){
// 		console.log(data);
// 	})