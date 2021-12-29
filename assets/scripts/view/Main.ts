
/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/

import { ELoadBundle } from "../framework/module/load/ILoad";
import UIMgr from "../framework/module/UI/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    public onLoad() {
        cc.debug.setDisplayStats(false);
    }

    public start() {
        UIMgr.instance(UIMgr).show({ path: 'prefabs/Home', bundle: ELoadBundle.Resources });
    }
}
