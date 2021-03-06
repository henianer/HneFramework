
/*******************************************
脚本: UIUtil
时间: 2021-12-30 16:14
作者: 何斌(1997_10_23@sina.com)
描述:
    UI工具
*******************************************/

import Dictionary from "../../structure/Dictionary";

export default class UIUtil extends cc.Component {

    private _uiData: Dictionary<UIUtilData>;

    public init() {
        this._uiData = new Dictionary();
        this.node.children.forEach((child) => {
            this._uiData.add(child.name, new UIUtilData(child));
        })
    }

    public get(path: string): UIUtilData {
        if (this._uiData.containsKey(path)) {
            return this._uiData.get(path);
        } else {
            let nodeFinded = cc.find(path, this.node);
            if (nodeFinded == null) {
                cc.warn('无法按照路径找到物体,路径:' + path);
            } else {
                this._uiData.add(path, new UIUtilData(nodeFinded));
                return this._uiData.get(path);
            }
        }
    }
}

class UIUtilData {
    private _node: cc.Node;
    private set node(_node: cc.Node) {
        this._node = _node;
    }
    public get node() {
        return this._node;
    }

    private _button: cc.Button;
    private set button(_button: cc.Button) {
        this._button = _button;
    }
    public get button() {
        return this._button;
    }

    private _sprite: cc.Sprite;
    private set sprite(_sprite: cc.Sprite) {
        this._sprite = _sprite;
    }
    public get sprite() {
        return this._sprite;
    }

    private _label: cc.Label;
    private set label(_label: cc.Label) {
        this._label = _label;
    }
    public get label() {
        return this._label;
    }

    constructor(node: cc.Node) {
        this.node = node;
        this.button = node.getComponent(cc.Button);
        this.sprite = node.getComponent(cc.Sprite);
        this.label = node.getComponent(cc.Label);
    }

    public buttonAddCallback(targetNode: cc.Node, className: string, callbackName: string) {
        if (this.button == null) {
            return cc.warn('==>当前节点没有按钮组件:' + this.node.name + '<==');
        }

        let clickEvent = new cc.Component.EventHandler();
        clickEvent.target = targetNode;
        clickEvent.component = className;
        clickEvent.handler = callbackName;
        this.button.clickEvents.push(clickEvent);
    }

    public spriteSetSpriteFrame(spriteFrame: cc.SpriteFrame) {
        if (this.sprite == null) {
            return cc.warn('==>当前节点没有精灵组件:' + this.node.name + '<==');
        }
        this.sprite.spriteFrame = spriteFrame;
    }
}
