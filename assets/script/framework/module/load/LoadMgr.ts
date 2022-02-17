import Singleton from "../../designPattern/Singleton";
import { ELoadPreset, ILoadOptions, IResOptions } from "./ILoad";
import ResLoad from "./ResLoad";

// TODO: 何斌(1997_10_23@sina.com) 2021-12-25 20:11
// TODO: 暂时实现本地bundle加载,远程加载未处理
export default class LoadMgr extends Singleton<LoadMgr>{

    private _loader: ResLoad = null;

    public constructor() {
        super();
        this._loader = new ResLoad();
    }

    public async loadImage(resOptions: IResOptions, loadOption?: ILoadOptions) {
        if(loadOption && loadOption.preset === ELoadPreset.REMOTE)
        {
            return new cc.SpriteFrame(await this._loader.loadRemoteImage(resOptions).load(loadOption));
        }
        return this._loader.loadImage(resOptions).load(loadOption);
    }

    public loadPrefab(resOptions: IResOptions, loadOption?: ILoadOptions) {
        return this._loader.loadPrefab(resOptions).load(loadOption);
    }
}
