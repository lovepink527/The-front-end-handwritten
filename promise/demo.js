const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED' 

function resolvePromise(x,promise2,resolve,reject){
    if(x === promise2){
        throw Error('不用自己等待自己')
    }
    if(typeof x === 'object' && x !== null || typeof x === 'function'){
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x,(y)=>{
                    resolve(y)
                },(r)=>{
                    reject(r)
                })
            }else{
                resolve(x)
            }
        }catch(e){
            reject(e)
        }
    }else{
        resolve(x)
    }
}

class MyPromise {
    constructor(executor){
        this.status = PENDING
        this.value = null
        this.reason = null
        this.onresolvedcallbacks = []
        this.onrejectedcallbacks = []
        const resolve = (value) =>{
            if(this.status == PENDING){
                this.status = FULFILLED
                this.value = value
                this.onresolvedcallbacks.forEach(cb => cb(value))
            }
        }
        const reject = (reason) =>{
            if(this.status == PENDING){
                this.status = REJECTED
                this.reason = reason
                this.onrejectedcallbacks.forEach(cb => cb(reason))
            }
        }
        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        let promise2 = new promise2((resolve,reject)=>{
            if(this.status == FULFILLED){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(x,promise2,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status == REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(x,promise2,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status == PENDING){
                this.onresolvedcallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(x,promise2,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.onrejectedcallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(x,promise2,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }
}
// 实例方法
MyPromise.prototype.catch = function(reject){
    return this.then(null,reject)
}
MyPromise.prototype.finally = function(cb){
    return this.then((value)=>{
        return MyPromise.resolve(cb()).then(()=>{
            return value
        })
    },(err)=>{
        return MyPromise.resolve(cb()).then(()=>{
            throw err
        })
    })
}
// 静态方法  all allSettled race any resolve reject
MyPromise.prototype.all = function(list){
    let len = list.length
    let result = []
    let count = 0
    return new Promise((resolve,reject)=>{
        for(let p of list){
            Promise.resolve(p).then(res =>{
                result[count] = res
                count++
                if(count === len){
                    resolve(result)
                }
            }).catch(e => {
                reject(e)
            })
            
        }
    })
}
MyPromise.prototype.allSettled = function(list){
    let len = list.length
    let result = []
    let count = 0
    return new Promise((resolve,reject)=>{
        for(let p of list){
            Promise.resolve(p).then(res =>{
                result[count] = {
                    status: 'fulfiled',
                    value: res
                }
                count++
                if(count === len){
                    resolve(result)
                }
            }).catch(e => {
                result[count] = {
                    status: 'rejected',
                    value: e
                }
                count++
                if(count === len){
                    reject(result)
                }
            })
            
        }
    })
}
MyPromise.prototype.any = function(list){
    let len = list.length
    let result = []
    let count = 0
    return new Promise((resolve,reject)=>{
        for(let p of list){
            Promise.resolve(p).then(res =>{
                resolve(res)
            }).catch(e => {
                result[count]= e;
                count++
                if(count === len){
                    reject(result)
                }
            })
            
        }
    })
}

MyPromise.prototype.race = function(list){
    let len = list.length
    let result = []
    let count = 0
    return new Promise((resolve,reject)=>{
        for(let p of list){
            MyPromise.resolve(p).then((value)=>{
                resolve(value)
            },(err)=>{
                reject(err)
            })
        }
    })
}