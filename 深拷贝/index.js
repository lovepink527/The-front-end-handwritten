// 由于引用数据类型浅拷贝只能拷贝地址并没有重新拷贝地址里的内容
// 所以深拷贝需要拷贝所有引用数据类型的地址里的值
// 手写拷贝封装函数，支持date、正则，不支持function

function clone(obj){
    //如果不是引用输入类型或者为空则不需要深拷贝
    if(obj == null || typeof obj !== 'object'){
        return obj
    }
    //date拷贝
    if(obj instanceof Date){
        let cloneDate = new Date()
        cloneDate.setTime(obj.getTime())
        return cloneDate
    }
    // 正则
    if(obj instanceof RegExp){
        let RegExpClone = obj.constructor
        return new RegExpClone(obj)
    }
    // 数据或者对象
    if(obj instanceof Function || obj instanceof Object){
        let objFun = Array.isArray(obj) ?  [] : {}
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                objFun[key] = clone(obj[key])
            }
        }
        return objFun
    }
}

// 浅拷贝
let a = {name: '姜慧慧',other:{name: '123'}}
let b = a
a.name = 'wang'
console.log(a)
console.log(b)

//深拷贝1
let aa = {name: '姜慧慧',other:{name: '123'}}
let bb = JSON.parse(JSON.stringify(a))
aa.name = 'xixixi'
console.log(aa)
console.log(bb)

// 深拷贝2
let aaa = {name: '姜慧慧',other:{name: '123'}}
let bbb = clone(aaa)
aaa.name = 'hahahah'
console.log(aaa)
console.log(bbb)

// 正则拷贝
let reg = new RegExp("[bc]at", "i")
let reg2 = clone(reg)
reg.compile("d")
console.log(reg)
console.log(reg2)