
/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/

import { ELoadBundle } from "../framework/module/load/ILoad";
import { ENetworkProtocol, ESocketBinaryType, INetworkConnectData } from "../framework/module/net/INetwork";
import Network from "../framework/module/net/Network";
import UIMgr from "../framework/module/ui/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    public onLoad() {
        cc.debug.setDisplayStats(false);
    }

    public start() {
        UIMgr.instance(UIMgr).show({ path: 'prefabs/Home', bundle: ELoadBundle.RESOURCES });
        // let networkConnectData: INetworkConnectData = {
        //     ip: '121.40.165.18',
        //     port: 8800,
        //     protocol: ENetworkProtocol.WS,
        //     binaryType: ESocketBinaryType.ARRAY_BUFFER
        // };
        // Network.instance(Network).init(networkConnectData);
        // Network.instance(Network).connect();
        // setTimeout(() => {
        //     Network.instance(Network).send('往服务器发送消息');
        // }, 1000);
        // setTimeout(() => {
        //     Network.instance(Network).close();
        // }, 3000);
    }
}
