class node{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

class binaryTree {
    constructor(){
        this.root = null
    }
    insert (key){
        let newNode = new node(key)
        if(this.root == null){
            this.root = newNode
        }else {
            this.inOrderTraversNode(newNode,this.root)
        }
    }
    inOrderTraversNode(newNode,root){
        // 左侧插入
        if(newNode.key < root.key){
            // 左侧是否有空位
            if(root.left == null){
                root.left = newNode
            }else {
                this.inOrderTraversNode(newNode,root.left)
            }
        }else {
            if(root.right == null){
                root.right = newNode
            }else {
                this.inOrderTraversNode(newNode,root.right)
            }
        }
    }
    // 先序遍历
    preOrder(root){
        // 根节点
        if(root !== null){
            console.log(root.key)
            this.preOrder(root.left)
            this.preOrder(root.right)
        }
    }
    inOrder(root){
        if(root !== null){
            this.inOrder(root.left)
            console.log(root.key)
            this.inOrder(root.right)
        }
    }
    postOrder(root){
        if(root != null){
            this.postOrder(root.left)
            this.postOrder(root.right)
            console.log(root.key)
        }
    }
    // 最小的树
    getMin(){
        let current = this.root
        while(current.left !== null){
            current = current.left
        }
        console.log(current.key)
    }
    // 最大的树
    getMax(){
        let current = this.root
        while(current.right !== null){
            current = current.right
        }
        console.log(current.key)
    }
    // 寻找某个值
    find(data){
        let current = this.root
        while(current !== null){
            if(current.key == data){
                console.log(current)
                return current
            }else if(current.key > data){
                current = current.left
            }else if(current.key < data){
                current = current.right
            }
        }
        console.log('没找到')
        return null
    }
    bfs(root){
        let quen = []
        quen.push(root)
        for(i=0;i<=length-1;i++){
            let node = quen[k]
            if(node.left){
                quen.concat(node.left)
            }
            if(node.right){
                quen.concat(node.right)
            }
            quen[k] = quen[k].key
        }
        return quen
    }
}

let a = new binaryTree()
a.insert(5)
a.insert(1)
a.insert(2)
a.insert(7)
a.insert(6)
// a.preOrder(a.root)
// console.log('-----------')
// a.inOrder(a.root)
// console.log('-----------')
// a.postOrder(a.root)

// a.getMin()
// a.getMax()
// a.find(0)