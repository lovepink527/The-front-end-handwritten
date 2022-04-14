const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REGECTED'
const resolvePromise = (x,promise2,resolve,reject) =>{
    // 处理x导致的promise2是成功还是失败
    // 如果x是普通值直接调用promise2和resolve
    // 如果x是一个promise那么就采用x的状态，并且将结果继续调用promise2的resolve和reject向下传递
    console.log(x,promise2,resolve,reject)
    if(x === promise2){
        return reject(new TypeError('不能自己等待自己完成，出错啦'))
    }
    if(typeof x === 'object' && x !== null || typeof x === 'function'){
        // 有可能是一个promise
        try{
            let then = x.then // 因为用户返回的可能有一个then属性，一取值就报错了
            if(typeof then === 'function'){ // 无法再细化了有then说明就是promise了
                then.call(x,(y)=>{
                    resolve(y)
                },(r)=>{
                    reject(r)
                })
            }else{
                resolve(x) // 直接x作为成功的结果
            }
        }catch(e){
            reject(e)
        }
    }else{ // 一定是一个普通得值，那么直接让这个promise变成成功态
        resolve(x)
    }

}
class Promise{
    constructor(executor){
        this.value= undefined
        this.reason = undefined
        this.status = PENDING
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = (value) =>{
            if(this.status == PENDING){
                this.value = value
                this.status = FULFILLED
            }
            
        }
        const reject = (reason) =>{
            if(this.status == PENDING){
                this.reason = reason
                this.status = REJECTED
            }
            
        }
        try{
            executor(resolve,reject)

        }catch(e){ // 如果执行时发生了异常就将异常作为失败的原因
            reject(e)
        }
        
    }
    then(onFulfilled,onRejected){
        // 链式调用的核心 就是处理x 和promise之间的关系
        let promise2 = new Promise((resolve,reject) =>{
            if(this.status == FULFILLED){
                // 用定时器为啦promise可以出来
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise((x,promise2,resolve,reject))
                    }catch(e){
                        reject(e)
                    }
                },0)
            }
            if(this.status == REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise((x,promise2,resolve,reject))
                    }catch(e){
                        reject(e)
                    }
                },0)
            }
            if(this.status == PENDING){
                // 这时用户没有调用成功或者失败 没有reject和resolve
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise((x,promise2,resolve,reject))
                        }catch(e){
                            reject(e)
                        }
                    },0)
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise((x,promise2,resolve,reject))
                        }catch(e){
                            reject(e)
                        }
                    },0)
                })
            }
        })
        return promise2
    }
}

module.exports = Promise