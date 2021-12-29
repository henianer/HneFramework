
/*******************************************
脚本: Dictionary
时间: 2021-12-26 12:02
作者: 何斌(1997_10_23@sina.com)
描述:
    字典
*******************************************/

export default class Dictionary<T> {

    private dictionary = {};

    constructor() {
        this.dictionary = {};
    }

    public containsKey(key: string): boolean {
        return key in this.dictionary;
    }

    public add(key: string, value: T) {
        this.dictionary[key] = value;
    }

    public delete(key: string): boolean {
        if (this.containsKey(key)) {
            delete this.dictionary[key];
            return true;
        }
        return false;
    }

    public get(key: string): T {
        return this.containsKey(key) ? this.dictionary[key] : undefined;
    }

    public keys(): Array<string> {
        let result: Array<string> = new Array<string>();
        for (let key in this.dictionary) {
            if (this.containsKey(key)) result.push(key);
        }
        return result;
    }

    public values(): Array<T> {
        let result: Array<T> = new Array<T>();
        for (let key in this.dictionary) {
            if (this.containsKey(key)) result.push(this.dictionary[key]);
        }
        return result;
    }

    public getDictionary(): Object {
        return this.dictionary;
    }

    public clear() {
        this.dictionary = {};
    }

    public get size(): number {
        return Object.keys(this.dictionary).length;
    }
}

