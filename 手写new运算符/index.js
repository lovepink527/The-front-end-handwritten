function Dog(name){
    this.name = name
}
Dog.prototype.sayName = function(){
    console.log(this.name)
}
var dog = new Dog('小狗')
dog.sayName()

// 上面是本身Dog
function _new(fn,...args){   // ...args为ES6展开符,也可以使用arguments
    //先用Object创建一个空的对象,
    const obj = Object.create(fn.prototype)  //fn.prototype代表 用当前对象的原型去创建
    //现在obj就代表Dog了,但是参数和this指向没有修改
    const rel = fn.apply(obj,args)
    //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
    return rel instanceof Object ? rel : obj
}

var _newDog = _new(Dog,'这是用_new出来的小狗')
_newDog.sayName()

// new的具体步骤
// 创建一个空对象 var obj = {}
// 修改obj.__proto__=Dog.prototype
// 只改this指向并且把参数传递过去,call和apply都可以
// 根据规范，返回 null 和 undefined 不处理，依然返回obj