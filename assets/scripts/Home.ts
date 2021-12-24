
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

    @property(cc.Sprite)
    private s_test: cc.Sprite = null;

    private async onclickSetImage(event?: cc.Event, param?: string) {
        let a = await LoadMgr.instance(LoadMgr).loadImage('images/bg', ELoadBundle.Resources);
        this.s_test.spriteFrame = a;
    }
}
