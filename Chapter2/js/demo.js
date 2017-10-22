/*SChapter 2 面向对象编程*/

/*Step 1 创建一个类*/

// 在对象内部通过this变量添加属性和方法
var Book = function(bookName, id, price) {
	this.bookName = bookName;
	this.id = id;
	this.price = price;
}

// 在对象原型上添加属性和方法
Book.prototype = {
	display() {
		//展示这本书
	}
};


/*Step 2 */
/*私有属性和私有方法，特权方法，对象共有属性和对象公有方法，构造器*/
var Book1 = function(id, name, price) {
	//私有属性
	var num = 1;
	//私有方法
	function checkId() {

	};

	//特权方法
	this.getName = function() {};
	this.getPrice = function() {};
	this.setName = function(){};
	this.setPrice = function() {};
	//公有属性
	this.id = id;
	//公有方法
	this.copy = function() {};
	//构造器
	this.setName(name);
	this.setPrice(price);
}

//类静态共有属性
Book1.isChinese = true;

//类静态公有方法

Book1.resetTime = function() {
	console.log("new Time")
}

Book1.prototype = {
	//共有属性
	isJSBook: true,
	//公有方法
	display() {

	}
};


/*Step 3 将类的静态变量通过闭包来实现 */

var Book3 = (function() {
	//私有静态变量
	var bookNum = 0;
	//静态私有方法
	function checkBook(name) {

	};
	//返回构造函数
	return function(newId, newName, newPrice) {
		//私有变量
		var name, price;
		//私有方法
		function checkID(id) {};
		//特权方法
		this.getName = function() {};
		this.getPrice = function() {};
		this.setName = function() {};
		this.setPrice = function() {};
		//共有属性
		this.id = newId;
		//公有方法
		this.copy = function() {};
		bookNum++;
		if(bookNum > 100) {
			throw new Error("我们仅仅出版了100本书");
		};
		//构造器
		this.setName(name);
		this.setPrice(price);
	};
})();

Book3.prototype = {
	//静态公有属性
	isChinese:false,
	//静态私有属性
	display() {
		return "display"
	}
}

var book3 = new Book3()
console.log(book3.display());

/*Step 4 安全模式 */

var Book4 = function(title, type, time) {
	if(this instanceof Book4) {
		this.title = title;
		this.type = type;
		this.time = time;
	}else {
		return new Book4(title, type, time);
	}
}


/*Step 5 继承 ——类式继承*/
//1 声明父类
function SuperClass() {
	this.superValue = true;
}
//2 为父类添加共有方法
SuperClass.prototype.getSuperValue = function() {
	return this.superValue;
}

//3 声明子类
function SubClass() {
	this.subValue = false;
}

//4 继承父类:通过原型，子类继承了父类静态私有变量和共有变量,无法继承静态共有变量
SubClass.prototype = new SuperClass();

//5 为子类添加共有方法
SubClass.prototype.getSubValue = function () {
	return this.subValue;
}
var sub = new SubClass();
console.log(sub.superValue);
console.log(sub.getSuperValue());
console.log(sub.getSubValue());
/***
 *类式继承的缺点
 *父类共有属性中如果存在引用类型，子类的其中一个实例修改了该共有属性，则会显现在所有实例中；
 *由于子类实现的继承是靠其原型prototype对父类的实例实现的，因此在创建父类的时候，时无法向
 *父类专递参数的，因而在实例化父类的时候也无法对父类构造函数的属性进行初始化；
 */


/*Step 6 继承 ——构造函数继承*/
//1 声明父类
function SuperClass2(id) {
	//引用类型共有属性
	this.books = ["Javascript", "html", "css"];
	//值类型共有属性
	this.id = id;
};

//2 父类声明原型方法
SuperClass2.prototype.showBooks = function() {
	console.log(this.books)
};

//3 声明子类
function SubClass2(id) {
	//继承父类---该方法继承不涉及原型，因此只能继承父类中非原型中的共有属性和方法
	SuperClass2.call(this, id);
};

//4 创建第一个子类实例
var instance1 = new SubClass2(10);

//5 创建第一个子类实例
var instance2 = new SubClass2(11);
console.log(instance1.books);
instance1.books.push("Java");
console.log(instance1.books);
console.log(instance2.books);


/*Step 7 继承 ——组合式继承:在子类构造函数内执行父类构造函数，在子类原型上实例化父类*/
//1 声明父类
function SuperClass3(name) {
	//值类型共有属性
	this.name = name;
	//引用类共有属性
	this.books = ["Javascript", "html", "css"];
};
//2 父类原型共有方法
SuperClass3.prototype.getName = function() {
	console.log(this.name);
}

//3 声明子类
function SubClass3(name, time) {
	//构造函数式继承父类name与books属性
	SuperClass3.call(this, name);
	//子类中新增共有属性
	this.time = time;
}

