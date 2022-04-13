import Global from "../../config/Global";
import NetMgr from "../../framework/module/net/NetMgr";
import UIBase from "../../framework/module/ui/UIBase";
import UIMgr from "../../framework/module/ui/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends UIBase {

    @property(cc.Sprite)
    private headIcon: cc.Sprite = null;

    @property(cc.Label)
    private nickname: cc.Label = null;

    @property(cc.Label)
    private uid: cc.Label = null;

    @property(cc.EditBox)
    private introduction: cc.EditBox = null;

    @property(cc.Label)
    private gold: cc.Label = null;

    @property(cc.Label)
    private diamond: cc.Label = null;

    private _userInfo = Global.userInfo;

    protected onInitUI(): void {
        this.updateUI();
    }

    private updateUI() {
        this.nickname.string = this._userInfo.nickName;
        this.uid.string = this._userInfo.uid;
        this.introduction.string = this._userInfo.introduction;
        this.gold.string = this._userInfo.propertyData.gold.toString();
        this.diamond.string = this._userInfo.propertyData.diamond.toString();
    }

    protected onShowUI(): void {

    }

    protected onHideUI(): void {

    }

    private onclickBack(event?: cc.Event, param?: string) {
        UIMgr.instance(UIMgr).hide();
    }

    private editBoxEnd() {
        this._userInfo.introduction = this.introduction.string;
        this.updateUserInfo();
    }

    private onclickAddGold(event?: cc.Event, param?: string) {
        let ran = Math.floor(Math.random() * 100);
        this._userInfo.propertyData.gold += ran;
        this.updateUserInfo();
    }

    private onclickAddDiamond(event?: cc.Event, param?: string) {
        let ran = Math.floor(Math.random() * 10);
        this._userInfo.propertyData.diamond += ran;
        this.updateUserInfo();
    }

    private async updateUserInfo() {
        let ret = await NetMgr.instance(NetMgr).client.callApi('ptl/db/DBUpdate', {
            update: {
                uid: this._userInfo.uid,
                nickName: this._userInfo.nickName,
                introduction: this._userInfo.introduction,
                account: this._userInfo.account,
                password: this._userInfo.password,
                propertyData: this._userInfo.propertyData,
            }
        })
        if (ret.isSucc) {
            this.updateUI();
            return;
        }
        this._userInfo = Global.userInfo;
    }
}
