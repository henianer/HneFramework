
/*******************************************
脚本: Socket
时间: 2022-01-05 09:54
作者: 何斌(1997_10_23@sina.com)
描述:
    Socket
*******************************************/

/** 就绪状态 */
export enum ESocketReadyState {
    Connecting,
    Connected,
    Closing,
    Closed
}

export enum EBinaryType {
    ArrayBuffer = 'arraybuffer',
    Blob = 'blob'
}

export interface ISocketConnectData {
    ip?: string,
    port?: number,
    protocol?: string,
    url?: string,
    binaryType?: EBinaryType
}

export interface ISocketDelegate {
    onConnected?: Function;
    onMessage?: Function;
    onConnectFailed?: Function;
    onDisconnected?: Function;
}

export default class Socket {
    private _webSocket: WebSocket = null;
    private _socketReadyState: ESocketReadyState = null;
    private _binaryType: EBinaryType = EBinaryType.ArrayBuffer; // 默认为ArrayBuffer
    private _delegate: ISocketDelegate = null;

    private _ip: string = null;
    private _port: number = null;
    private _protocol: string = null;

    private _url: string = null;

    public init(socketConnectData: ISocketConnectData, delegate?: ISocketDelegate) {
        if (socketConnectData.url) {
            this._url = socketConnectData.url;
        } else {
            this._ip = socketConnectData.ip;
            this._port = socketConnectData.port;
            this._protocol = socketConnectData.protocol;
            this._url = `${this._protocol}://${this._ip}:${this._port}`;
        }
        if (delegate) this._delegate = delegate;
        if (socketConnectData.binaryType) this._binaryType = socketConnectData.binaryType;
        cc.log(`[WebSocket][${this._url}][Init]`);
    }

    public connect() {
        if (this._webSocket && this._webSocket.readyState === ESocketReadyState.Connecting) {
            cc.log(`[WebSocket][${this._url}][Already Connecting]`);
            return;
        }
        this.close();
        cc.log(`[WebSocket][${this._url}][Connecting]`);
        this._webSocket = new WebSocket(this._url);
        this._webSocket.binaryType = this._binaryType;
        this._socketReadyState = ESocketReadyState.Connecting;
        this._webSocket.onopen = this.onOpen.bind(this);
        this._webSocket.onmessage = this.onMessage.bind(this);
        this._webSocket.onerror = this.onError.bind(this);
        this._webSocket.onclose = this.onClose.bind(this);
    }

    public close() {
        if (this._webSocket) {
            cc.log(`[WebSocket][${this._url}][Closing]`);
            this._socketReadyState = ESocketReadyState.Closing;
            this._webSocket.close();
        } else {
            this._socketReadyState = ESocketReadyState.Closed;
        }
    }

    private onOpen(event: MessageEvent) {
        cc.log(`[WebSocket][${this._url}][Connected]`);
        this._socketReadyState = ESocketReadyState.Connected;
        this._delegate && this._delegate.onConnected && this._delegate.onConnected(event.data);
    }

    private onMessage(event: MessageEvent) {
        cc.log(`[WebSocket][${this._url}][Message]`);
        // cc.log(event);
        this._delegate && this._delegate.onMessage && this._delegate.onMessage(event.data);
    }

    private onError(event: MessageEvent) {
        cc.log(`[WebSocket][${this._url}][Error]`);
        // cc.log(event);
        if (this._socketReadyState == ESocketReadyState.Connecting) {
            this._socketReadyState = ESocketReadyState.Closed;
            if (this._webSocket) this._webSocket = null;
            this._delegate && this._delegate.onConnectFailed && this._delegate.onConnectFailed(event.data);
        }
    }

    private onClose(event: MessageEvent) {
        cc.log(`[WebSocket][${this._url}][Closed]`);
        // cc.log(event);
        this._socketReadyState = ESocketReadyState.Closed;
        if (this._webSocket) this._webSocket = null;
        this._delegate && this._delegate.onDisconnected && this._delegate.onDisconnected(event.data);
    }

    public get isConnected(): boolean {
        return this._socketReadyState == ESocketReadyState.Connected;
    }

    public get isConnecting(): boolean {
        return this._socketReadyState == ESocketReadyState.Connecting;
    }

    public get getReadyState(): ESocketReadyState {
        return this._socketReadyState;
    }
}
