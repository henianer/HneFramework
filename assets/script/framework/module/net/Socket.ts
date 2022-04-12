
/*******************************************
脚本: Socket
时间: 2022-01-05 09:54
作者: 何斌(1997_10_23@sina.com)
描述:
    Socket
*******************************************/

import { WsClient } from "tsrpc-browser";
import { serviceProto, ServiceType } from "../../../tsrpc/shared/protocols/serviceProto";
import { ESocketBinaryType, ESocketReadyState, INetworkDelegate } from "./INetwork";

export default class Socket {

    /** 使用TSRPC框架 */
    /** 服务器 */
    private _client: WsClient<ServiceType> = null;
    /** 重连次数 */
    private readonly _reconnectMaxCount = 5;
    private _reconnectCurCount = 0;

    constructor(server: string) {
        this._client = new WsClient(serviceProto, {
            server,
            json: true,
            logger: console
        });
    }

    public async connect(): Promise<boolean> {
        let connect = await this._client.connect();
        if (!connect.isSucc) {
            if (this._reconnectCurCount === this._reconnectMaxCount) {
                this._reconnectCurCount = 0;
                console.log('无法连接上网络，请查看网络状况.');
                return false;
            }
            setTimeout(() => {
                if (this._reconnectCurCount === 0) {
                    console.log('连接网络失败，再次尝试连接中.');
                }
                this._reconnectCurCount++;
                console.log(`第${this._reconnectCurCount}次尝试连接.`);
                this.connect();
            }, 2000);
            return false;
        }
        this._reconnectCurCount = 0;
        this.reconnect();
        return true;
        // let retDBGet = await this.client.callApi('ptl/db/DBGet', {
        //     get: {
        //         account: 'hebin'
        //     }
        // })

        // console.log(retDBGet.isSucc || retDBGet.err);
    }

    /** 监听断线，断线后重连网络 */
    public reconnect() {
        this._client.flows.postDisconnectFlow.push(v => {
            console.log('网络掉线，尝试重连中.');
            this._reconnectCurCount = 0;
            if (!v.isManual) {
                this._reconnect();
            }
            return v;
        })
    }

    private async _reconnect() {
        // 2秒后重连
        if (this._reconnectCurCount >= this._reconnectMaxCount) {
            this._reconnectCurCount = 0;
            console.log('无法连接上网络，请查看网络状况.');
            return;
        }
        this._reconnectCurCount++;
        console.log(`第${this._reconnectCurCount}次重连.`);
        let connect = await this._client.connect();
        if (!connect.isSucc) {
            setTimeout(() => {
                this._reconnect();
            }, 2000);
        } else {
            this._reconnectCurCount = 0;
            console.log('重连成功.');
        }
    }


    /** 暂时注释 */
    // private _webSocket: WebSocket = null;
    // private _socketReadyState: ESocketReadyState = null;
    // private _binaryType: ESocketBinaryType = null;
    // private _delegate: INetworkDelegate = null;

    // private _url: string = null;

    // public init(url: string, binaryType: ESocketBinaryType, delegate: INetworkDelegate) {
    //     this._url = url;
    //     this._binaryType = binaryType;
    //     this._delegate = delegate;
    //     // cc.log(`[WebSocket][${this._url}][Init]`);
    // }

    // public connect() {
    //     if (this._webSocket && this._webSocket.readyState === ESocketReadyState.CONNECTING) {
    //         cc.log(`[WebSocket][${this._url}][Already Connecting]`);
    //         return;
    //     }
    //     // this.close();
    //     cc.log(`[WebSocket][${this._url}][Connecting]`);
    //     this._webSocket = new WebSocket(this._url);
    //     this._webSocket.binaryType = this._binaryType;
    //     this._socketReadyState = ESocketReadyState.CONNECTING;
    //     this._webSocket.onopen = this.onOpen.bind(this);
    //     this._webSocket.onmessage = this.onMessage.bind(this);
    //     this._webSocket.onerror = this.onError.bind(this);
    //     this._webSocket.onclose = this.onClose.bind(this);
    // }

    // public close() {
    //     if (this._webSocket) {
    //         cc.log(`[WebSocket][${this._url}][Closing]`);
    //         this._socketReadyState = ESocketReadyState.CLOSING;
    //         this._webSocket.close();
    //     } else {
    //         this._socketReadyState = ESocketReadyState.CLOSED;
    //     }
    // }

    // public send(data: any) {
    //     if (this._socketReadyState !== ESocketReadyState.CONNECTED ||
    //         this._webSocket.readyState !== ESocketReadyState.CONNECTED ||
    //         !this._webSocket) {
    //         return;
    //     }
    //     this._webSocket.send(JSON.stringify(data));
    // }

    // private onOpen(event: Event) {
    //     // cc.log(`[WebSocket][${this._url}][Connected]`);
    //     this._socketReadyState = ESocketReadyState.CONNECTED;
    //     this._delegate && this._delegate.onConnected && this._delegate.onConnected(event);
    // }

    // private onMessage(event: MessageEvent) {
    //     // cc.log(`[WebSocket][${this._url}][Message]`);
    //     // cc.log(event);
    //     let data = event.data;
    //     if (typeof (data) !== 'undefined' && data instanceof Blob) { // Blob转ArrayBuffer
    //         let reader = new FileReader();
    //         reader.onload = () => {
    //             data = reader.result;
    //             this._delegate && this._delegate.onMessage && this._delegate.onMessage(data);
    //         };
    //         reader.readAsArrayBuffer(data);
    //     } else {
    //         this._delegate && this._delegate.onMessage && this._delegate.onMessage(JSON.parse(data));
    //     }
    // }

    // private onError(event: ErrorEvent) {
    //     // cc.log(`[WebSocket][${this._url}][Error]`);
    //     // cc.log(event);
    //     // if (this._socketReadyState == ESocketReadyState.CONNECTING) {
    //     //     this._socketReadyState = ESocketReadyState.CLOSED;
    //     // }
    //     this._socketReadyState = ESocketReadyState.CLOSED;
    //     if (this._webSocket) this._webSocket = null;
    //     this._delegate && this._delegate.onConnectFailed && this._delegate.onConnectFailed(event);
    // }

    // private onClose(event: CloseEvent) {
    //     // cc.log(`[WebSocket][${this._url}][Closed]`);
    //     // cc.log(event);
    //     this._socketReadyState = ESocketReadyState.CLOSED;
    //     if (this._webSocket) this._webSocket = null;
    //     this._delegate && this._delegate.onDisconnected && this._delegate.onDisconnected(event);
    // }

    // public get isConnected(): boolean {
    //     return this._socketReadyState == ESocketReadyState.CONNECTED;
    // }

    // public get isConnecting(): boolean {
    //     return this._socketReadyState == ESocketReadyState.CONNECTING;
    // }

    // public get getReadyState(): ESocketReadyState {
    //     return this._socketReadyState;
    // }
}
