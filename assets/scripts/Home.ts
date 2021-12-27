
/*******************************************
脚本: Home
时间: 2021-12-24 15:55
作者: 何斌(1997_10_23@sina.com)
描述:
    主页
*******************************************/

import { ELoadBundle, ELoadPreset } from "./framework/module/load/ILoad";
import LoadMgr from "./framework/module/load/LoadMgr";
import UIBase from "./framework/module/UI/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends UIBase {

    @property(cc.Sprite)
    public s_sprite: cc.Sprite = null;

    private loadMgr: LoadMgr = LoadMgr.instance(LoadMgr);

    private async onclickSetPrefab(event?: cc.Event, param?: string) {
        let a: cc.Prefab = await this.loadMgr.loadPrefab({ path: 'prefabs/TestSprite' });
        let node: cc.Node = cc.instantiate(a);
        node.parent = this.node;
    }

    protected onInit(): void {

    }

    protected onShow(): void {

    }

    protected onHide(): void {

    }

    protected onDelete(): void {

    }
}
