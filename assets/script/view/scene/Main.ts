import Path from "../../config/Path";
import { ELoadBundle, ILoadOptions } from "../../framework/module/load/ILoad";
import UIMgr from "../../framework/module/ui/UIMgr";


/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/
const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    protected onLoad(): void {
        UIMgr.instance(UIMgr).show(Path.CHAT_ROOM, this.node);
    }

}
