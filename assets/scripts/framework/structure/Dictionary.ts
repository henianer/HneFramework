
/*******************************************
脚本: Dictionary
时间: 2021-12-26 12:02
作者: 何斌(1997_10_23@sina.com)
描述:
    字典
*******************************************/

export default class Dictionary<Key, Value> {

    private data;

    constructor() {
        this.data = {};
    }

    public add(key: Key, value: Value) {
        this.data[key] = value;
    }

    public get(key: Key): Value {
        return this.data[key];
    }

    public remove(key: Key) {
        delete this.data[key]
    }

    public containsKey(key: Key) {
        if (this.data[key]) return true;
        return false;
    }

    public get count() {
        return Object.keys(this.data).length;
    }

    public clear() {
        this.data = {};
    }
}
