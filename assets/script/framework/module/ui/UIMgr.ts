

/*******************************************
脚本: UIMgr
时间: 2021-12-26 11:32
作者: 何斌(1997_10_23@sina.com)
描述:
    UI管理
*******************************************/

import Singleton from "../../designPattern/Singleton";
import Dictionary from "../../structure/Dictionary";
import Stack from "../../structure/Stack";
import { IResOptions } from "../load/ILoad";
import LoadMgr from "../load/LoadMgr";
import { IUI } from "./IUI";
import UIBase from "./UIBase";

export default class UIMgr extends Singleton<UIMgr> {

    private _uiStack: Stack<string> = new Stack();
    private _uiDic: Dictionary<IUI> = new Dictionary();

    private _canvas: cc.Node;
    public get canvas(): cc.Node {
        if (this._canvas == null) {
            this._canvas = cc.find('Canvas');
        }
        return this._canvas;
    }

    /** 初始化页面 */
    private async init(resOptions: IResOptions, parent?: cc.Node): Promise<IUI> {
        if (Object.keys(resOptions).length === 0) {
            cc.warn('==>初始化页面参数传入错误<==');
            return null;
        }
        let path = resOptions.bundle + '/' + resOptions.path;
        if (this._uiDic.containsKey(path)) {
            return this._uiDic.get(path);
        } else {
            let prefab = await LoadMgr.instance(LoadMgr).loadPrefab(resOptions);
            let node = cc.instantiate(prefab);
            let component = node.getComponent(`${node.name}`);
            let ui: IUI;
            if (component) {
                if (component instanceof UIBase) {
                    if (parent) node.parent = parent;
                    else node.parent = this.canvas;
                    ui = component as IUI;
                    ui.initUI();
                } else {
                    cc.warn('==>当前物体脚本未继承UIBase脚本:' + component.name + '<==');
                }
            } else {
                cc.warn('==>当前物体未绑定继承UIBase的脚本:' + node.name + '<==');
            }
            return ui;
        }
    }

    /** 页面入栈(显示) */
    public async show(resOptions: IResOptions, parent?: cc.Node): Promise<IUI> {
        if (Object.keys(resOptions).length === 0) {
            cc.warn('==>显示页面参数传入错误<==');
            return null;
        }
        let path = resOptions.bundle + '/' + resOptions.path;
        if (this._uiStack.count > 0) {
            let _path = this._uiStack.peek();
            this._uiDic.get(_path).hideUI();
        }
        let ui: IUI = await this.init(resOptions, parent);
        ui.showUI();
        this._uiStack.push(path);
        this._uiDic.add(path, ui);
        return ui;
    }

    /** 页面出栈(隐藏、返回) */
    public hide() {
        if (this._uiStack.count <= 1) {
            return;
        }
        let _path = this._uiStack.pop();
        this._uiDic.get(_path).hideUI();

        _path = this._uiStack.peek();
        this._uiDic.get(_path).showUI();
    }
}
