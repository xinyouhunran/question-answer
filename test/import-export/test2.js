/*import {my} from "./test.js";

var you = {
	second:function(){
		my.test()
	},
	name:my.name
}
you.second();
console.log(you.name);*/

import * as module from "./test.js";
var mine=module.my;
var you = {
	
	second:function(){
		mine.test()
	},
	name:mine.name
}

you.second();
console.log(you.name);
console.log(module.default);
