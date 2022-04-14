// 高阶函数
// 一个函数的参数或者返回值是一个函数

function eat(...args){
    console.log('吃饭' ,args)
}

// 在开发的过程中我们不希望破坏原有的函数，要对这个函数进行扩展
// 我们希望对函数进行扩展

Function.prototype.before = function(beforeFn){
    // 如果谁调用方法this就指向谁
    return (...args)=>{ //newFn获取函数中的所有参数
        // 箭头函数this,就会向上查找
        beforeFn() //扩展函数
        this(...args)
    }
}

// before接受一个函数作为参数，那么before函数就是一个高阶函数
let newFn = eat.before(()=>{
    console.log('刷牙')
})

newFn('火腿肠')

// 以后扩展代码的时候，尽量不直接更改原来的函数，采用高阶函数进行包裹，在内部进行扩展

// 这里产生啦闭包吗？ 什么叫闭包，函数定义的作用域和执行的作用域不是同一个就会产生闭包
// 函数执行的时候产生的执行上下文，代码在定义的时候就确定啦作用域


