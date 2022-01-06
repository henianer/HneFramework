
/*******************************************
脚本: Socket
时间: 2022-01-05 09:54
作者: 何斌(1997_10_23@sina.com)
描述:
    Socket
*******************************************/

import { ESocketBinaryType, ESocketReadyState, INetworkDelegate } from "./INetwork";

export default class Socket {
    private _webSocket: WebSocket = null;
    private _socketReadyState: ESocketReadyState = null;
    private _binaryType: ESocketBinaryType = null;
    private _delegate: INetworkDelegate = null;

    private _url: string = null;

    public init(url: string, binaryType: ESocketBinaryType, delegate: INetworkDelegate) {
        this._url = url;
        this._binaryType = binaryType;
        this._delegate = delegate;
        cc.log(`[WebSocket][${this._url}][Init]`);
    }

    public connect() {
        if (this._webSocket && this._webSocket.readyState === ESocketReadyState.CONNECTING) {
            cc.log(`[WebSocket][${this._url}][Already Connecting]`);
            return;
        }
        this.close();
        cc.log(`[WebSocket][${this._url}][Connecting]`);
        this._webSocket = new WebSocket(this._url);
        this._webSocket.binaryType = this._binaryType;
        this._socketReadyState = ESocketReadyState.CONNECTING;
        this._webSocket.onopen = this.onOpen.bind(this);
        this._webSocket.onmessage = this.onMessage.bind(this);
        this._webSocket.onerror = this.onError.bind(this);
        this._webSocket.onclose = this.onClose.bind(this);
    }

    public close() {
        if (this._webSocket) {
            cc.log(`[WebSocket][${this._url}][Closing]`);
            this._socketReadyState = ESocketReadyState.CLOSING;
            this._webSocket.close();
        } else {
            this._socketReadyState = ESocketReadyState.CLOSED;
        }
    }

    private onOpen(event: Event) {
        // cc.log(`[WebSocket][${this._url}][Connected]`);
        this._socketReadyState = ESocketReadyState.CONNECTED;
        this._delegate && this._delegate.onConnected && this._delegate.onConnected(event);
    }

    private onMessage(event: MessageEvent) {
        // cc.log(`[WebSocket][${this._url}][Message]`);
        // cc.log(event);
        this._delegate && this._delegate.onMessage && this._delegate.onMessage(event.data);
    }

    private onError(event: ErrorEvent) {
        // cc.log(`[WebSocket][${this._url}][Error]`);
        // cc.log(event);
        if (this._socketReadyState == ESocketReadyState.CONNECTING) {
            this._socketReadyState = ESocketReadyState.CLOSED;
            if (this._webSocket) this._webSocket = null;
            this._delegate && this._delegate.onConnectFailed && this._delegate.onConnectFailed(event);
        }
    }

    private onClose(event: CloseEvent) {
        // cc.log(`[WebSocket][${this._url}][Closed]`);
        // cc.log(event);
        this._socketReadyState = ESocketReadyState.CLOSED;
        if (this._webSocket) this._webSocket = null;
        this._delegate && this._delegate.onDisconnected && this._delegate.onDisconnected(event);
    }

    public get isConnected(): boolean {
        return this._socketReadyState == ESocketReadyState.CONNECTED;
    }

    public get isConnecting(): boolean {
        return this._socketReadyState == ESocketReadyState.CONNECTING;
    }

    public get getReadyState(): ESocketReadyState {
        return this._socketReadyState;
    }
}
