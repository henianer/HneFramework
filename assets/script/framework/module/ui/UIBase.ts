
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

    initUI() {
        cc.log('==>[' + this.node.name + ']初始化<==');
        this.onInitUI();
    }

    showUI() {
        cc.log('==>[' + this.node.name + ']显示<==');
        this.node.active = true;
        this.onShowUI();
    }

    hideUI() {
        cc.log('==>[' + this.node.name + ']隐藏<==');
        this.node.active = false;
        this.onHideUI();
    }

    pauseUI() {
        cc.log('==>[' + this.node.name + ']暂停<==');
        this.onPauseUI();
    }

    resumeUI() {
        cc.log('==>[' + this.node.name + ']恢复<==');
        this.onResumeUI();
    }

    protected onInitUI() { }
    protected onShowUI() { }
    protected onHideUI() { }
    protected onPauseUI() { }
    protected onResumeUI() { }
}
