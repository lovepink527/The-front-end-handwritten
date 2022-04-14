// forEach

Array.prototype._forEach = function (fn, thisValue) {
    let arr = thisValue || this
    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }
    for (let i = 0; i < arr.length; i++) {
      fn.call(arr, arr[i], i, arr);
    }
}
 
let arr = [4, 9, 16, 25];
arr._forEach((item, i, arr) => {
    console.log('item:' + item + '  i: ' + i)
})

//map
Array.prototype._map = function (fn, thisValue) {
    let arr = thisValue || this
    let result = []
      if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }
    for (let i = 0; i < arr.length; i++) {
      let r = fn.call(arr, arr[i], i, arr)
      result.push(r)
    }
    return result
  }
   
  let arr = [4, 9, 16, 25];
  let result = arr._map((item) => {
      return item * 2
  })
   
  console.log(result) //[8, 18, 32, 50]
  console.log(arr) //[4, 9, 16, 25]

  //reduce
  Array.prototype._reduce = function (fn, initialValue) {
    let arr = this
      if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }
    if (!arr.length) {
      throw new TypeError('数组不能为空');
    }
    let result = initialValue || 0
    for (let i = 0; i < arr.length; i++) {
      result = fn.call(arr, result, arr[i], i, arr)
    }
    return result
  }
   
  let arr = [1, 2, 3, 4];
  function getSum(total, currentValue, currentIndex, arr) {
    return total + currentValue
  }
  let result = arr._reduce(getSum, 2)
  console.log(result) // 12

// filter
  Array.prototype._filter = function (fn, thisValue) {
    let arr = thisValue || this
    let result = []
    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }
    if (!arr.length) { // 空数组不处理 直接返回空数组
        return []
    }
    for (let i = 0; i < arr.length; i++) {
      if(fn.call(arr, arr[i], i, arr)) {
        result.push(arr[i])
      }
    }
    return result
}
 
let arr = [4, 9, 16, 25];
let result = arr._filter((item) => {
    return item > 10
})
console.log(result) // [16, 25]


//from
Array.prototype._from = function (object, mapFunction, thisValue) {
    let obj = thisValue || this
    let result = []
    // 没有length属性 或者 length 为0的 直接返回空数组
    if (!object.length) {
        return result
    }
    if (typeof object === 'string') {
        result = object.split('')
    } else {
        object.forEach(item => result.push(item))
    }
    if (typeof mapFunction !== 'function') {
      throw new TypeError(mapFunction + ' is not a function');
    }
    return result.map(mapFunction, thisValue)
}

let r1 = Array.prototype._from([1, 2, 3], x => x * 10)
console.log(r1) // [10, 20, 30, 40]
let r2 = Array.prototype._from('1234', x => x * 10)
console.log(r2) // [10, 20, 30]
