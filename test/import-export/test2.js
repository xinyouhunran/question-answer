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

var you = {
	second:function(){
		module.my.test()
	},
	name:module.my.name
}
you.second();
console.log(you.name);
console.log(module.default);
