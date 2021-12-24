import Singleton from "../util/Singleton";
import { ELoadBundle, ILoad } from "./ILoad";
import ResLoad from "./ResLoad";

export default class LoadMgr extends Singleton<LoadMgr>{

    private loader: ResLoad = null;

    public constructor() {
        super();
        this.loader = new ResLoad();
    }

    public loadImage(path: string, bundle: ELoadBundle) {
        return this.loader.loadImage(path, bundle).load();
    }
}
