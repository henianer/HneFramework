
/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/

import { EAllEvent } from "../framework/module/event/EAllEvent";
import { EventMgr } from "../framework/module/event/EventMgr";
import { ELoadBundle } from "../framework/module/load/ILoad";
import { ENetworkProtocol, ESocketBinaryType, INetworkConnectData } from "../framework/module/net/INetwork";
import Network from "../framework/module/net/Network";
import UIMgr from "../framework/module/ui/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.EditBox)
    public input: cc.EditBox = null;

    @property(cc.Button)
    public webSocketSend: cc.Button = null;

    @property(cc.Button)
    public webSocketClose: cc.Button = null;

    public onLoad() {
        cc.debug.setDisplayStats(false);
        let networkConnectData: INetworkConnectData = {
            ip: '47.97.35.144', // 172.17.21.71   47.97.35.144 8888
            port: 8888,
            protocol: ENetworkProtocol.WS,
            binaryType: ESocketBinaryType.ARRAY_BUFFER
        };
        Network.instance(Network).init(networkConnectData);
        Network.instance(Network).connect();
    }

    public start() {

    }

    private onclickWebSocketSend(event?: cc.Event, param?: string) {
        Network.instance(Network).send(this.input.string);
    }

    private onclickWebSocketClose(event?: cc.Event, param?: string) {
        Network.instance(Network).close();
    }

    /** 连接中 */
    private onConnecting() {

    }

    /** 已连接 */
    private onConnected(data: Event) {

    }

    /** 连接失败 */
    private onConnectFailed(data: ErrorEvent) {

    }

    /** 连接断开 */
    private onDisconnected(data: CloseEvent) {

    }

    /** 消息 */
    private onMessage(data: MessageEvent) {
        cc.log('接收到了消息');
    }

}
