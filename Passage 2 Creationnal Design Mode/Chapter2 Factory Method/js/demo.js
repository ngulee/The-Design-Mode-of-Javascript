/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-22
 *****/
 /*Factory:通过对产品类的抽象，使其创建业务主要负责创建多类产品的实例*/

 //安全模式创建的工厂类
 var Factory = function(type, content) {
 	if(this instanceof Factory) {
 		return this[type](content);
 	}else {
 		return new Factory(type, content);
 	}
 }

 //工厂原型中设置创建所有类型数据的基类
 Factory.prototype = {
 	Java(content) {
 		this.content = content;
 		(function(content) {
 			var div = document.createElement('div');
 			div.innerHTML = content;
 			div.style.color = "green";
 			document.getElementById("container").appendChild(div);
 		})(content);
 	},
 	Javascript(content) {
 		this.content = content;
 		(function(content) {
 			var div = document.createElement('div');
 			div.innerHTML = content;
 			div.style.colcr = "yellow";
 			document.getElementById("container").appendChild(div);
 		})(content);
 	},
 	PHP(content) {
 		this.content = content;
 		(function(content) {
 			var div = document.createElement('div');
 			div.innerHTML = content;
 			div.style.background = "green";
 			document.getElementById("container").appendChild(div);
 		})(content);
 	},
 	UI(content) {
 		this.content = content;
 		(function(content) {
 			var div = document.createElement('div');
 			div.innerHTML = content;
 			div.style.border = "1px solid red";
 			document.getElementById("container").appendChild(div);
 		})(content);
 	}
 }

 var data = [
 		{type:"Javascript", content:"Javascript 哪家强1"},
 		{type:"Java", content:"Java 哪家强"},
 		{type:"PHP", content:"php 哪家强"},
 		{type:"UI", content:"UI 哪家强"}
	];

for (var i = data.length - 1; i >= 0; i--) {
	Factory(data[i].type, data[i].content);
}