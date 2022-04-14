// call、apply、bind使用
var x = {
    x :  "window_x"
};
var obj = {
    x : "obj_x",
    fn : function(...args){
        console.log(this.x + " ; " + args);
    }
}

//访问obj的fn
obj.fn(1)
//把obj的fn单独拿出来
var fn = obj.fn
//call的用法是参数往后加（obj,1,3,4）
fn.call(obj,1)
//apply的区别是参数是数组
fn.apply(obj,[1])
//bind的区别是返回需要用的函数，可以赋值
var bfn = fn.bind(obj)
bfn(1)


//外部调用obj内部方法用call、apply、bind
obj.fn.call(x,1)
obj.fn.apply(x,[1])
var xobjfn = obj.fn.bind(x)
xobjfn(1)

//--------------------------------------------------------------------------------------------------

// call、apply、bind手写

// 不覆盖原生call方法，起个别名叫myCall，接收this上下文context和参数params
Function.prototype.myCall = function (context, ...params) {
    // context必须是个对象并且不能为null，默认为window
    const _this = typeof context === "object" ? context || window : window;
    // 为了避免和原有属性冲突，定义一个Symbol类型的属性
    const key = Symbol();
    // call方法的目的是改变函数的this指向，函数的this指向它的调用者，也就是说我们的目标是改变函数的调用者。
    // 下面的this就是函数本身，给_this增加一个名为[key]的方法指向this，就能用_this来调用this了
    _this[key] = this;
    const result = _this[key](...params);
    // 获取函数执行结果后，删除以上添加的属性
    delete _this[key];
    return result;
  };

function show(args){
    console.log('看到啦'+ args)
}

function a() {}

Function.prototype.luckcall = function(context,...args){
    const _this = typeof context === 'object' || 'function' ? context : window
    const key = Symbol()
    _this[key] = this
    const result = _this[key](...args)
    delete _this[key]
    return result
}

Function.prototype.luckapply = function(context,args){
    return this.luckcall(context,...args)
}

Function.prototype.luckbind = function(context,...args1){
    const _this = this;
    // 返回的函数也能接收参数，但是是放在params后面
    return function(...args2){
        return _this.luckcall(context,...[...args1,...args2])
    }
}

show.luckcall(a,111)
show.luckapply(a,[111])
var showfn = show.luckbind(a)
showfn(111)