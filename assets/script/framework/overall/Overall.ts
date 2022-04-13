import { EAllEvent } from "../module/event/EAllEvent";
import EventMgr from "../module/event/EventMgr";
import NetLogger from "../prefab/NetLogger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Overall extends cc.Component {

    @property(cc.Prefab)
    private netLogger: cc.Prefab = null;

    private _node_netLogger: cc.Node = null;

    protected onLoad(): void {
        this._nodeInit();
        this._register();
    }

    protected onDestroy(): void {
        this._unregister();
    }

    private _nodeInit() {
        this._node_netLogger = cc.instantiate(this.netLogger);
        this._node_netLogger.active = false;
        this._node_netLogger.parent = this.node;
    }

    /** 注册事件 */
    private _register() {
        EventMgr.instance(EventMgr).on(EAllEvent.NET_CONNECTING, this._connecting, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_CONNECT_FAILED, this._connectFailed, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_CONNECTED, this._connected, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_DISCONNECTED, this._disconnected, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_RECONNECTED, this._reconnected, this);
        EventMgr.instance(EventMgr).on(EAllEvent.NET_LOSS, this._netLoss, this);
    }

    /** 注销事件 */
    private _unregister() {
        EventMgr.instance(EventMgr).off(EAllEvent.NET_CONNECTING, this._connecting, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_CONNECT_FAILED, this._connectFailed, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_CONNECTED, this._connected, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_DISCONNECTED, this._disconnected, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_RECONNECTED, this._reconnected, this);
        EventMgr.instance(EventMgr).off(EAllEvent.NET_LOSS, this._netLoss, this);
    }

    private _connecting(msg) {
        this._node_netLogger.getComponent(NetLogger).show(msg);
    }

    private _disconnected(msg) {
        this._node_netLogger.getComponent(NetLogger).show(msg);
    }

    private _reconnected(msg) {
        this._node_netLogger.getComponent(NetLogger).show(msg).close();
    }

    private _connected(msg) {
        this._node_netLogger.getComponent(NetLogger).show(msg).close();
    }

    private _connectFailed(msg) {
        this._node_netLogger.getComponent(NetLogger).show(msg);
    }

    private _netLoss(msg) {
        this._node_netLogger.getComponent(NetLogger).show(msg);
    }
}
