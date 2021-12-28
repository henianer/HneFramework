
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
import UIMgr from "./framework/module/UI/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    @property(cc.Sprite)
    public s_sprite: cc.Sprite = null;

    private loadMgr: LoadMgr = LoadMgr.instance(LoadMgr);
    protected uiMgr: UIMgr = UIMgr.instance(UIMgr);

    private async onclickSetPrefab(event?: cc.Event, param?: string) {
        this.uiMgr.push({ path: 'prefabs/TestSprite', bundle: ELoadBundle.Resources });
    }
}
