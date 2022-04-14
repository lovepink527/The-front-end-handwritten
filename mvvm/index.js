/*var data = {
	a:1
}
var dep = [] //收集消息，消息中心
var target = null //订阅者或者叫做观察者
Object.defineProperty(data,'a',{
	get: function(){
		dep.push(target)
	},
	set: function(newVal){
		for(var i = 0;i<dep.length;i++){
			dep[i]()
		}
	}
})
function watch(exp,fn){
	target = fn
	data[exp]
}
watch('a',function(){
	console.log('我是监听a改变的函数')
})
data.a = 2*/
//几个问题
// 1. 我们现在访问不到a,并且a的值需要_a暂存
// 2. 目前只做啦一个数据的收集工作
// 3. 如果再次访问属性的时候就会重复收集依赖
var data = {
	a:1,
	b:2
}
for(var key in data){
	(function(key){
		var dep = [];
		var value = data[key]
		object.defineProperty(data,key,{
			get:function(){
				for(var i = 0;i < dep.length;i++){
					if(dep[i]===target){
						return value
					}
				}
				dep.push(target)
				return value
			},
			set: function(newVal){
				if(newVal !== value){
					value = newVal
					for(var i =0;i < dep.length; i++){
						dep[i]();
					}
				}
			}
		})
	})()
}
//var dep = [] //收集消息，消息中心
var target = null //订阅者或者叫做观察者
/*Object.defineProperty(data,'a',{
	get: function(){
		dep.push(target)
	},
	set: function(newVal){
		for(var i = 0;i<dep.length;i++){
			dep[i]()
		}
	}
})*/
function render(){
	document.write(`<div><h3>想显示一些文案`+ data.a +`</h3></div>`)
}
function watch(exp,fn){
	target = fn
	if(typeof exp === 'function'){
		exp()
		return
	}
	data[exp]
}
//watch('a',render)
watch(render,render)
data.a = 2
data.b = 3