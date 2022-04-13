import Global from "../../config/Global";
import Path from "../../config/Path";
import NetMgr from "../../framework/module/net/NetMgr";
import UIBase from "../../framework/module/ui/UIBase";
import UIMgr from "../../framework/module/ui/UIMgr";
import { EResCode, IUserInfo } from "../../tsrpc/shared/Post";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends UIBase {

    @property(cc.EditBox)
    private eAccount: cc.EditBox = null;

    @property(cc.EditBox)
    private ePassword: cc.EditBox = null;

    public netMgr: NetMgr;

    protected async onInitUI(): Promise<void> {
        this.netMgr = NetMgr.instance(NetMgr);
        this.netMgr.init().connect();
    }

    /** 注册登录 */
    private async onclickLogin(event?: cc.Event, param?: string) {
        let account = this.eAccount.string;
        let password = this.ePassword.string;
        if (account.length <= 0 || password.length <= 0) {
            console.log('账号密码输入不合法');
            return;
        }
        let retDBGet = await this.netMgr.client.callApi('ptl/db/DBGet', {
            get: {
                account
            }
        })

        if (retDBGet.isSucc) {
            let userInfo = retDBGet.res.userInfo;
            if (password !== userInfo.password) {
                console.log('账号或密码错误');
                return;
            }
            console.log('登录成功.');
            Global.userInfo = userInfo;
            UIMgr.instance(UIMgr).show(Path.DIALOG_HOME, cc.director.getScene());
        } else {
            if (retDBGet.err.message === EResCode.NON_EXISTENT) {
                console.log('账号可注册.');
                let retDBAdd = await this.netMgr.client.callApi('ptl/db/DBAdd', {
                    add: {
                        account, password
                    }
                })
                if (retDBAdd.isSucc) {
                    console.log('注册成功.');
                }
            }
        }
    }

}
