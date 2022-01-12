
/*******************************************
脚本: Network
时间: 2022-01-06 10:00
作者: 何斌(1997_10_23@sina.com)
描述:
    网络
    不要直接通过Socket和Http进行通讯联网
*******************************************/

import Singleton from "../../util/Singleton";
import { EAllEvent } from "../event/EAllEvent";
import EventMgr from "../event/EventMgr";
import Http from "./Http";
import { EHttpRequestType, ENetworkProtocol, ENetworkSendType, ESocketBinaryType, HEARTBEAT_INTERVAL, INetworkConnectData, INetworkDelegate, INetworkSendData, RECONNECT_TRY_INTERVAL, RECONNECT_TRY_TIMES } from "./INetwork";
import Socket from "./Socket";

export default class Network extends Singleton<Network> implements INetworkDelegate {

    private _ip: string = null;
    private _port: number = null;
    private _protocol: ENetworkProtocol = null;

    private _url: string = null;

    private _socket: Socket = null;
    private _socketBinaryType: ESocketBinaryType = null;

    private _http: Http = null;
    private _httpRequestType: EHttpRequestType = null;

    private _reconnectTryTimes = 0;
    private _heartbeatTimeout: number = null;

    /** 初始化 */
    public init(networkConnectData: INetworkConnectData) {
        // this.dataReset();
        if (networkConnectData.protocol === ENetworkProtocol.WS || networkConnectData.protocol === ENetworkProtocol.WSS) {
            // websocket连接
            if (networkConnectData.url) this._url = networkConnectData.url;
            else {
                this._ip = networkConnectData.ip;
                this._port = networkConnectData.port;
                this._protocol = networkConnectData.protocol;
                this._socketBinaryType = networkConnectData.binaryType;
                this._url = `${this._protocol}://${this._ip}:${this._port}`;
            }
            this._socket = new Socket();
        }
        else if (networkConnectData.protocol === ENetworkProtocol.HTTP || networkConnectData.protocol === ENetworkProtocol.HTTPS) {
            // http连接
            this._url = networkConnectData.url;
            this._httpRequestType = networkConnectData.requestType;
            this._http = new Http();
        }

    }

    /** 连接 */
    public connect() {
        this.onConnecting();
        if (this._socket) {
            this._socket.init(this._url, this._socketBinaryType, this);
            this._socket.connect();
        }
        else if (this._http) {
            if (this._httpRequestType === EHttpRequestType.GET) {
                this._http.get(this._url);
            } else if (this._httpRequestType === EHttpRequestType.POST) {
                this._http.post(this._url);
            }
        }
        else {
            cc.log('[Network Not Inited]')
        }
    }

    /** 断开 */
    public close() {
        if (this._socket) {
            this._socket.close();
        }
        else if (this._http) {

        }
        else {
            cc.log('[Network Already Closed]')
        }
    }

    /** 发送 */
    public send(param: INetworkSendData) {
        if (this._socket) {
            this._socket.send(param);
        }
        else if (this._http) {

        }
        else {
            cc.log('[Network Already Closed]')
        }
    }

    public get isConnected(): boolean {
        if (this._socket) {
            return this._socket.isConnected;
        }
        else if (this._http) {
            return null;
        }
    }

    public get isConnecting(): boolean {
        if (this._socket) {
            return this._socket.isConnecting;
        }
        else if (this._http) {
            return null;
        }
    }

    // private dataReset() {
    //     this._ip = null;
    //     this._port = null;
    //     this._protocol = null;
    //     this._socket = null;
    //     this._socketBinaryType = null;
    //     this._url = null;
    //     this._http = null;
    //     this._httpRequestType = null;
    //     this._reconnectTryTimes = 0;
    //     this._heartbeatTimeout = null;
    // }

    private startHeartbeat() {
        let self = this;
        self.stopHeartbeat();
        self._heartbeatTimeout = setTimeout(() => {
            let sendData: INetworkSendData = {
                type: ENetworkSendType.KEEP_NETWORK,
                data: ''
            }
            self.send(sendData);
        }, HEARTBEAT_INTERVAL * 1000);
    }

    private stopHeartbeat() {
        if (this._heartbeatTimeout) clearTimeout(this._heartbeatTimeout);
    }

    /*****************************INetworkDelegate接口****************************/
    /** 连接中 */
    public onConnecting() {
        cc.log('[Network Connecting]');
    }

    /** 已连接 */
    public onConnected(msg: Event) {
        this.startHeartbeat();
        if (this._reconnectTryTimes > 0) {
            cc.log('[Network Reconnected]');
            this._reconnectTryTimes = 0;
            EventMgr.instance(EventMgr).emit(EAllEvent.NET_RECONNECTED, msg);
        } else {
            cc.log('[Network Connected]');
            EventMgr.instance(EventMgr).emit(EAllEvent.NET_CONNECTED, msg);
        }
    }

    /** 连接失败 */
    public onConnectFailed(msg: ErrorEvent) {
        this.stopHeartbeat();
        this._reconnectTryTimes++;
        if (this._reconnectTryTimes < RECONNECT_TRY_TIMES) {
            cc.error('[Network ConnectFailed,Try Again]');
            this.connect();
        } else {
            cc.error('[Network ConnectFailed]');
            this._reconnectTryTimes = 0;
            EventMgr.instance(EventMgr).emit(EAllEvent.NET_CONNECT_FAILED, msg);
        }
    }

    /** 连接断开 */
    public onDisconnected(msg: CloseEvent) {
        cc.log('[Network Disconnected]');
        this.stopHeartbeat();
        // this.dataReset();
        EventMgr.instance(EventMgr).emit(EAllEvent.NET_DISCONNECTED, msg);
    }

    /** 消息 */
    public onMessage(msg: INetworkSendData) {
        this.startHeartbeat();
        if (msg.type === ENetworkSendType.KEEP_NETWORK) {
            cc.log('[Network Keep]');
        }
        else {
            cc.log('[Network Message]');
            EventMgr.instance(EventMgr).emit(EAllEvent.NET_MESSAGE, msg);
        }
    }
}
