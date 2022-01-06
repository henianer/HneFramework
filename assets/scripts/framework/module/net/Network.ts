
/*******************************************
脚本: Network
时间: 2022-01-06 10:00
作者: 何斌(1997_10_23@sina.com)
描述:
    网络
    不要直接通过Socket和Http进行通讯联网
*******************************************/

import Singleton from "../../util/Singleton";
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
    }

    /** 断开 */
    public close() {
        if (this._socket) {
            this._socket.close();
        }
        else if (this._http) {

        }
    }

    /*****************************INetworkDelegate接口****************************/
    /** 已连接 */
    public onConnected(data: any) {
        cc.log('[Network Connected]');
    }

    /** 连接失败 */
    public onConnectFailed(data: any) {
        cc.log('[Network ConnectFailed]');
    }

    /** 连接断开 */
    public onDisconnected(data: any) {
        cc.log('[Network Disconnected]');
    }

    /** 消息 */
    public onMessage(data: any) {
        cc.log('[Network Message]');
        cc.log(data);
    }
}
