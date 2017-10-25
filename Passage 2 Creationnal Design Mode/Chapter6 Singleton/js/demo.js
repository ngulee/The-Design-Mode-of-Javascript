
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-25
 *****/
 /*Singleton:保证一个类只有一个实例，并提供一个访问他的全局接口*/

 /*Step 1 在JavaScript里，实现单例的方式有很多种，其中最简单的一个方式是使用对象
 字面量的方法，其字面量里可以包含大量的属性和方法：*/
 var Singleton = {
  property1:"something",
  property2:"other thing",
  method1() {
    console.log("method1");
  }
 }

 /*step2 如果以后要扩展该对象，你可以添加自己的私有成员和方法，然后使用闭包在其内
 部封装这些变量和函数声明。只暴露你想暴露的public成员和方法，样例代码如下：*/

 var Singleton =function(){
  /*这里声明私有属性和方法*/
  var privateVariable = "something private",
      that = this;
  function showPrivate() {
    console.log(privateVariable);
  }

  /*特权变量和方法(可以访问私有变量)*/
  return {
    publicMethod() {
      showPrivate();
    },
    publicVar: "the public can see this"
  }
 };

 var single = Singleton();
 single.publicMethod();

 /*Step 3 在使用时初始化*/

 var Singleton = (function(){
  var instantiated,
      privateVariable = "something private1111";

  function showPrivate() {
    console.log(privateVariable);
  }

  function init() {
    /*这里定义单例代码*/
    return {
      publicMethod() {
        showPrivate();
      },
      publicProperty: "publicProperty"
    };
  }
  return {
    getInstance() {
      if(!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  }
 })();

 var single = Singleton.getInstance().publicMethod();

 /*Step4 应用场景 */

 var SingletonTester = (function() {
    function Singleton(args) {
      //设置args变量为接收的参数或者为空（如果没有提供的话）
      var args = args || {};
      this.name = "SingletonTester";
      this.pointX = args.pointX || 10;
      this.pointY = args.pointY || 6;
    };
    //实例容器
    var instance,
        _static = {
          name: "SingletonTester",
          getInstance(args) {
            if(!instance) {
              return new Singleton(args);
            }
            return instance;
          }
        }
    return _static;
 })();

 var single = SingletonTester.getInstance();
 console.log(single.pointY);