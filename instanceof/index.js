// instanceof的使用
let person = function(){
    
}
let no = new person()
no instanceof person//true

// 原生代码

function new_instance_of(leftVaule, rightVaule) { 
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
            return false;	
        }
        if (leftVaule === rightProto) {
            return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}

let person2 = function(){

}

let yes = new person2()
console.log(new_instance_of(yes,person2))
