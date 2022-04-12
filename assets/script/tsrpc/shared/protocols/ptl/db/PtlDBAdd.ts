/*******************************************
脚本: PtlDBAdd
时间: 2022-04-11 14:57
作者: 何斌(1997_10_23@sina.com)
描述:
    增
*******************************************/

import { EResCode, TDBAdd } from "../../../Post";

export interface ReqDBAdd {
    add: TDBAdd
}

export interface ResDBAdd {
    resCode: EResCode,
    insertedId: string
}