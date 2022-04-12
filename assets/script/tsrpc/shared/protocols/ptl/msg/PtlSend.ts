
/*******************************************
脚本: PtlSend
时间: 2022-04-12 10:00
作者: 何斌(1997_10_23@sina.com)
描述:
    消息发送接口协议
*******************************************/

import { EResCode, TSend } from "../../../Post";


export interface ReqSend {
    uid: string,
    content: TSend,
}

export interface ResSend {
    time: Date,
    resCode: EResCode
}