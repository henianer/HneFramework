/*******************************************
脚本: PtlDBUpdate
时间: 2022-04-11 14:57
作者: 何斌(1997_10_23@sina.com)
描述:
    改
*******************************************/

import { EResCode, TDBUpdate } from "../../../Post";

export interface ReqDBUpdate {
    update: TDBUpdate;
}

export interface ResDBUpdate {
    resCode: EResCode;
}