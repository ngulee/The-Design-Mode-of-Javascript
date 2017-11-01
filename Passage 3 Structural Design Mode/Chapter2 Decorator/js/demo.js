
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-31
 *****/
 /*Decorator:在不改变原对象的基础上对其进行拓展(添加属性和方法)，
  使原有对象可以满足更加复杂的需求*/

/*例如：假设我们在编写一个飞机大战的游戏，随着经验值的增加，我们操作的飞机对象可以升级成
更厉害的飞机，一开始这些飞机只能发射普通的子弹，升到第二级时可以发射导弹，升到第三级
时可以发射原子弹*/

//方法1
//原始飞机
var Plan = function() {};
Plan.prototype.fire = function() {
  console.log("发射子弹");
}

//升到第二级
var MissileDecorator = function(plan) {
  this.plan = plan;
};
MissileDecorator.prototype.fire = function() {
  this.plan.fire();
  console.log("发射导弹");
}

//升级到第三级
var AtomDecorator = function(plan) {
  this.plan = plan;
}

AtomDecorator.prototype.fire = function() {
  this.plan.fire();
  console.log("发射原子弹");
}

new AtomDecorator(new MissileDecorator(new Plan())).fire();
//发射子弹
//发射导弹
//发射原子弹




//方法2 
var plan = {
  fire: function() {
    console.log("发射子弹");
  }
}

var missileDecorator = function() {
  console.log("发射导弹");
}

var atomDecorator = function() {
  console.log("发射原子弹");
}
console.log("11111");
plan.fire();//发射子弹

console.log("22222");
var fire1 = plan.fire;
plan.fire = function() {
  fire1();
  missileDecorator();
}
plan.fire();//发射子弹、发射导弹


console.log("33333");
var fire2 = plan.fire;
plan.fire = function() {
  fire2();
  atomDecorator();
}
plan.fire();//发射子弹、发射导弹、发射原子弹


//方法3 用AOP装饰函数

//前置装饰 新增方法在原法前面执行
var before = function(fn,beforeFn) {
  return function() {
    // beforeFn();
    beforeFn.apply(this, arguments)
    return fn.apply(this,arguments);
  }
}

//后置装饰 新增方法在原法后面执行
var after = function(fn,afterFn) {
  return function() {
    var tem = fn.apply(this,arguments);
    // afterFn();
    afterFn.apply(this, arguments);
    return tem;
  }
}

var a = after(function() {
  console.log("a1");
},function() {
  console.log("a2");
});
console.log(a)
a = after(a,function() {
  console.log("a3")
});
a()

