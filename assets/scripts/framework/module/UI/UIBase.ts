
/*******************************************
脚本: UIBase
时间: 2021-12-25 20:34
作者: 何斌(1997_10_23@sina.com)
描述:
    UI基类
*******************************************/

import { IUI } from "./IUI";
import UIUtil from "./UIUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component implements IUI {

    private _uiUtil: UIUtil;
    protected get uiUtil(): UIUtil {
        if (this._uiUtil == null) {
            this._uiUtil = this.node.addComponent(UIUtil);
            this._uiUtil.init();
        }
        return this._uiUtil;
    }

    init() {
    }

    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }
}
