
/*******************************************
脚本: Dictionary
时间: 2021-12-26 12:02
作者: 何斌(1997_10_23@sina.com)
描述:
    字典<string,T>
    键：字符
    值：自定义
*******************************************/

export default class Dictionary<T> {

    private _dictionary = {};

    constructor() {
        this._dictionary = {};
    }

    public containsKey(key: string): boolean {
        return key in this._dictionary;
    }

    public add(key: string, value: T) {
        this._dictionary[key] = value;
    }

    public delete(key: string): boolean {
        if (this.containsKey(key)) {
            delete this._dictionary[key];
            return true;
        }
        return false;
    }

    public get(key: string): T {
        return this.containsKey(key) ? this._dictionary[key] : undefined;
    }

    public keys(): Array<string> {
        let result: Array<string> = new Array<string>();
        for (let key in this._dictionary) {
            if (this.containsKey(key)) result.push(key);
        }
        return result;
    }

    public values(): Array<T> {
        let result: Array<T> = new Array<T>();
        for (let key in this._dictionary) {
            if (this.containsKey(key)) result.push(this._dictionary[key]);
        }
        return result;
    }

    public getDictionary(): Object {
        return this._dictionary;
    }

    public clear() {
        this._dictionary = {};
    }

    public get size(): number {
        return Object.keys(this._dictionary).length;
    }
}

