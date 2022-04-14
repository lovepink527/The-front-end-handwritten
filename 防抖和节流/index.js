// 节流
function throttle(fn, delay) {
    let flag = true,
        timer = null
    return function(...args) {
        let context = this
        if(!flag) return
        
        flag = false
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context,args)
            flag = true
        },delay)
    }
}
function throttle2(fn, delay) {
    let start = Date.now();
    return function() {
        let that = this;
        let args = arguments;
        //  获取当前时间，通过 当前时间 - 起点时间 =  时间差，，， 判断 时间差和 delay的关系
        let diff = Date.now() - start
        if (diff > delay) {
            fn.apply(that, args)
                // 初始化时间
            start = Date.now()
        }
    }
}
function throttle3(func, delay, timestamp=true) {
    let timer = null
    let pre = 0
    return function() {
      const context = this
      const args = arguments
      if(timestamp) {
        let now = Date.now()
        if(now - pre > delay) {
          pre = now
          //func.apply(context, args)
          func.call(context, ...args)
        }
      } else {
        if(!timer) {
          timer = setTimeout(() => {
            timer = null;
            // func.apply(context, args);
            func.call(context, ...args);
          }, delay)
        }
      }
    }
  }

// 防抖
function debounce(fn, delay) {
    let timer = null
    return function(...args) {
        let context = this
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(context,args)
        },delay)
    }
}

function fangdou(args){
    console.log('防抖' + args)
}

// var a = debounce(fangdou,3000)
// a(123)
// a(123)
// a(123)
function throttle(fn, delay) {
    let flag = true,
        timer = null
    return function(...args) {
        let context = this
        if(!flag) return
        flag = false
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context,args)
            flag = true
        },delay)
    }
}
function jieliu(args){
    console.log('节流' + args)
}
var b = throttle(jieliu,3000)
b(456)


