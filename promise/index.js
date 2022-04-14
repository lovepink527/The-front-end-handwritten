// Promise 为啦解决异步的编程问题
// 1.异步嵌套问题（异步回调）
// 2.并发操作获取最终的结果（同步异步的并发结果）
// promise 有三个状态 默认:等待 成功  失败

// 获取用户id  通过id拿到所在的部门

// 1.promise是一个类，用的时候就new这个类
// 2.promise中需要传入一个执行器executor,executor默认会立即执行
// 3.如果调用resolve会让状态变成成功态，调用reject会让状态变成失败态
// 4.new Promise会产生一个promise实例，promise实例拥有一个then方法，第一个参数是成功的回调，第二个参数是失败的回调
// 5.promise的状态一旦发生啦改变，就不会在发生变化啦
// 成功有成功的value,失败有失败的原有reason
// 6.如果new Promise中发生啦异常也会执行失败态
// 7.如果出现异步逻辑我们就采用发布订阅模式，缓存回调，发布时一次执行

let Promise = require('./promise')
let p = new Promise((resolve,reject)=>{
    // resolve('success')
    reject('err')
    // throw new Error('错啦')
    
})

// 1.promise为什么能.then .then .then() 返回的并不是this？ 一个promise一旦成功了就不能失败，如果不停的返回this，状态就没办法扭转
// 2.x ===  promise2 typeError
p.then(data=>{
    console.log(data,'成功')
},data=>{
    console.log(data,'失败')
    reject('sss')
}).then(data=>{
    console.log('成功2',data)
},data=>{
    console.log('失败2',data)
})

// 3.如果取then的时候出错了就抛异常，因为有可能人家的写的对象上定义了一个取then就出错的情况



