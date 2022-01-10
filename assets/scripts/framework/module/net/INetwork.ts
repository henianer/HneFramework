
/*******************************************
脚本: INetwork
时间: 2022-01-06 09:47
作者: 何斌(1997_10_23@sina.com)
描述:
    网络接口
*******************************************/

/** ip或者域名 */
export const IP_OR_DOMAIN = 'henianer.cn'; // 47.97.35.144  henianer.cn

/** 网络的端口 */
export enum ENetworkPort {
    MESSAGE_SERVER = 8888, // 消息传递端口
    DATABASE_SERVER = 0, // 数据库端口
}

/** 网络委托 */
export interface INetworkDelegate {
    onConnected: Function;
    onMessage: Function;
    onConnectFailed: Function;
    onDisconnected: Function;
}

/** 连接网络数据接口 */
export interface INetworkConnectData {
    ip?: string,
    port?: number,
    protocol: ENetworkProtocol,
    url?: string,
    binaryType?: ESocketBinaryType,
    requestType?: EHttpRequestType
}

/** 协议 */
export enum ENetworkProtocol {
    WS = 'ws',
    WSS = 'wss',
    HTTP = 'http',
    HTTPS = 'https'
}

/** socket二进制类型 */
export enum ESocketBinaryType {
    ARRAY_BUFFER = 'arraybuffer',
    BLOB = 'blob'
}

/** socket就绪状态 */
export enum ESocketReadyState {
    CONNECTING,
    CONNECTED,
    CLOSING,
    CLOSED
}

/** http请求方式 */
export enum EHttpRequestType {
    GET = 'Get',
    POST = 'Post'
}

/** 就绪状态 */
export enum EHttpReadyState {
    REQUEST_AFTER_OPEN = 0, // 请求没有发出，在调用open()函数之前为该状态
    REQUEST_AFTER_SEND, // 请求已经建立但还没有发出，在调用send()函数之前为该状态
    REQUEST_DEALING, // 请求已经发出正在处理中
    AFTER_RESPONSE, // 请求已经处理，响应中通常有部分数据可用，但是服务器还没有完成响应
    RESPONSE // 响应已经完成，可以访问服务器响应并使用它
}

/** http状态 */
export enum EHttpState {
    NO_ACCESS = 401, // 所访问数据禁止访问
    RECEIVE_PROTECTION = 403, // 所访问数据收到保护
    WRONG_URL = 404, // 错误的URL请求，请求的服务器资源不存在
    SUCCESS = 200 // 一切顺利
}