/*******************************************************************************
文件: Queue.ts
创建: 2021年09月06日
作者: 何斌(1997_10_23@sina.com)
描述:
    队列
*******************************************************************************/

/** 普通队列 */
export class Queue<T> {

    private array: Array<T>;

    public constructor() {
        this.array = new Array<T>();
    }

    /**
     * 入队
     * @param element 入队的元素
     */
    public enqueue(element: T) {
        this.array.push(element);
    }

    /**
     * 出队
     * @returns 返回出队的元素
     */
    public dequeue(): T {
        return this.array.shift();
    }

    /** 队列元素的个数 */
    public get size(): number {
        return this.array.length;
    }

    /** 队列的头 */
    public get head(): T {
        return this.array[0];
    }

    /** 队列的尾 */
    public get tail(): T {
        return this.array[this.size - 1];
    }

    /** 队列是否为空 */
    public get isEmpty(): boolean {
        return this.size == 0;
    }

    /** 清空队列 */
    public clear() {
        this.array = new Array<T>();
    }

    public getArray(): Array<T> {
        return this.array;
    }

    /** 打印 */
    public print() {
        console.log(this.array);
    }
}

/** 双端队列 */
export class DoubleEndedQueue<T>{

    private array: Array<T>;

    public constructor() {
        this.array = new Array<T>();
    }

    /**
     * 头部入队
     * @param element 入队的元素
     */
    public enqueueHead(element: T) {
        if (this.isEmpty) {
            this.enqueueTail(element);
        } else {
            this.array.splice(0, 0, element);
        }
    }

    /**
     * 尾部入队
     * @param element 入队的元素
     */
    public enqueueTail(element: T) {
        this.array.push(element);
    }

    /**
     * 头部出队
     * @returns 出队的元素
     */
    public dequeueHead(): T {
        return this.array.shift();
    }

    /**
     * 尾部出队
     * @returns 出队的元素
     */
    public dequeueTail(): T {
        return this.array.pop();
    }

    /** 队列元素的个数 */
    public get size(): number {
        return this.array.length;
    }

    /** 队列的头 */
    public get head(): T {
        return this.array[0];
    }

    /** 队列的尾 */
    public get tail(): T {
        return this.array[this.size - 1];
    }

    /** 队列是否为空 */
    public get isEmpty(): boolean {
        return this.size == 0;
    }

    /** 清空队列 */
    public clear() {
        this.array = new Array<T>();
    }

    public getArray(): Array<T> {
        return this.array;
    }

    /** 打印 */
    public print() {
        console.log(this.array);
    }
}
