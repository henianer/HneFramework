
/*******************************************
脚本: ChatRecord
时间: 2022-01-11 14:00
作者: 何斌(1997_10_23@sina.com)
描述:
    聊天记录
*******************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChatRecord extends cc.Component {

    @property(cc.Label)
    public label_chatRecord: cc.Label = null;

    public set string(data: string) {
        this.label_chatRecord.string = data;
    }

}
