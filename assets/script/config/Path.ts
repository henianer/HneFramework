
/*******************************************
脚本: Path
时间: 2022-01-11 11:26
作者: 何斌(1997_10_23@sina.com)
描述:
    路径
*******************************************/

import { ELoadBundle, IResOptions } from "../framework/module/load/ILoad";
type PathData = {
    TEST_LOCAL_SPRITE_FRAME_HEAD_ICON: IResOptions,
    TEST_REMOTE_SPRITE_FRAME_HEAD_ICON: IResOptions,

    DIALOG_CHAT_ROOM: IResOptions,
    DIALOG_HOME: IResOptions,

    WIDGET_CHAT_RECORD: IResOptions,
}

let Path: PathData = {
    TEST_LOCAL_SPRITE_FRAME_HEAD_ICON: { path: 'image/head_004', bundle: ELoadBundle.RESOURCES },
    TEST_REMOTE_SPRITE_FRAME_HEAD_ICON: { url: 'https://chweb.fissioncelltech.com/head/head_004.png' },

    DIALOG_CHAT_ROOM: { path: 'prefab/dialog/ChatRoom', bundle: ELoadBundle.RESOURCES },
    DIALOG_HOME: { path: 'prefab/dialog/Home', bundle: ELoadBundle.RESOURCES },

    WIDGET_CHAT_RECORD: { path: 'prefab/widget/ChatRecord', bundle: ELoadBundle.RESOURCES },

}

export default Path;
