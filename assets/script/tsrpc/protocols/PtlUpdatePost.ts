
/*******************************************
脚本: PtlUpdatePost
时间: 2022-04-07 16:16
作者: 何斌(1997_10_23@sina.com)
描述:
    数据库改协议
*******************************************/

import { Post } from "./models/Post";

export interface ReqUpdatePost {
    // Partial可将类型中的属性都变成可选的 和 _id的必须
    update: Partial<Pick<Post, 'title' | 'content'>> & { _id: string };
}

export interface ResUpdatePost {
    matchedCount: number;
}