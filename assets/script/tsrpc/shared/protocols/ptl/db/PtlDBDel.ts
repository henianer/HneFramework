/*******************************************
脚本: PtlDBDel
时间: 2022-04-11 14:57
作者: 何斌(1997_10_23@sina.com)
描述:
    删
*******************************************/

import { EResCode, TDBDel } from "../../../Post";

export interface ReqDBDel {
    del: TDBDel;
}

export interface ResDBDel {
    resCode: EResCode;
}