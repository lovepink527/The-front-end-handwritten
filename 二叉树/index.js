// 增删改查

// 先序遍历  中序遍历  后序遍历
// 前序遍历：首先访问根结点，然后遍历左子树，最后遍历右子树（根->左->右）
// 中序遍历：首先遍历左子树，然后访问根节点，最后遍历右子树（左->根->右）
// 后序遍历：首先遍历左子树，然后遍历右子树，最后访问根节点（左->右->根）

// BFS(宽度优先) 和 DFS(深度优先)
// 深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
// 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
// 深度优先采用的是堆栈的形式, 即先进后出
// 广度优先则采用的是队列的形式, 即先进先出

// DFS包括： 递归式先序中序后序

//节点类
class Node {
    constructor(key) {
        this.left = null
        this.right = null
        this.key = key
    }
}

//二叉树类
class BinaryTree {
    constructor() {
        // 根节点
        this.root = null
    }
    // 插入节点
    insert (key) {
        const newNode = new Node(key)
        if (this.root === null) {
            this.root = newNode
        } else {
            this.inOrderTraversNode(this.root, newNode)
        }
    }
    // 插入节点具体方法
    inOrderTraversNode (node, newNode) {
        if (newNode.key < node.key) { // 左插
            if (node.left === null) {
                node.left = newNode
            }else{
                this.inOrderTraversNode(node.left, newNode)
            }    
        } else { // 右插
            if (node.right === null) {
                node.right = newNode
            } else {
                this.inOrderTraversNode(node.right, newNode)
            }
        }
    }
    // 中序遍历--采用递归实现
    inOrder(node) {
        if (!(node == null)) { // 判断当前节点是否为null
            inOrder(node.left); //递归调用，传入当前节点的左节点
            console.log(node.show() + " "); // 打印当前节点
            inOrder(node.right); // 递归调用，当前节点的右节点
        }
    }
    // 先序遍历
    preOrder(node) {
        if (!(node == null)) {
            console.log(node.show());
            preOrder(node.left);
            preOrder(node.right);
        }
    }
    // 后序遍历
    postOrder(node) {
        if (!(node == null)) {
            postOrder(node.left);
            postOrder(node.right);
            console.log(node.show());
        }
    }
    // 查找最小值
    getMin() {
        // 由于二叉树是根据大小插入的(大于父节点的在右边，小于父节点的在左边)
        // 所以最小值一定在左节点的尽头，反之最大值在右节点的尽头
        var current = this.root;// 将当前节点指向根节点
        while (!(current.left == null)) { // 判断当前节点的左节点是否为null
            current = current.left; // 向下找
        }
        return current.data; // 返回最左节点
    }

    // 查找最大值
    getMax() {
        var current = this.root;
        while (!(current.right == null)) {
            current = current.right;
        }
        return current.data;
    }
    // 查找特定值
    find(data) {
        var current = this.root;
        while (current != null) {
            // 根据数据大小一层一层向下遍历寻找
            if (current.data == data) {
                return current;
            } else if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }
    // 删除节点
    remove(data) {
        root = removeNode(this.root, data);
        console.log(root)
    }

    removeNode(node, data) {
        if(!node){
            return null
        }
        if(node.key == data){
            if(!node.left && !node.right){
                return null
            }else if(!node.left){
                return node.right
            }else if(!node.right){
                return node.left
            }else {
                let template = this.getMin(node.right)
                node.key = template.key
                node.right = this.removeNode(node.right,template.key)
                return node
            }
        }else if(node.key < data){
            node.right = this.removeNode(node.right,data)
            return node
        }else {
            node.left = this.removeNode(node.left,data)
            return node
        }
    }
    // 深度优先
    deepFirstSearch(node,nodeList) {  
        if(node) {
            nodeList.push(node.key);
            this.deepFirstSearch(node.left,nodeList);
            this.deepFirstSearch(node.right,nodeList);
        }
        return nodeList
    } 
    // 广度优先
    bsf(root){
        let quen = []; // 用来遍历的数组
        quen.push(root);
        console.log(quen)
        // 从队列取，然后再追加
        for(let i = 0;i<=quen.length-1;i++){
            let k = quen[i];
            if(k.left){
                quen = quen.concat(k.left);
            }
            if(k.right){
                quen = quen.concat(k.right);
            }
            quen[i] = quen[i].key
        }
        return quen;
    }
    // 非递归式先序遍历
    // 先进后出
    dfsPreOrder(nodes) {
        let result = [];
        let stack = [];
        stack.push(nodes);
        while(stack.length) { // 等同于 while(stack.length !== 0) 直到栈中的数据为空
            let node = stack.pop(); // 取的是栈中最后一个j
            result.push(node.key);
            if(node.right) stack.push(node.right); // 先压入右子树
            if(node.left) stack.push(node.left); // 后压入左子树
        }
        console.log(result)
        return result;
    }
}

// var a =binaryTree.bsf(binaryTree.root)
// console.log(a)
// var b =binaryTree.deepFirstSearch(binaryTree.root,[])
// console.log(b)
// var b =a.sort(function(a, b){return  a - b})
// console.log(b)
// console.log(b[3])
const node = [8, 1, 3, 10, 12, 6, 13, 15, 18, 7]
const binaryTree = new BinaryTree()
node.map(function(item) {
    binaryTree.insert(item)
})
Print(binaryTree.root)

function Print(pRoot)
{
    // write code here
    var result = []
    bfs(pRoot,0)
    console.log(result)
    function bfs(root,level){
        if(!root){
            return
        }
        if(result.length <= level){
            result.push([])
        }
        result[level].push(root.key)
        bfs(root.left,level+1)
        bfs(root.right,level+1)
    }
    
}
