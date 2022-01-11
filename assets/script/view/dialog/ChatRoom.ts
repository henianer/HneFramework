
/*******************************************
脚本: ChatRoom
时间: 2022-01-11 11:03
作者: 何斌(1997_10_23@sina.com)
描述:
    聊天室
*******************************************/

import Path from "../../config/Path";
import { EAllEvent } from "../../framework/module/event/EAllEvent";
import EventMgr from "../../framework/module/event/EventMgr";
import { ELoadBundle, ILoadOptions } from "../../framework/module/load/ILoad";
import LoadMgr from "../../framework/module/load/LoadMgr";
import { ENetworkPort, ENetworkProtocol, ENetworkSendType, ESocketBinaryType, INetworkConnectData, INetworkSendData, IP_OR_DOMAIN } from "../../framework/module/net/INetwork";
import Network from "../../framework/module/net/Network";
import UIBase from "../../framework/module/ui/UIBase";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ChatRoom extends UIBase {

    @property(cc.EditBox)
    public input: cc.EditBox = null;

    @property(cc.Button)
    public webSocketSend: cc.Button = null;

    @property(cc.Button)
    public webSocketConnect: cc.Button = null;

    @property(cc.Button)
    public webSocketClose: cc.Button = null;

    private chatRecordNodePool: cc.NodePool = null;
    private chatRecordPrefab: cc.Prefab = null;

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

    protected onShowUI() {
        cc.debug.setDisplayStats(false);
        this.init();
        this.on();
        this.updateUI(false);
    }

    public async init() {
        this.chatRecordNodePool = new cc.NodePool('chatRecord');
        this.chatRecordPrefab = await LoadMgr.instance(LoadMgr).loadPrefab(Path.CHAT_RECORD);
        this.chatRecordNodePool.put(cc.instantiate(this.chatRecordPrefab));
    }

    protected onHideUI() {
        this.off();
    }

    /** 更新UI */
    private updateUI(isConnected: boolean) {
        this.webSocketConnect.interactable = !isConnected;
        this.webSocketClose.interactable = isConnected;
        this.webSocketSend.interactable = isConnected;
        this.input.placeholder = isConnected ? '' : '请先连接网络...';
        this.input.enabled = isConnected;
    }

    /** 更新聊天记录视图 */
    private updateChatRecordView() {
        let chatRecordNode: cc.Node = null;
        if (this.chatRecordNodePool.size() > 0) {
            chatRecordNode = this.chatRecordNodePool.get();
        }
        else {
            chatRecordNode = cc.instantiate(this.chatRecordPrefab);
        }
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
        let sendData: INetworkSendData = {
            type: ENetworkSendType.MESSAGE_CHAT,
            data: this.input.string
        }
        Network.instance(Network).send(sendData);
    }

    private onclickWebSocketClose(event?: cc.Event, param?: string) {
        Network.instance(Network).close();
    }

    /**********************监听************************/
    /** 已连接 */
    private onConnected(msg: any) {
        this.updateUI(true);
    }

    /** 连接失败 */
    private onConnectFailed(msg: any) {
        this.updateUI(false);
    }

    /** 连接断开 */
    private onDisconnected(msg: any) {
        this.updateUI(false);
    }

    /** 消息 */
    private onMessage(msg: INetworkSendData) {
        cc.log(msg.data);
        if (msg.type === ENetworkSendType.MESSAGE_CHAT) {
        }
    }

}
