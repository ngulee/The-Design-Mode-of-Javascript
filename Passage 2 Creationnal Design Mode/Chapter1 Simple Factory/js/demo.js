
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-22
 *****/
 /*Simple Factory:简单工厂模式又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象的实例
 				 主要用来创建同一类对象*/
 /*以去体育商品店买东西为例进行说明*/

 //篮球基类
 var Basketball = function() {
 	this.intro = "篮球盛行于美国";
 };
 Basketball.prototype = {
 	getMember() {
 		console.log("每个队伍需要5名队员");
 	},
 	getBallSize() {
 		console.log("篮球很大");
 	}
 };

 //足球基类
 var Football = function() {
 	this.intro = "足球在世界范围内很流行";
 };
 Football.prototype = {
 	getMember() {
 		console.log("每个队伍需要11名队员");
 	},
 	getBallSize() {
 		console.log("足球很大");
 	}
 };

  //网球基类
 var Tennis = function() {
 	this.intro = "每年有很多网球系列比赛";
 };
 Tennis.prototype = {
 	getMember() {
 		console.log("每个队伍需要1名队员");
 	},
 	getBallSize() {
 		console.log("网球很小");
 	}
 };

 //运动工厂
 var SportsFactory = function(name) {
 	switch(name) {
 		case 'NBA' :
 			return new Basketball();
 		case 'wordCup' :
 			return new Football();
 		case 'FrenchOpen' :
 			return new Tennis();			
 	}
 };

 //为世界杯创建一个足球，只需记住运动工厂SportsFactory,调用并创建
 console.log("---------Factory-------")
 var footnall = SportsFactory('wordCup');
 console.log(footnall);
 console.log(footnall.intro);
 footnall.getMember();

 /*工厂模式：一个对象有时可以替代多个类*/
 function createBook(name, time, type) {
 	//创建一个对象，并对对对象拓展属性方法
 	var o = {};
 	o.name = name;
 	o.time = time;
 	o.type = type;
 	o.getName = function() {
 		console.log(this.name);
 	}
 	//将对象返回
 	return o;
 };

 function createPop(type, text) {
 	var o = {};
 	o.content = text;
 	o.show = function() {
 		//显示方法
 	};
 	if(type == "alert") {
 		alert(o.content);
 	};
 	if(type == "prompt") {
 		prompt(o.content);
 	};
 	if(type == "confirm") {
 		confirm(o.content);
 	};
 	//讲对象返回
 	return o;
 }
 var userNameAlert = createPop("alert", "用户名只能是26个字母和数字");