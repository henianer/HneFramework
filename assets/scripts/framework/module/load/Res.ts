
/*******************************************
脚本: Res
时间: 2021-12-24 14:41
作者: 何斌(1997_10_23@sina.com)
描述:
    资源
*******************************************/

import { ELoadPreset, ILoadOptions } from "./ILoad";

export default class Res<T extends cc.Asset> {

    private asset: T | T[];
    private readonly loadOptions: ILoadOptions | ILoadOptions[];
    private readonly loadOption: ILoadOptions;

    public constructor(loadOptions: ILoadOptions | ILoadOptions[], loadOption: ILoadOptions = {}) {
        this.loadOptions = loadOptions;
        this.loadOption = loadOption;
    }

    public load(): Promise<T>;
    public load(loadOption: Record<string, any>): Promise<T>;
    public load(onProgress: (finshed: number, total: number, item: cc.AssetManager.RequestItem) => void): Promise<T>;
    public load(loadOption: Record<string, any>, _onProgress: (finshed: number, total: number, item: cc.AssetManager.RequestItem) => void): Promise<T>;
    public load(...args: any[]): Promise<T> {
        return new Promise<T>((resolve: (param: any) => void, reject: (reason: any) => void) => {
            let [loadOption, onProgress] = args;
            if (typeof loadOption === 'function' && !onProgress) {
                onProgress = loadOption;
                loadOption = null;
            }

            if (!loadOption) loadOption = Object.create(null);
            Object.assign(loadOption, this.loadOption);

            let onComplete = (err: Error, res: T) => {
                if (err) return reject(err);
                cc.log(`[${res.name}]加载成功`);
                this.asset = res;
                resolve(this.asset);
            };

            if (loadOption.preset === ELoadPreset.Remote) {
                if (this.loadOptions instanceof Array) {
                    cc.warn('同时只能加载一个远程资源');
                    resolve(null);
                } else {
                    let url: string = this.loadOptions.url;
                    cc.assetManager.loadRemote(url, loadOption, onComplete);
                }
            }
            else {
                cc.assetManager.loadAny(this.loadOptions, loadOption, onProgress, onComplete)
            }
        })
    }

    public releaseAsset() {
        if (this.asset instanceof cc.Asset) {
            cc.assetManager.releaseAsset(this.asset);
        } else if (this.asset instanceof Array) {
            this.asset.forEach(asset => {
                if (asset instanceof cc.Asset) {
                    cc.assetManager.releaseAsset(asset);
                }
            });
        }
    }

}
