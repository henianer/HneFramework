import NetMgr from "../../framework/module/net/NetMgr";
import UIBase from "../../framework/module/ui/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends UIBase {

    protected async onInitUI(): Promise<void> {
        let netMgr = NetMgr.instance(NetMgr).init();
        let ret: boolean = await netMgr.connect();
        // console.log(ret);
    }

}
