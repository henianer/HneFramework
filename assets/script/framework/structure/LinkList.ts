/** 单向链表节点类型 */
interface LinkListNodeType<T> {
    value: T;
    next: LinkListNodeType<T> | null;
}

class LinkedListNode<T> implements LinkListNodeType<T>{
    value: T;
    next: LinkListNodeType<T> | null;
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

/*******************************************
文件: LinkList
创建: 2021年09月08日 17:25
作者: 何斌(1997_10_23@sina.com)
描述:
    单向链表
*******************************************/

export class LinkList<T> {
    private _head: LinkListNodeType<T> | null = null;
    private _size: number = 0;
    constructor(headValue: T) {
        if (headValue) {
            this._head = new LinkedListNode(headValue);
            this._size++;
        }
    }

    public head() {
        return this._head;
    }

    public size() {
        return this._size;
    }

    private isLegal(index: number): boolean {
        if (index >= 0 && index < this._size) return true;
        console.log('传入位置不合法');
        return false;
    }

    public getNode(index: number): LinkListNodeType<T> {
        if (!this.isLegal(index)) return null;
        let curNode: LinkListNodeType<T> = this._head;
        let tempIndex = 0;
        while (tempIndex !== index) {
            curNode = curNode.next;
            tempIndex++;
        }
        return curNode;
    }

    /** 增加 */
    public append(value: T) {
        if (this._size === 0) {
            this._head = new LinkedListNode(value);
        }
        else {
            let curNode = this._head;
            while (curNode.next !== null) {
                curNode = curNode.next;
            }
            curNode.next = new LinkedListNode(value);
        }
        this._size++;
    }

    /** 插入 */
    public insert(index: number, value: T) {
        let newNode = new LinkedListNode(value);
        if (this._size === 0) {
            this._head = newNode;
        }
        else {
            if (index === 0) {
                newNode.next = this._head;
                this._head = newNode;
            }
            else if (index === this._size) {
                let preNode = this.getNode(index - 1);
                preNode.next = newNode;
            }
            else {
                let preNode = this.getNode(index - 1);
                let curNode = this.getNode(index);
                if (preNode && curNode) {
                    preNode.next = newNode;
                    preNode.next.next = curNode;
                }
            }
        }
        this._size++;
    }

    /** 删除 */
    public remove(index: number) {
        let preNode = this.getNode(index - 1);
        let curNode = this.getNode(index);
        if (preNode && curNode) {
            preNode.next = curNode.next;
        }
        this._size--;
    }

    /** 反转 */
    public reverse() {
        if (this._size === 0) return;
        if (this._head == null || this._head.next == null) return;
        let curNode = this._head;
        let newNode = null;
        while (curNode !== null) {
            let tempNode = curNode.next;
            curNode.next = newNode;
            newNode = curNode;
            curNode = tempNode;
        }
        this._head = newNode;
    }

    public isEmpty(): boolean {
        return this._size === 0;
    }

    public toString(): string {
        let str = '';
        let curNode = this.getNode(0);
        while (curNode !== null) {
            str += curNode.value + '=>';
            curNode = curNode.next;
        }
        str += 'null';
        str = str.trim();
        console.log(str);
        return str;
    }
}
