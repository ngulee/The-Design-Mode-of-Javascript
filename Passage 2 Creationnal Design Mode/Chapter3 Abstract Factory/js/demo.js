
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-23
 *****/
 /*Abstract Factory:通过对类的工厂抽象，使其用对对产品族类的业务创建，不负责某一类产品的创建*/
 //Step 1 抽象类

 //汽车抽象类，当使用其实例实例对象的方法时会抛出错误
 var Car = function() {};
 Car.prototype = {
 	getPrice() {
 		return new Error("抽象方法不能调用");
 	},
 	getSpeed() {
 		return new Error("抽象方法不能调用");
 	}
 }

 //Step 2 抽象工厂方法
 var VehicleFactory = function(subType, superType) {
 	//判断抽象工厂中是否有该抽象类
 	if(typeof VehicleFactory[superType] == "function") {
 		//缓存类
 		function F() {};
 		//继承父类属性和方法
 		F.prototype = new VehicleFactory[superType]();
 		//将子类constructor指向子类
 		subType.constructor = subType;
 		//子类原型继承父类
 		subType.prototype = new F();
 	}else {
 		//不存在该抽象类抛出错误
 		throw new Error("为创建该抽象类")
 	}
 }

 //小汽车抽象类
 VehicleFactory.Car = function() {
 	this.type = "car";
 }
 VehicleFactory.Car.prototype = {
 	getPrice() {
 		return new Error("抽象方法不能调用");
 	},
 	getSpeed() {
 		return new Error("抽象方法不能调用");
 	}
 }

 //公交车抽象类
 VehicleFactory.Bus = function() {
 	this.type = "bus";
 }
 VehicleFactory.Bus.prototype = {
 	getPrice() {
 		return new Error("抽象方法不能调用");
 	},
 	getSpeed() {
 		return new Error("抽象方法不能调用");
 	}
 }

 //货车抽象类
 VehicleFactory.Truck = function() {
 	this.type = "truck";
 }
 VehicleFactory.Truck.prototype = {
 	getPrice() {
 		return new Error("抽象方法不能调用");
 	},
 	getSpeed() {
 		return new Error("抽象方法不能调用");
 	}
 };

 //Step 3 抽象与实现
 //宝马汽车子类
 var BMW = function(price, speed) {
 	this.price = price;
 	this.speed = speed;
 }
 //抽象工厂实现对Car抽象类的继承
 VehicleFactory(BMW, "Car");
 BMW.prototype.getPrice = function() {
 	return this.price;
 };
 BMW.prototype.getSpeed = function() {
 	return this.speed;
 };

 //兰博基尼车子类
 var Lamborhini = function(price, speed) {
 	this.price = price;
 	this.speed = speed;
 }
 //抽象工厂实现对Car抽象类的继承
 VehicleFactory(Lamborhini, "Car");
 Lamborhini.prototype.getPrice = function() {
 	return this.price;
 };
 Lamborhini.prototype.getSpeed = function() {
 	return this.speed;
 };

 //宇通汽车子类
 var YUTONG = function(price, speed) {
 	this.price = price;
 	this.speed = speed;
 }
 //抽象工厂实现对Bus抽象类的继承
 VehicleFactory(YUTONG, "Bus");
 YUTONG.prototype.getPrice = function() {
 	return this.price;
 };
 YUTONG.prototype.getSpeed = function() {
 	return this.speed;
 };

 //奔驰汽车子类
 var BenzTruck = function(price, trainLoad) {
 	this.price = price;
 	this.trainLoad = trainLoad;
 }
 //抽象工厂实现对Bus抽象类的继承
 VehicleFactory(BenzTruck, "Bus");
 BenzTruck.prototype.getPrice = function() {
 	return this.price;
 };
 BenzTruck.prototype.trainLoad = function() {
 	return this.trainLoad;
 };

 var truck = new BenzTruck(1000000,1000);
 console.log(truck.getPrice());
 console.log(truck.type);