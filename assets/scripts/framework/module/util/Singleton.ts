
/*******************************************
脚本: Singleton
时间: 2021-12-24 14:45
作者: 何斌(1997_10_23@sina.com)
描述:
    泛型单例
*******************************************/

export default class Singleton<T> {
    private static _instance = null;
    public static instance<T>(v: { new(): T }): T {
        if (this._instance == null) {
            this._instance = new v();
        }
        return this._instance;
    }
}
