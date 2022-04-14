// 1.构造继承
console.log('构造继承')
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    };
};
var person1 = new Person("bella", 23);
console.log(person1);

// 2.原型链继承
console.log('原型链继承')
function Dog (name) {
    this.name = name;
    this.type = 'Dog'; 
}
Dog.prototype.speak = function () {
　　console.log('wang')
}
var doggie = new Dog('jiwawa');
doggie.speak();  //wang 

// 3.组合继承
//在子类构造函数中调用执行父类构造函数，在子类原型上实例化父类就是组合继承继承模式
// 缺点：name和colors会有两份
// 一共执行了两次：new SuperType()
// 第一次：实现子类原型的类式继承时，调用了一次父类构造函数以获取实例。
// 第二次：子类构造函数内部调用父类构造函数时。
console.log('组合继承')
function SuperType(name) {
    this.name = name;
    this.colors = ["red","blue","green"];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name,age) {
    //继承属性
    SuperType.call(this,name);

    this.age = age;
}

//继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
    console.log(this.age);
};

var instance1 = new SubType("LiBai",50);
instance1.colors.push("black");
console.log(instance1.colors);//["red", "blue", "green", "black"]
instance1.sayName();//LiBai
instance1.sayAge();//50

var instance2 = new SubType("DUFu",60);
console.log(instance2.colors);//["red", "blue", "green"]
instance2.sayName();//DUFu
instance2.sayAge();//60

// 4.寄生式继承
//函数复用性差
console.log('寄生式继承')
function object(o){
    function F() {}
    F.prototype = o;
    return new F();
}
function createAnother(original){
    var clone = object(original);//通过调用函数创建一个新对象
    clone.sayHi = function () {//以某种方式来增强这个对象
        console.log("Hi");
    };
    return clone; //返回这个对象
}
var person = {
    name:"李白",
    friends:["杜甫","陆游"]
};

var anotherPerson = createAnother(person)
anotherPerson.sayHi();//Hi

// 5.组合寄生继承
console.log('组合寄生继承')
function SuperType (name) {
	this.name = name;
	this.colors = ["red", "green", "blue"];
}
SuperType.prototype.sayName = function () {
	console.log(this.name)
};
function SubType (name, age) {
	SuperType.call(this, name); 
	this.age = age;
}

// 下面这部分替代给子类原型赋值的过程，不调用父类构造函数，直接继承父类原型
var prototype = Object.create(SuperType.prototype);
prototype.constructor = SubType;
SubType.prototype  = prototype;

SubType.prototype.sayAge = function () {
	console.log(this.age)
}

var a = new SubType('姜慧慧',18)
a.sayAge()

// es6继承
//class 相当于es5中构造函数
//class中定义方法时，前后不能加function，全部定义在class的protopyte属性中
//class中定义的所有方法是不可枚举的
//class中只能定义方法，不能定义对象，变量等
//class和方法内默认都是严格模式
//es5中constructor为隐式属性
class People{
    constructor(name='wang',age='27'){
      this.name = name;
      this.age = age;
    }
    eat(){
      console.log(`${this.name} ${this.age} eat food`)
    }
  }
  //继承父类
  class Woman extends People{ 
     constructor(name = 'ren',age = '27'){ 
       //继承父类属性
       super(name, age); 
     } 
      eat(){ 
       //继承父类方法
        super.eat() 
      } 
  } 
  let wonmanObj=new Woman('xiaoxiami'); 
  wonmanObj.eat();
  
  //es5继承先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。 
  //es6继承是使用关键字super先创建父类的实例对象this，最后在子类class中修改this。
