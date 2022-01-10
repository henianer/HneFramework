
/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/

import { EAllEvent } from "../framework/module/event/EAllEvent";
import EventMgr from "../framework/module/event/EventMgr";
import { ELoadBundle } from "../framework/module/load/ILoad";
import Http from "../framework/module/net/Http";
import { ENetworkPort, ENetworkProtocol, ESocketBinaryType, INetworkConnectData, IP_OR_DOMAIN } from "../framework/module/net/INetwork";
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
    public webSocketConnect: cc.Button = null;

    @property(cc.Button)
    public webSocketClose: cc.Button = null;

    private on() {
        EventMgr.instance(EventMgr).on(EAllEvent.NET_CONNECTED, this.onConnected, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_CONNECT_FAILED, this.onConnectFailed, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_DISCONNECTED, this.onDisconnected, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_MESSAGE, this.onMessage, this);
    }

    private off() {
        EventMgr.instance(EventMgr).off(EAllEvent.NET_CONNECTED, this.onConnected, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_CONNECT_FAILED, this.onConnectFailed, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_DISCONNECTED, this.onDisconnected, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_MESSAGE, this.onMessage, this);
    }

    public onLoad() {
        cc.debug.setDisplayStats(false);
        this.on();
        this.updateUI(false);
    }

    public onDestroy() {
        this.off();
    }

    private updateUI(isConnected: boolean) {
        this.webSocketConnect.interactable = !isConnected;
        this.webSocketClose.interactable = isConnected;
        this.webSocketSend.interactable = isConnected;
    }

    private onclickWebSocketConnect(event?: cc.Event, param?: string) {
        let networkConnectData: INetworkConnectData = {
            ip: IP_OR_DOMAIN,
            port: ENetworkPort.MESSAGE_SERVER,
            protocol: ENetworkProtocol.WS,
            binaryType: ESocketBinaryType.ARRAY_BUFFER
        };
        Network.instance(Network).init(networkConnectData);
        Network.instance(Network).connect();
    }

    private onclickWebSocketSend(event?: cc.Event, param?: string) {
        Network.instance(Network).send(this.input.string);
    }

    private onclickWebSocketClose(event?: cc.Event, param?: string) {
        Network.instance(Network).close();
    }

    /** 已连接 */
    private onConnected(data: Event) {
        this.updateUI(true);
    }

    /** 连接失败 */
    private onConnectFailed(data: ErrorEvent) {
        this.updateUI(false);
    }

    /** 连接断开 */
    private onDisconnected(data: CloseEvent) {
        this.updateUI(false);
    }

    /** 消息 */
    private onMessage(data: MessageEvent) {
        cc.log('接收到了消息');
        cc.log(data);
    }
}
