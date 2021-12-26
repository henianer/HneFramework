
/*******************************************
脚本: IUI
时间: 2021-12-25 20:12
作者: 何斌(1997_10_23@sina.com)
描述:
    UI界面接口
*******************************************/

export interface IUI {
    init();
    show();
    hide();
}

export enum EUIType {
    Base,
    Dialog,
    Widget
}