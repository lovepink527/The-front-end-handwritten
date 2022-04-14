function listNode(){
    // 新建节点
    var node = function(element){
        this.element = element
        this.next = null
    }
    var length = 0
    var head = null

    // 链表尾部添加节点
    this.append = function(element){
        let appendNode = new node(element)
        let cur = head
        // 需要考虑链表为空的情况
        if(cur == null){
            head = appendNode
        }else {
            while(cur.next){
                cur = cur.next
            }
            cur.next = appendNode
        }
        length++
    }
    // 链表固定位置添加节点
    // 1,2,3,5
    // position = 3  ndoe = 4
    // 0 < 3  1 < 3  2 < 3  3  < 3
    // pre = 1 cur =2   pre = 2 cur =3    pre = 3 cur =5
    this.positionAppend = function(position,element){
        if(position >= 0 && position <= length){
            let positionNode = new node(element)
            let cur = head,pre
            if(position == 0){
                positionNode.next = cur
                head = positionNode
            }else {
                let index = 0
                while(index < position){
                    pre = cur
                    cur = cur.next
                    index++
                }
                positionNode.next = cur
                pre.next = positionNode
                length++
            }
        }else {
            return false
        }
    }
    // 查找是否存在于链表
    this.indexof = function(element){
        let index = 0
        let cur = head
        while(cur){
            if(element === cur.element){
                return index
            }
            index++
            cur = cur.next
        }
        return -1
    }
    // 删除链表固定位置节点
    this.removeNode = function(postion){
        if(postion >= 0 && postion < length){
            let cur = head
            let pre = head
            let index = 0
            if(postion == 0){
                head = cur.next
            }else {
                while(index < postion){
                    pre = cur
                    cur = cur.next
                    index++
                }
                pre.next = cur.next
                length--
            }
        }else {
            return null
        }
    }
    // 遍历链表
    this.each =function(){
        let cur = head
        while(cur){
            console.log(cur)
            cur = cur.next
        }
    }
    // 返回倒数第k个z值
    this.endNumber = function(k){
        if(k<=0 || !head){
            return null
        }
        let low = head
        let fast = head
        for(i=0;i< k-1; i++){
            fast = fast.next
            if(fast == null){
                return null
            }
        }
        while(fast.next != null){
            low = low.next
            fast = fast.next
        }
        console.log(low)
        return low
    }
    // 删除链表里的指定值
    this.removeVal = function(val){
        console.log(val,'指定值')
        let cur = head
        let pre = null
        let curHead = head
        if(cur.element == val){
            curHead = cur.next
            return curHead
        }
        while(cur != null){
            pre = cur
            cur = cur.next
            if(cur.element == val){
                pre.next = cur.next
                return curHead
            }
        }
    }
    // 删除重复元素
    this.setDelete = function(){
        let p = head
        let pre = null
        while(p){
            console.log('执行')
            if(p.element == p.next.element){
                if(p == head || p == head.next){
                    head = p.next.next
                }
                pre.next = p.next.next
                p = p.next.next 
            }
            pre = p
            p = p.next
        }
        console.log(head)
    }
}

let a = new listNode()
a.append(1)
a.append(2)
a.append(3)
a.append(3)
a.append(3)
a.append(3)
a.append(3)
a.setDelete()


