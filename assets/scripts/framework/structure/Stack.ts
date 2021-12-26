
/*******************************************
脚本: Stack
时间: 2021-12-26 11:39
作者: 何斌(1997_10_23@sina.com)
描述:
    栈
*******************************************/

export default class Stack<T>{

    private array: T[];
    private maxCount: number;
    private curCount: number;

    constructor(maxCount?: number) {
        this.array = [];
        this.curCount = 0;
        if (maxCount != null) {
            this.maxCount = maxCount;
        }
    }

    /** 入栈 */
    public push(...elements: T[]) {
        let newCount = elements.length;
        if (this.maxCount && this.array.length + newCount > this.maxCount) {
            cc.warn('入栈后个数超出预设个数');
            return;
        }
        this.array.push(...elements);
    }

    /** 从栈顶取出元素 */
    public pop(): T {
        return this.array.pop();
    }

    /** 返回栈顶元素（不取出） */
    public peek() {
        return this.array[this.array.length - 1];
    }

    public get count() {
        this.curCount = this.array.length;
        return this.curCount;
    }

    public isEmpty() {
        return this.array.length === 0;
    }

    public clear() {
        this.array = [];
    }

    public print() {
        cc.log(this.array);
    }

}