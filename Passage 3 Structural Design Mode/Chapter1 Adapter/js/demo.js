/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-26
 *****/
 /*Adapter:适配器的作用是解决两个软件实体间的接口不兼容的问题，使用适配器模式后，
 			原本由于接口不兼容的两个软件实体可以一起工作*/

//实例 1 鸭子具有quack、fly方法，火鸡有gobble、fly方法，为了让火鸡也支持quack方法
//需要通过一个适配器来实现；
//鸭子
 var Duck = function() {
 	this.type = "duck";
 };
 Duck.prototype.fly = function() {
 	throw new Error("该方法必须被重写");
 };
 Duck.prototype.quack = function() {
 	throw new Error("该方法必须被重写");
 };

//火鸡
var Turkey = function(){
	this.type = "turkey";
};
Turkey.prototype.fly = function() {
	throw new Error("该方法必须被重写");
};
Turkey.prototype.gobble = function() {
	throw new Error("该方法必须被重写");
};

//定义具体的鸭子构造函数
var MallardDuck = function() {
	Duck.apply(this);
}

MallardDuck.prototype = new Duck();
MallardDuck.prototype.fly = function() {
	console.log("可以飞翔很长的距离!");
}

MallardDuck.prototype.quack = function() {
	console.log("嘎嘎！嘎嘎！");
}

//定义具体的火鸡构造函数

var WildTurkey  = function() {
	Turkey.apply(this);
}

WildTurkey.prototype = new Turkey();
WildTurkey.prototype.fly = function() {
	console.log("飞翔的距离貌似有点短!");
}
WildTurkey.prototype.gobble = function() {
	console.log("咯咯！咯咯！");
}

//为了让火鸡也支持quack方法，我们创建了一个新的火鸡适配器TurkeyAdapter：

var TurkeyAdapter = function(oTurkey) {
	Duck.apply(this);
	this.oTurkey = oTurkey;
}
TurkeyAdapter.prototype = new Duck();
TurkeyAdapter.prototype.quack = function() {
	this.oTurkey.gobble();
}
TurkeyAdapter.prototype.fly = function() {
	var nFly = 0,
		nLenFly = 5;
	for(; nFly < nLenFly; nFly++) {
		this.oTurkey.fly();
	}
}

var oMallardDuck  = new MallardDuck(),
	oTurkey = new WildTurkey(),
	oTurkeyAdapter  = new TurkeyAdapter(oTurkey);
console.log("------duck-----");
oMallardDuck.quack();
oMallardDuck.fly();

console.log("------turkey-----");
oTurkey.gobble();
oTurkey.fly();

console.log("------Adapter-----");

oTurkeyAdapter.quack();
oTurkeyAdapter.fly();


//实例 2 
var GoogleMap = {
	show:function() {
		console.log("开始渲染谷歌地图");
	}
}

var BaiduMap = {
	display:function() {
		console.log("开始渲染百度地图");
	}
}

var MapAdapter = {
	show:function(){
		return BaiduMap.display();
	}
}

MapAdapter.show();//开始渲染百度地图