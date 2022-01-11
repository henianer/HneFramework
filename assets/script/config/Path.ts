
/*******************************************
脚本: Path
时间: 2022-01-11 11:26
作者: 何斌(1997_10_23@sina.com)
描述:
    路径
*******************************************/

import { ELoadBundle, ILoadOptions } from "../framework/module/load/ILoad";

let Path: {
    CHAT_ROOM: ILoadOptions,
    CHAT_RECORD: ILoadOptions,
} = {
    CHAT_ROOM: { path: 'prefab/dialog/ChatRoom', bundle: ELoadBundle.RESOURCES },
    CHAT_RECORD: { path: 'prefab/widget/ChatRecord', bundle: ELoadBundle.RESOURCES }
}

export default Path;
