
/** 二叉树节点 */
export class BinaryNode {
    key: number; // key值
    value: any; // value值
    isVisited: boolean; // 是否被访问过
    leftChild: BinaryNode; // 左孩子节点
    rightChild: BinaryNode; // 右孩子节点
    constructor(key: number, value: any) {
        this.key = key;
        this.value = value;
    }
}

/** 二叉树类 */
export class BinaryTree {
    root: BinaryNode; // 根节点
    constructor(key: number, value: any) {
        this.root = new BinaryNode(key, value);
    }

    // 获取二叉树的节点个数
    private _size(tree: BinaryNode): number {
        if (tree == null) {
            return 0;
        }
        return 1 + this._size(tree.leftChild) + this._size(tree.rightChild);
    }

    public size(): number {
        return this._size(this.root);
    }

    // 获取二叉树的层级数
    private _height(tree: BinaryNode) {
        if (tree == null) {
            return 0;
        }
        let l = this._height(tree.leftChild);
        let r = this._height(tree.rightChild);
        return (l < r) ? r + 1 : l + 1;
    }

    public height(): number {
        return this._height(this.root);
    }

    // 访问
    public visit(node: BinaryNode) {
        node.isVisited = true;
    }

    // 二叉树 先序 遍历
    private _preOrder(node: BinaryNode): string {
        if (node == null) return '';
        this.visit(node);
        let str = '';
        str += node.value;
        str += this._preOrder(node.leftChild);
        str += this._preOrder(node.rightChild);
        return str;
    }

    public preOrder(): string {
        return this._preOrder(this.root);
    }

    // 二叉树 中序 遍历
    private _inOrder(node: BinaryNode): string {
        if (node == null) return '';
        this.visit(node);
        let str = '';
        str += this._inOrder(node.leftChild);
        str += node.value;
        str += this._inOrder(node.rightChild);
        return str;
    }

    public inOrder(): string {
        return this._inOrder(this.root);
    }

    // 二叉树 后序 遍历
    private _postOrder(node: BinaryNode): string {
        if (node == null) return '';
        this.visit(node);
        let str = '';
        str += this._postOrder(node.leftChild);
        str += this._postOrder(node.rightChild);
        str += node.value;
        return str;
    }

    public postOrder(): string {
        return this._postOrder(this.root);
    }
}

class TestClass {
    public createBiTree(root: BinaryNode) {
        let arr = ['B', 'C', 'D', 'E', 'F'];
        let nodeArr = new Array<BinaryNode>();
        arr.forEach((value, index) => {
            let node = new BinaryNode(index + 2, value);
            nodeArr.push(node);
        })
        root.leftChild = nodeArr[0];
        root.rightChild = nodeArr[1];
        nodeArr[0].leftChild = nodeArr[2];
        nodeArr[0].rightChild = nodeArr[3];
        nodeArr[1].leftChild = nodeArr[4];
        nodeArr[1].rightChild = nodeArr[5];
    }

    public test() {
        let tree = new BinaryTree(1, '[A]');
        this.createBiTree(tree.root);

        /*
         *        A
         *     B     C
         *  D     E     F
         */

        console.log('size:', tree.size()); // 6
        console.log('height:', tree.height()); // 3
        console.log('先序:', tree.preOrder()); // [A]BDECF
        console.log('中序:', tree.inOrder()); // DEB[A]FC
        console.log('后序:', tree.postOrder()); // DEBFC[A]
    }
}
