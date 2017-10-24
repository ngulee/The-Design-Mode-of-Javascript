
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-24
 *****/
 /*Builder:将一个复杂对象的构建层与表示层分离，
 同样的构建过程可用不同的方法表示*/

 //Step 1 创建一位人类
 var Human = function(param) {
 	//技能
 	this.skill = param && param.skill || "保密";
 	//兴趣爱好
 	this.hobby = param && param.hobby || "保密";
 }

 //人类原型方法
 Human.prototype = {
 	getSkill() {
 		return this.skill;
 	},
 	getHobby() {
 		return this.hobby;
 	}
 }

 //实例化姓名类
 var Named = function(name) {
 	var that = this;
 	//构造器 构造函数解析姓名的姓与名
 	(function(name, that) {
 		that.wholeName = name;
 		if(name.indexOf(" ") > -1) {
 			that.FirstName = name.slice(0, name.indexOf(" "));
 			that.SecondeName = name.slice(name.indexOf(" "));
 			//or 
 			/*var temp = name.split(" ");
 			that.FirstName = temp[0];
 			that.SecondeName = temp[1];*/
 		}
 	})(name, that)
 }
 //实例化职业类
 var Work = function(work) {
 	var that = this;
 	//构造器 构造函数中通过传入的职位特征来设置相应职位及描述
 	(function(work, that) {
 		switch(work) {
 			case 'code':
 			  that.work = "工程师";
 			  that.workDescript = '每天沉醉于编程';
 			  break;
 			case 'UI':
 			case 'UE':
 			  that.work = "设计师";
 			  that.workDescript = "设计更似一种艺术";
 			  break;
 			case "teach":
 			  that.work = "教师";
 			  that.workDescript = "分享也是一种快乐";
 			  break;
 			default :
 			  that.work = work;
 			  that.workDescript = "对不起，我们还不清楚您所选职位的相关描述";
 		}
 	})(work, that)
 }

 //更换期望职位
 Work.prototype.changeWork = function(work) {
 	this.work = work;
 }
 //添加对职位的描述
 Work.prototype.changeDescript = function(setence) {
 	this.workDescript = setence;
 }

 /****
  *应聘者建造者
  *参数 name：姓名(全名)
  *参数 work:期望职位
  ****/

  var Person = function(name, work) {
  	//创建应聘者缓存对象
  	var _person = new Human();
  	_person.name = new Named(name);
  	_person.work = new Work(work);
  	//将穿件的应聘者对象返回
  	return _person;
  }

  var person1 = Person("Li zuoxing", "code");
  console.log(person1.name.FirstName);
  console.log(person1.work.work);
  console.log(person1.work.workDescript);
  person1.work.changeWork("工程师1")
  person1.work.changeDescript("每天沉醉于编程1");
  console.log(person1.work.work);
  console.log(person1.work.workDescript);