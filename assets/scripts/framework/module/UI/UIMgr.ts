

/*******************************************
脚本: UIMgr
时间: 2021-12-26 11:32
作者: 何斌(1997_10_23@sina.com)
描述:
    UI管理
*******************************************/

import Dictionary from "../../structure/Dictionary";
import Stack from "../../structure/Stack";
import Singleton from "../../util/Singleton";
import { IUI } from "./IUI";

export default class UIMgr extends Singleton<UIMgr> {

    public baseStack: Stack<string> = new Stack();
    public baseDictionary: Dictionary<string, IUI> = new Dictionary();

    public show(): IUI {
        return null;
    }

}
