
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-11-2
 *****/
 /*Composite:组合模式又称部分-整体模式，将对象组合成树状结构以表示“部分整体”的层次结构。
 组合模式使得用户对单个对象和组合对象的使用具有一致性*/

 /*需求：在新闻模块，有时需要添加一条文字新闻
                     有时需要添加一条带有图标直播的文字新闻
                     有时需要添加一条已经分类的文字新闻
                     有时需要将文字新闻和图片新闻放在一行*/


//step 1 定义一个虚类，让所有的新闻都继承这个虚类
var News = function() {
  //字组件容器
  this.children =[];
  //当前组件元素
  this.element = null;
}

News.prototype = {
  init:function() {
    throw new Error("请重写该方法");
  },
  add:function() {
    throw new Error("请重写该方法");
  },
  getElement:function() {
    throw new Error("请重写该方法");
  }
}

//step 2 
function inheritPrototype(subClass,superClass) {
  function inheritObject(obj) {
    function F(){};
    F.prototype = obj;
    return new F();
  };

  var p = inheritObject(superClass.prototype);

  p.constructor = subClass;

  subClass.prototype = p;

};

//step 3 容器类构造函数
var Container = function(id, parent) {
  //构造函数继承父类
  News.call(this);
  //模块id
  this.id = id;
  //模块的父容器
  this.parent = parent;
  //构建方法
  this.init();
}

//step 4 寄生式继承父类原型
inheritPrototype(Container, News);

//step 5 构建方法
Container.prototype.init = function() {
  this.element = document.createElement("ul");
  this.element.id = this.id;
  this.element.className = "new-container";
}

Container.prototype.add = function(child) {
  //在元素容器中插入元素
  this.children.push(child);
  //插入当前组件元素树中
  this.element.appendChild(child.getElement());
  return this;
}

//获取当前元素方法
Container.prototype.getElement = function() {
  return this.element;
}

//获取当前元素方法
Container.prototype.show = function() {
  return this.parent.appendChild(this.element);
}

//下一层级成员的集合类
var Item = function(classname) {
  News.call(this);
  this.classname = classname || "";
  this.init();
}

inheritPrototype(Item, News);

Item.prototype.init = function() {
  this.element = document.createElement("li");
  this.element.className = this.classname;
}

Item.prototype.add = function(child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}

Item.prototype.getElement = function() {
  return this.element;
}

var NewsGroup = function(classname) {
  News.call(this);
  this.classname = classname || "";
  this.init();
}
inheritPrototype(NewsGroup, News);

NewsGroup.prototype.init = function() {
  this.element = document.createElement("div");
  this.element.className = this.classname
}

NewsGroup.prototype.add = function(child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}

NewsGroup.prototype.getElement = function() {
  return this.element;
}


var Images = function(url, href, classname) {
  News.call(this);
  this.url = url || "";
  this.href = href || "#";
  this.classname = classname || "normal";
  this.init();
}

inheritPrototype(Images, News);

Images.prototype.init = function() {
  this.element = document.createElement("a");
  var img = new Image();
  img.className = "icon-img";
  img.src = this.url;
  this.element.appendChild(img);
  this.element.className = "image-news " + this.classname;
  this.element.href = this.href;
}

Images.prototype.add = function() {};
Images.prototype.getElement = function() {
  return this.element;
}

var Icons = function(text, href, classname) {
  News.call(this);
  this.text = text;
  this.href = href || "";
  this.classname = classname || "video";
  this.init();
}

inheritPrototype(Icons, News);

Icons.prototype.init = function() {
  this.element = document.createElement("a");
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = "icon " + this.classname;
}

Icons.prototype.add = function() {};
Icons.prototype.getElement = function() {
  return this.element;
}

var EasyNews = function(text, href) {
  News.call(this);
  this.text = text;
  this.href = href || "#";
  this.init();
}

inheritPrototype(EasyNews, News);

EasyNews.prototype.init = function() {
  this.element = document.createElement("a");
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = "text";
}

EasyNews.prototype.add = function() {};
EasyNews.prototype.getElement = function() {
  return this.element;
}

var TypeNews = function(text, href, classname, pos) {
  News.call(this);
  this.text = text;
  this.href = href || "#";
  this.classname = classname || "";
  this.pos = pos || "left";
  this.init();
}

inheritPrototype(TypeNews,News);
TypeNews.prototype.init = function() {
  this.element = document.createElement("a");
  if(this.pos == "left") {
    this.element.innerHTML = "[" + this.classname + "]" + this.text;
  }else {
    this.element.innerHTML = this.text + "[" + this.classname + "]";
  }
  this.element.href = this.href;
  this.element.className = "text";
}

TypeNews.prototype.add = function() {};
TypeNews.prototype.getElement = function() {
  return this.element;
}

/*新闻类都已经创建出来了，现在要是用，就可以通过add方法像一棵树一样一层一层创建新闻即可*/

var news1 = new Container("news-container",document.getElementById("news-module"));
console.log(news1);
news1.add(
  new Item("normal").add(
    new Icons("梅西不拿金球奖也伟大", "#", "video")
  )
).add(
  new Item("normal").add(
    new Icons("保护强国强队用意明显", "#", "live")
  )
).add(
  new Item("normal").add(
    new NewsGroup("has-img").add(
      new Images("./imgs/01.png","#","small")
    ).add(
      new EasyNews("从240斤的胖子成功变成型男&ensp;", "#")
    ).add(
      new EasyNews("五大雷人跑步机", "#")
    )
  )
).add(
  new Item("normal").add(
      new TypeNews(" AK47不愿为费城打球", "#", "NBA", "left")
    )
).add(
  new Item("normal").add(
      new TypeNews("火炮飚6 三分创新高 ", "#", "CBA", "right")
    )
).show();