import Singleton from "../util/Singleton";
import { ILoadOptions } from "./ILoad";
import ResLoad from "./ResLoad";

// TODO: 何斌(1997_10_23@sina.com) 2021-12-25 20:11
// TODO: 暂时实现本地bundle加载,远程加载未处理
export default class LoadMgr extends Singleton<LoadMgr>{

    private loader: ResLoad = null;

    public constructor() {
        super();
        this.loader = new ResLoad();
    }

    public loadImage(loadOptions: ILoadOptions) {
        return this.loader.loadImage(loadOptions).load();
    }

    public loadPrefab(loadOptions: ILoadOptions) {
        return this.loader.loadPrefab(loadOptions).load();
    }
}
