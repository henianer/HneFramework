

/*******************************************
脚本: UIMgr
时间: 2021-12-26 11:32
作者: 何斌(1997_10_23@sina.com)
描述:
    UI管理
*******************************************/

import Dictionary from "../../structure/Dictionary";
import Stack from "../../structure/Stack";
import Singleton from "../../util/Singleton";
import { ILoadOptions } from "../load/ILoad";
import LoadMgr from "../load/LoadMgr";
import { EUIType, IUI } from "./IUI";
import UIBase from "./UIBase";

export default class UIMgr extends Singleton<UIMgr> {

    public baseStack: Stack<string> = new Stack();
    public baseDictionary: Dictionary<string, UIBase> = new Dictionary();

    private _canvas: cc.Node;
    public get canvas(): cc.Node {
        if (this._canvas == null) {
            this._canvas = cc.find('Canvas');
        }
        return this._canvas;
    }

    public async create(type: EUIType, loadOptions: ILoadOptions, parent?: cc.Node) {
        let uiPrefab: cc.Prefab = await LoadMgr.instance(LoadMgr).loadPrefab(loadOptions);
        let uiNode: cc.Node = cc.instantiate(uiPrefab);
        if (type === EUIType.Base) {
            uiNode.setParent(this.canvas);
        } else {
            if (parent == null) {
                cc.warn('非主要界面需要传入父节点');
                return;
            } else {
                uiNode.setParent(parent);
            }
        }
    }

    public pushStack() {

    }

}
