
/*******************************************
脚本: Home
时间: 2021-12-24 15:55
作者: 何斌(1997_10_23@sina.com)
描述:
    主页
*******************************************/

import { ELoadBundle } from "./framework/module/load/ILoad";
import LoadMgr from "./framework/module/load/LoadMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    private loadMgr: LoadMgr = LoadMgr.instance(LoadMgr);

    private async onclickSetPrefab(event?: cc.Event, param?: string) {
        let a: cc.Prefab = await this.loadMgr.loadPrefab({ path: 'prefabs/TestSprite', bundle: ELoadBundle.Resources });
        let node: cc.Node = cc.instantiate(a);
        node.parent = this.node;
    }

}
