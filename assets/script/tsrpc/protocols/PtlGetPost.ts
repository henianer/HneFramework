
/*******************************************
脚本: PtlGetPost
时间: 2022-04-07 16:16
作者: 何斌(1997_10_23@sina.com)
描述:
    数据库查协议
*******************************************/

import { Post } from "./models/Post";

export interface ReqGetPost {
    _id: string;
}

export interface ResGetPost {
    post: Post;
}
