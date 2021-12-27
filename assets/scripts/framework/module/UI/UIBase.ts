
/*******************************************
脚本: UIBase
时间: 2021-12-25 20:34
作者: 何斌(1997_10_23@sina.com)
描述:
    UI基类
*******************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    /** 页面创建初始化 */
    protected onInit() { }
    /** 页面显示 */
    protected onShow() { }
    /** 页面隐藏 */
    protected onHide() { }
    /** 页面销毁 */
    protected onDelete() { }

}
