/*******************************************
脚本: PtlDBGet
时间: 2022-04-11 14:57
作者: 何斌(1997_10_23@sina.com)
描述:
    查
*******************************************/

import { EResCode, IUserInfo, TDBGet } from "../../../Post";

export interface ReqDBGet {
    get: TDBGet;
}

export interface ResDBGet {
    resCode: EResCode;
    userInfo: IUserInfo;
}