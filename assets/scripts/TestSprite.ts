import UIBase from "./framework/module/UI/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestSprite extends UIBase {

    show(): void {
        cc.log('页面显示了');
    }

    init(): void {
        cc.log('页面初始化');
    }

    hide(): void {
        cc.log('页面隐藏了');
    }
}
