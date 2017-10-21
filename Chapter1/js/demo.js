/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-21
 *****/


/*Step 1 函数*/
 //声明式函数
 function checkName() {
 	//验证姓名
 }

 function checkEmail() {
 	//验证邮箱
 }

 function checkPassWord() {
 	//验证密码
 }


//表达式函数
var checkName = function(){
 	//验证姓名
 }

 var checkEmail = function(){
 	//验证邮箱
 }

 var checkPassWord = function(){
 	//验证密码
 } 
 /***
  *缺点：增加全局变量，无法保证函数的安全性，容易被覆盖
  ***/

/*Step 2 */
//对象的方法写法
var CheckObject = {
	checkName: function(){
	 	//验证姓名
	},
	checkEmail:  function(){
	 	//验证邮箱
	},
	checkPassWord: function() {
		//验证密码
	}

}


//对象的另一种形式
var CheckObject = function() {};

CheckObject.checkName = function() {
	//验证姓名
}

CheckObject.checkEmail = function() {
	//验证邮箱
}

CheckObject.checkPassWord = function() {
	//验证密码
}


//真假对象
var CheckObject = function() {
	return {
		checkName: function(){
		 	//验证姓名
		},
		checkEmail:  function(){
		 	//验证邮箱
		},
		checkPassWord: function() {
			//验证密码
		}
	}
}

/*Step 3 */
//类也可以
function CheckObject() {
	this.checkName = function(){
	 	//验证姓名
	 	return this;
	};
	this.checkEmail = function(){
	 	//验证邮箱
	 	return this;
	};
	this.checkPassWord = function(){
	 	//验证密码
	 	return this;
	};
}


/*Step 4 */
//一各类检测

var CheckObject = function() {};
CheckObject.prototype = {
	checkName: function(){
	 	//验证姓名
	 	return this;
	},
	checkEmail:  function(){
	 	//验证邮箱
	 	return this;
	},
	checkPassWord: function() {
		//验证密码
		return this;
	}
}

/*Step 5 抽象一个统一添加方法的功能方法*/
Function.prototype.addMethod = function(fn_name, fn) {
	this[fn_name] = fn;
	return this;
}

//添加任何想要的方法

var methods = function() {};

//or

var methods =new Function();

methods.addMethod("checkName", function() {
	console.log("checkName");
	return this;
}).addMethod("checkEmail", function() {
	console.log("checkEmail");
	return this;
}).addMethod("checkPassWord", function() {
	console.log("checkPassWord");
	return this;
});
methods.checkName().checkEmail().checkPassWord();

