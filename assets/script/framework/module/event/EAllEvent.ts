
/*******************************************
脚本: EAllEvent
时间: 2022-01-10 09:51
作者: 何斌(1997_10_23@sina.com)
描述:
    事件类型
*******************************************/

export enum EAllEvent {

    // 网络
    NET_CONNECTED = 'netConnected',
    NET_CONNECT_FAILED = 'netConnectFailed',
    NET_DISCONNECTED = 'netDisconnected',
    NET_MESSAGE = 'netMessage',
    NET_RECONNECTED = 'netReconnected'
}