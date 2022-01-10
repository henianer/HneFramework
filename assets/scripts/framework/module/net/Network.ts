
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
import { EHttpRequestType, ENetworkProtocol, ESocketBinaryType, INetworkConnectData, INetworkDelegate } from "./INetwork";
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

    /** 初始化 */
    public init(networkConnectData: INetworkConnectData) {
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
    public send(param: any) {
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

    private dataReset() {
        this._ip = null;
        this._port = null;
        this._protocol = null;
        this._socket = null;
        this._socketBinaryType = null;
        this._url = null;
        this._http = null;
        this._httpRequestType = null;
    }

    /*****************************INetworkDelegate接口****************************/
    /** 连接中 */
    public onConnecting() {
        cc.log('[Network Connecting]');
    }

    /** 已连接 */
    public onConnected(data: Event) {
        cc.log('[Network Connected]');
        EventMgr.instance(EventMgr).emit(EAllEvent.NET_CONNECTED, data);
    }

    /** 连接失败 */
    public onConnectFailed(data: ErrorEvent) {
        cc.log('[Network ConnectFailed]');
        EventMgr.instance(EventMgr).emit(EAllEvent.NET_CONNECT_FAILED, data);
    }

    /** 连接断开 */
    public onDisconnected(data: CloseEvent) {
        cc.log('[Network Disconnected]');
        this.dataReset();
        EventMgr.instance(EventMgr).emit(EAllEvent.NET_DISCONNECTED, data);
    }

    /** 消息 */
    public onMessage(data: MessageEvent) {
        cc.log('[Network Message]');
        EventMgr.instance(EventMgr).emit(EAllEvent.NET_MESSAGE, data);
    }
}
