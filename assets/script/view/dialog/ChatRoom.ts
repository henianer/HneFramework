
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
import ChatRecord from "../widget/ChatRecord";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ChatRoom extends UIBase {

    @property(cc.EditBox)
    public eb_input: cc.EditBox = null;

    @property(cc.Button)
    public bt_webSocketSend: cc.Button = null;

    @property(cc.Button)
    public bt_webSocketConnect: cc.Button = null;

    @property(cc.Button)
    public bt_webSocketClose: cc.Button = null;

    @property(cc.Node)
    public nd_chatRecordContent: cc.Node = null;

    private _np_chatRecord: cc.NodePool = null;
    private _pf_chatRecord: cc.Prefab = null;
    private _ar_chatRecord: string[] = [];

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
        this._np_chatRecord = new cc.NodePool('chatRecord');
        this._pf_chatRecord = await LoadMgr.instance(LoadMgr).loadPrefab(Path.CHAT_RECORD);
        this._np_chatRecord.put(cc.instantiate(this._pf_chatRecord));
    }

    protected onHideUI() {
        this.off();
    }

    /** 更新UI */
    private updateUI(isConnected: boolean) {
        this.bt_webSocketConnect.interactable = !isConnected;
        this.bt_webSocketClose.interactable = isConnected;
        this.bt_webSocketSend.interactable = isConnected;
        this.eb_input.placeholder = isConnected ? '' : '请先连接网络...';
        this.eb_input.enabled = isConnected;
    }

    /** 更新聊天记录视图 */
    private updateChatRecordView(data: string) {
        let chatRecordNode: cc.Node = null;
        if (this._np_chatRecord.size() > 0) {
            chatRecordNode = this._np_chatRecord.get();
        }
        else {
            chatRecordNode = cc.instantiate(this._pf_chatRecord);
        }
        chatRecordNode.getComponent(ChatRecord).string = data;
        this._ar_chatRecord.push(data);
        chatRecordNode.parent = this.nd_chatRecordContent;
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
            data: this.eb_input.string
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
        // cc.log(msg.data);
        if (msg.type === ENetworkSendType.MESSAGE_CHAT) {
            this.updateChatRecordView(msg.data);
        }
    }

}
