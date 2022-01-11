
/*******************************************
脚本: Res
时间: 2021-12-24 14:41
作者: 何斌(1997_10_23@sina.com)
描述:
    资源
*******************************************/

import { ELoadPreset, ILoadOptions } from "./ILoad";

export default class Res<T extends cc.Asset> {

    /** 资源：加载-该类型资源或该类型资源的数组 预加载-该类型的非解析资源 */
    private _asset: T | T[] | cc.AssetManager.RequestItem[];
    private readonly _loadOptions: ILoadOptions | ILoadOptions[];
    private readonly _loadOption: ILoadOptions;

    public constructor(loadOptions: ILoadOptions | ILoadOptions[], loadOption: ILoadOptions = Object.create(null)) {
        if (loadOptions instanceof Array) {
            for (let i = 0; i < loadOptions.length; i++) {
                if (Object.keys(loadOptions[i]).length === 0) {
                    cc.warn('==>加载参数传入错误<==');
                    return;
                }
            }
        } else {
            if (Object.keys(loadOptions).length === 0) {
                cc.warn('==>加载参数传入错误<==');
                return;
            }
        }
        this._loadOptions = loadOptions;
        this._loadOption = loadOption;
    }

    public load(): Promise<T>;
    public load(loadOption: ILoadOptions): Promise<T>;
    public load(onProgress: (finshed: number, total: number, item: cc.AssetManager.RequestItem) => void): Promise<T>;
    public load(loadOption: ILoadOptions, onProgress: (finshed: number, total: number, item: cc.AssetManager.RequestItem) => void): Promise<T>;
    public load(...args: any[]): Promise<T> {
        return new Promise<T>((resolve: (param: any) => void, reject: (reason: any) => void) => {
            let [loadOption, onProgress] = args;

            if (typeof loadOption === 'function' && !onProgress) {
                onProgress = loadOption;
                loadOption = null;
            }

            if (!loadOption) loadOption = Object.create(null);
            Object.assign(loadOption, this._loadOption);

            let onComplete = (err: Error, res: T) => {
                if (err) return reject(err);
                cc.log(`==>[${res.name}]加载成功<==`);
                this._asset = res;
                resolve(this._asset);
            };

            if (loadOption.preset === ELoadPreset.REMOTE) {
                if (this._loadOptions instanceof Array) {
                    cc.warn('==>同时只能加载一个远程资源<==');
                    resolve(null);
                } else {
                    let url: string = this._loadOptions.url;
                    if (url === '' || url == null) {
                        cc.warn('==>远程资源路径不合法<==');
                    } else {
                        cc.assetManager.loadRemote(url, loadOption, onComplete);
                    }
                }
            }
            else {
                cc.assetManager.loadAny(this._loadOptions, loadOption, onProgress, onComplete)
            }
        })
    }

    /**
     * 预加载资源
     * 返回类型 cc.AssetManager.RequestItem[] 为非解析资源数组
     * 需要调用 cc.assetManager.loadAny(...) 来完成资源加载
     */
    public preload(): Promise<T>;
    public preload(loadOption: ILoadOptions): Promise<T>;
    public preload(onProgress: (finshed: number, total: number, item: cc.AssetManager.RequestItem) => void): Promise<T>;
    public preload(loadOption: ILoadOptions, onProgress: (finshed: number, total: number, item: cc.AssetManager.RequestItem) => void): Promise<T>;
    public preload(...args: any[]): Promise<T> {
        return new Promise<T>((resolve: (param: any) => void, reject: (reason: any) => void) => {
            let [loadOption, onProgress] = args;
            if (typeof loadOption === 'function' && !onProgress) {
                onProgress = loadOption;
                loadOption = null;
            }

            if (!loadOption) loadOption = Object.create(null);
            Object.assign(loadOption, this._loadOption);

            let onComplete = (err: Error, items: cc.AssetManager.RequestItem[]) => {
                if (err) return reject(err);
                cc.log('==>预加载资源成功<==');
                this._asset = items;
                resolve(this._asset);
            };

            cc.assetManager.preloadAny(this._loadOptions, loadOption, onProgress, onComplete);
        })
    }

    public releaseAsset() {
        if (this._asset instanceof cc.Asset) {
            cc.assetManager.releaseAsset(this._asset);
        } else if (this._asset instanceof Array) {
            this._asset.forEach(asset => {
                if (asset instanceof cc.Asset) {
                    cc.assetManager.releaseAsset(asset);
                }
            });
        }
    }

}
