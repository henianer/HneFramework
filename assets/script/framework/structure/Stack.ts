
/*******************************************
脚本: Stack
时间: 2021-12-26 11:39
作者: 何斌(1997_10_23@sina.com)
描述:
    栈
*******************************************/

export default class Stack<T>{

    private _array: T[];
    private _maxCount: number;
    private _curCount: number;

    constructor(maxCount?: number) {
        this._array = [];
        this._curCount = 0;
        if (maxCount != null) {
            this._maxCount = maxCount;
        }
    }

    /** 入栈 */
    public push(...elements: T[]) {
        let newCount = elements.length;
        if (this._maxCount && this._array.length + newCount > this._maxCount) {
            cc.warn('==>入栈后个数超出预设个数<==');
            return;
        }
        this._array.push(...elements);
    }

    /** 从栈顶取出元素 */
    public pop(): T {
        return this._array.pop();
    }

    /** 返回栈顶元素（不取出） */
    public peek() {
        return this._array[this._array.length - 1];
    }

    public get count() {
        this._curCount = this._array.length;
        return this._curCount;
    }

    public isEmpty() {
        return this._array.length === 0;
    }

    public clear() {
        this._array = [];
    }

    public print() {
        cc.log(this._array);
    }

}