//类式继承：子类原型继承父类
SubClass3.prototype = new SuperClass3();
//新增子类原型方法
SubClass3.prototype.getTime = function() {
	console.log(this.time);
};
console.log("------组合继承------");
var instance31 = new SubClass3("name31", "2017-10");
var instance32 = new SubClass3("name32", "2017-11");
console.log(instance31.books);
instance31.books.push("Java");
console.log(instance31.books);
console.log(instance32.books);
console.log(instance32.time);

/*Step 8 洁净的继承者 ——原型式继承*/
function inheritObject(o) {
	//声明一个过渡函数对象
	function F() {};
	//过渡对象的原型继承父类对象
	F.prototype = o;
	//返回一个对象的实例，该实例的原型继承了父对象
	return new F();
}

var book = {
	name: "js book",
	alikeBook: ["css book", "html book"]
};
console.log("------原型式继承------");
var newBook = inheritObject(book);
newBook.name = "ajax book";
newBook.alikeBook.push("xml book");

var otherBook = inheritObject(book);
otherBook.name = "flash book";
otherBook.alikeBook.push("as book");
console.log(newBook.name);
console.log(otherBook.name);
console.log(newBook.alikeBook);
console.log(otherBook.alikeBook);
/*缺点：和类式继承一样，父类中值类型的属性被复制，引用类型的属性被共享*/


/*Step 9 寄生式继承*/
//声明基对象
var book = {
	name: "js book",
	alikeBook: ["css book", "html book"]
};

function createBook(obj) {
	//通过原型式继承创建对象
	var o = new inheritObject(obj);
	//拓展对象
	o.getName = function() {
		console.log(name);
	}

	return o;
}

/*Step 10 寄生组合式继承*/
/***
 *寄生式继承 继承原型
 *传递参数 subClass    子类
 *传递参数 superClass  父类
 **/

 function inheritPrototype(subClass, superClass) {
 	//复制一份父类的原型副本保存在变量中
 	var p = inheritObject(superClass.prototype);
 	//修正因为重写子类原型导致子类的constructor属性被修改
 	p.constructor = subClass;
 	//设置子类的原型
 	subClass.prototype = p;
 };
 //测试
 //1 定义父类
 function SuperCass4(name) {
 	this.name = name;
 	this.colors = ["red", "blue", "green"];
 };
 //2 定义父类原型方法
 SuperCass4.prototype.getName = function() {
 	console.log(this.name);
 }

 //3 定义子类
 function SubClass4(name, time) {
 	//构造函数式继承
 	SuperCass4.call(this, name);
 	//子类新增属性
 	this.time = time;
 }

 //寄生式继承父类原型
 inheritPrototype(SubClass4, SuperCass4);
 //子类新增原型方法
 SubClass4.prototype.getTime = function() {
 	console.log(this.time);
 };
console.log("------寄生组合式继承------");
 var instance41 = new SubClass4("name31", "2017-01");
 var instance42 = new SubClass4("name32", "2017-02");
 instance41.colors.push("black");
 console.log(instance41.colors);
 console.log(instance42.colors);
 instance42.getName();
 instance42.getTime();

 /*Step 11 多继承*/
 //单继承：对象属性继承方法extend
 var extend = function(target, source) {
 	//遍历源对象中的属性
 	for ( var property in source) {
 		//将源对象中的属性复制到目标对象中
 		target[property] =  source[property];
 	}
 	//返回目标对象
 	return target;
 };
 //多继承1：对象属性继承方法mix
 var mix1 = function() {
 	var i = 1,                     //第二个参数起为被继承的对象
 		len = arguments.length,    //获取参数长度
 		target = arguments[0],     //第一个对象为目标对象
 		arg;					   //缓存参数对象
 	//遍历被继承的对象
 	for(; i < len; i++)	 {
 		//缓存当前对象
 		arg = arguments[i];
 		for (var property in arg) {
 			target[property] = arg[property];
 		}
 	}
 	//返回目标对象
 	return target;
 }
 //多继承2：将多继承方法绑定到原生Object对象上
 Object.prototype.mix2 = function() {
 	var i = 0,                     //第二个参数起为被继承的对象
 		len = arguments.length,    //获取参数长度
 		target = arguments[0],     //第一个对象为目标对象
 		arg;					   //缓存参数对象
 	//遍历被继承的对象
 	for(; i < len; i++)	 {
 		//缓存当前对象
 		arg = arguments[i];
 		for (var property in arg) {
 			target[property] = arg[property];
 		}
 	}
 	//返回目标对象
 	return target;
 }

 /*Step 12 多态*/
 function add() {
 	//获取参数
 	var args = arguments,
 		len = args.length;
 	switch(len) {
 		case 0 :
 			return 10;
 		case 1 :
 			return 10 + args[0];
 		case 2 :
 			return args[0] + args[1];		
 	}
 };

console.log("------多态------");
console.log(add());
console.log(add(10));
console.log(add(10,20));