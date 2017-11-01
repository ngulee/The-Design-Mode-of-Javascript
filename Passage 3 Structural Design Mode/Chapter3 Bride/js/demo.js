/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-23
 *****/
 /*Bride:在系统沿着多个维度变化的同时，又不增加其复杂度并达到解耦*/
 
 //需求：当鼠标滑过用户名时，直接改变背景色，当鼠标滑过等级和信息时，
 //改变数字的颜色和背景色；(该实例通过纯CSS可以很简单的解决，在这只是为了
 //用来掩饰桥接模式)；

/* //原方案
 var list = document.querySelectorAll(".list"),
 	 strong = document.querySelectorAll(".strong");
//用户名
 list[0].onmouseover = function() {
 	var that = this;
 	that.style.color = "red";
 	that.style.background = "#ddd";
 }

 list[0].onmouseout = function() {
 	var that = this;
 	that.style.color = "#333";
 	that.style.background = "#f5f5f5";
 }

//用户等级
 list[1].onmouseover = function() {
 	var target = strong[0];
 	target.style.color = "red";
 	target.style.background = "#ddd";
 }

 list[1].onmouseout = function() {
 	var target = strong[0];
 	target.style.color = "#333";
 	target.style.background = "#f5f5f5";
 }


//信息提示
 list[2].onmouseover = function() {
 	var target = strong[1];
 	target.style.color = "red";
 	target.style.background = "#ddd";
 }
 list[2].onmouseout = function() {
 	var target = strong[1];
 	target.style.color = "#333";
 	target.style.background = "#f5f5f5";
 }
*/

 //采用桥接模式优化

 //step 1 提取代码中相同的部分，并抽象化；
 function changeColor(dom, color, bg) {
 	dom.style.color = color;
 	dom.style.background = bg;
 }

 //step 2 事件与业务逻辑之间的桥梁
//用户名
 var list = document.querySelectorAll(".list"),
 	 strong = document.querySelectorAll(".strong");

list[0].onmouseover = function() {
 	changeColor(this, "red", "#ddd")
 }

 list[0].onmouseout = function() {
 	changeColor(this, "#333", "#f5f5f5")
 }

//用户等级
 list[1].onmouseover = function() {
 	changeColor(strong[0], "red", "#ddd")
 }

 list[1].onmouseout = function() {
 	changeColor(strong[0], "#333", "#f5f5f5")
 }

//信息提示
  list[2].onmouseover = function() {
 	changeColor(strong[1], "red", "#ddd")
 }

 list[2].onmouseout = function() {
 	changeColor(strong[1], "#333", "#f5f5f5")
 }

 /*多元化对象--多维对象类*/
 //运动单元
 function Speed(x, y) {
 	this.x = x;
 	this.y = y;
 }
 Speed.prototype.run = function() {
 	console.log("跑起来");
 }

//着色单元
function Color(color) {
	this.color = color;
}
Color.prototype.canvas = function() {
	console.log("绘制色彩");
}

//变形单元
function Shape(sp) {
	this.shape = sp;
}
Shape.prototype.transform = function() {
	console.log("变化形状");
}

//说话单元
function Speak(wd) {
	this.word = wd;
}
Speak.prototype.say = function() {
	console.log("书写字体");
}

/*我们想创建一个球类，它可以运动和着色*/
function Ball(x, y, clr) {
	this.speed = new Speed(x, y);
	this.color = new Color(clr);
}
Ball.prototype.init = function() {
	this.speed.run();
	this.color.canvas();
}

var ball = new Ball(10,15, "red");
ball.init();

/*我们想创建一个精灵，会运动、可以着色、能改变形状*/
function Spirite(x, y, clr, sp) { 
	this.speed = new Speed(x, y);
	this.color = new Color(clr);
	this.shape = new Shape(sp);
}
Spirite.prototype.init = function() {
	this.speed.run();
	this.color.canvas();
	this.shape.transform();
}

var spirite = new Spirite(20,30, "red", "square");
spirite.init();