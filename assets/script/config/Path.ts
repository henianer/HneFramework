
/*******************************************
脚本: Path
时间: 2022-01-11 11:26
作者: 何斌(1997_10_23@sina.com)
描述:
    路径
*******************************************/

import { ELoadBundle, ILoadOptions } from "../framework/module/load/ILoad";

let Path: {
    DIALOG_CHAT_ROOM: ILoadOptions,
    DIALOG_HOME: ILoadOptions,

    WIDGET_CHAT_RECORD: ILoadOptions,
} = {
    DIALOG_CHAT_ROOM: { path: 'prefab/dialog/ChatRoom', bundle: ELoadBundle.RESOURCES },
    DIALOG_HOME: { path: 'prefab/dialog/Home', bundle: ELoadBundle.RESOURCES },

    WIDGET_CHAT_RECORD: { path: 'prefab/widget/ChatRecord', bundle: ELoadBundle.RESOURCES },
}

export default Path;
