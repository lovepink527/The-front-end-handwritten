// 回去自己实现以下 防抖、节流、反柯里化 (让函数的作用范围变大)

// 高阶函数中包含柯里化函数的（柯里化函数就是一个高阶函数）
// 柯里化的含义就是让一个函数变的更具体一些(原则上返回的函数只能接受一个参数)
// 偏函数：返回一个函数，函数的参数不止一个

// function sum(a,b){
//     return function(c,d){
        
//     }
// }
// sum(1,2)(3,4)

// 1.判断一个数据的类型
// 判断函数类型有几种方法： typeof,Object.prototype.toString,instanceof,constructor
function isType2(type){
    return function(value){
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}

let type = isType2
let isString  = isType2('String')
let isNumber  = isType2('Number')
let flag1 = isString('abc')
console.log(flag1,'柯里化')

// ------------------------------------------------------------------------------------------
function isType(type,value){
    console.log(type,value)
    return Object.prototype.toString.call(value) === `[object ${type}]`
}
let flag = isType('String','abc')
console.log(flag,'判断类型')
const curring2 = (fn) => {
    // 存储用户调用的参数
    const inner = (...args) =>{
        // 每次都用一个新的数组 + 自己的参数
        return args.length >= fn.length ?
        fn(...args) :  (...arg) =>{
            return inner(...args,...arg)
        }
    }
    return inner
}
let type2 = curring2(isType)
let isString2 = type2('String')
let flag3 = isString2('134')
console.log(flag3)
let isNumber2 = type2('Number')
let flag4 = isNumber2(123)
console.log(flag4)

// ---------------------------------------------------------------------------------------------
// 高阶函数可以暂存变量 （内部有闭包）

//通用的柯里化函数 就是根据调用的时候传递的参数，和函数的参数做判断，如果传递的参数和定义的参数一致，就让函数执行
const curring = (fn) => {
    let args = [] //存储用户调用的参数
    // 如果传递的参数个数大于定义的参数 就让原函数执行，如果不是就返回一个函数
    const inner = (...arr) =>{
        args.push(...arr)
        return args.length >= fn.length ? fn(...args) : (...args)=> inner(...args)
    }
    return inner
}
function sum(a,b,c,d,e){
    return a+b+c+d+e
}
let newSum = curring(sum)
let fn1 = newSum(1,2)
let fn2 = fn1(3,4)
let r = fn2(5)
console.log(r,'结果')