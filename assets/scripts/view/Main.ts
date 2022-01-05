
/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/

import { ELoadBundle } from "../framework/module/load/ILoad";
import Http from "../framework/module/net/Http";
import Socket, { EBinaryType, ISocketConnectData } from "../framework/module/net/Socket";
import UIMgr from "../framework/module/ui/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    public onLoad() {
        cc.debug.setDisplayStats(false);
    }

    public start() {
        UIMgr.instance(UIMgr).show({ path: 'prefabs/Home', bundle: ELoadBundle.Resources });
        let socketConnectData: ISocketConnectData = {
            ip: '118.31.32.103', // 47.97.35.144,121.40.165.18
            port: 22, // 22,8800
            protocol: 'ws',
            binaryType: EBinaryType.ArrayBuffer
        }
        let webSocket = new Socket();
        webSocket.init(socketConnectData, { onMessage: this.onMessage });
        webSocket.connect();

        // let http = new Http();
        // http.post('');
    }

    public onMessage(data) {
        cc.log(data);
    }
}
