/*function Animal(){

}
Animal.prototype.eat = function(){
	console.log(1);
}
function Cat(){
	this.sleep = function(){
		console.log(2);
	}
}
Cat.prototype = {
	constructor:Cat,
	__proto__:Animal.prototype
}

var c = new Cat();
c.eat();*/
function Animal(){
	this.eat = function(){
		console.log(3);
	}
}
var a = new Animal();
a.eat();

/*location.href = "https://www.baidu.com";*/
/*console.log(window.navigator.geolocation.getCurrentPosition());*/

let obj1 = {
	num:1,
	id:1
}
var obj2 = {
	num:2,
	id:2
}
var obj = $.extend(obj1,obj2);
console.log(obj);

var o = JSON.stringify(obj1);
console.log(o);
