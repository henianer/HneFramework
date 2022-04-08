
/*******************************************
脚本: PtlAddPost
时间: 2022-04-07 16:15
作者: 何斌(1997_10_23@sina.com)
描述:
    数据库增协议
*******************************************/

import { Post } from "./models/Post";

export interface ReqAddPost {
    // Pick从类型中取出要用的属性 Omit从类型中剔除不要的属性
    add: Pick<Post, 'author' | 'content' | 'title'>;
}

export interface ResAddPost {
    insertedId: string;
}
