//创建一个链表，并为其添加一些方法——来自于《学习JavaScript数据结构与算法》
function LinkedList(){
    //定义一个节点
    var Node=function(element){
        this.element=element;
        this.next=null;
    };

    var length=0;
    var head=null;

    //向链表尾部追加元素，链表尾部元素的下一个元素始终为null
    this.append=function(element){
        //node元素被创建时，它的next指针始终为null
        var node=new Node(element);
        var current;

        //当head为null，说明是一个空链表
        if(head===null){
            head=node;
        }else{
            //链表不为空，因此需要找到尾部元素，尾部元素的下一个结点为null，因此需要找到下一个结点为null的元素
            current=head;

            //循环列表，直到找到最后一项
            while(current.next){
                current=current.next;
            }
            //找到最后一项，将其next赋值为node，建立链接
            current.next=node;
        }
        length++;   //更新链表长度
    };

    //向链表中的任意位置插入一个新的项
    this.insert=function(position,element){
        if(position >= 0 && position <= length){
            var node = new Node(element);
            var current = head, previous;
            var index = 0;

            if(position === 0){  //z在第一个位置添加
                node.next = current;
                head = node;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
        }else{
            return false;
        }
    };

    //从链表的特定位置移除一项
    this.removeAt=function(position){
        if(position>-1 && position<length){
            var current=head;
            var previous;
            var index=0;

            //移除第一项
            if(position===0){
                head=current.next;    //current.next=null
            }else{
                while(index++ <position){
                    previous=current;
                    current=current.next;
                }
                //将previous与current的下一项连接起来，跳过current，从而移除它
                previous.next=current.next;
            }
            length--;
            return current.element;
        }else{
            return null;
        }
    };

    //从链表中移除一项
    this.remove=function(element){
        var index = this.indexOf(element);
        return this.removeAt(index);
    }; 

    //返回元素在链表中的索引，不存在则返回-1
    this.indexOf=function(element){
        var current = head;
        var index = -1;
        while(current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };  

    //判断链表是否为空，为空返回true，有值返回false
    this.isEmpty=function(){
        return length === 0;
    }; 

    //返回链表包含的元素个数，与length属性类似
    this.size=function(){
        return length;
    };  
    // 返回头元素
    this.getHead = function(){
        return head;
    }
    
    //将LinkedList对象转换成一个字符串
    this.toString=function(){
        var current = head;
        var string =  '';
        while(current){
            string += current.element;
            current = current.next;
        }
        return string;
    };

    //函数的打印，将其转换为一个数组输出，与toString方法类似
    this.print=function(){
        var current = head;
        var array = [];
        while(current){
            array.push(current.element);
            current = current.next;
        }
        return array;
    };
}