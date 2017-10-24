
/*****
 *Author:Li zuoxing
 *E-mail:ngulee@163.com
 *Time:2017-10-24
 *****/
 /*Prototype:用原型对象的实例指向创建的对象的实例，
 使用于创建新的对象的类共享原型对象的属性和方法*/
 //需求：网页焦点图的特效的研发

 //Step1 图片轮播类
 var LoopImages = function(imgArr, container) {
  this.imagesArray = imgArr;                 //轮播图片数组
  this.container = container;                //轮播图片容器
  this.createImage = function(){};           //创建轮播图片
  this.changeImage = function(){};           //切换下一张图片
 }

 //Step2 差异化实现

 //上下滑动切换类
 var SlideLoopImg = function(imgArr, container) {
    //构造函数继承图片轮播
    LoopImages.call(this, imgArr, container);
    //重写继承的切换下一张图片方法
    this.changeImage = function() {
      console.log("SlideLoopImg changeImage function");
    }
 }

 //渐隐切换类
 var FadeLoopImg = function(imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container);
    //切换箭头私有变量
    this.arrow = arrow;
    this.changeImage = function() {
      console.log("FadeLoopImg changeImage function");
    }
 }

 //Step3 实例化一个渐隐切换图片类
 var fadeImg = new FadeLoopImg([
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg"
  ],"slide",[
      "left.jpg",
      "right.jpg"
  ]);

 //Step 4 最优解决方案

 //1 图片类
 var LoopImages = function(imgArr, container) {
    this.imagesArray = imgArr;
    this.container = container;
 };

 LoopImages.prototype = {
  createImage() {
    console.log("LoopImages createImage function");
  },
  changeImage() {
    console.log("LoopImages changeImage function");
  }
 }

  //上下滑动切换类
 var SlideLoopImg = function(imgArr, container) {
    //构造函数继承图片轮播
    LoopImages.call(this, imgArr, container);
 }

 SlideLoopImg.prototype = new LoopImages();

 //重写继承的切换下一张图片方法
 SlideLoopImg.prototype.changeImage = function() {
  console.log("SlideLoopImg changeImage function")
 }

  //渐隐切换类
 var FadeLoopImg = function(imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container);
    //切换箭头私有变量
    this.arrow = arrow;
 }
 FadeLoopImg.prototype = new LoopImages();
 FadeLoopImg.prototype.changeImage = function() {
  console.log("FadeLoopImg changeImage function")
 }

 var fadeImg = new FadeLoopImg();
 fadeImg.changeImage();

 //原型的拓展
 LoopImages.prototype.getImageLength = function() {
  return this.imagesArray.length;
 }
 LoopImages.prototype.getContainer = function() {
  return this.container;
 }