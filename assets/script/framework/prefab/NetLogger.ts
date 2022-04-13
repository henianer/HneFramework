
const { ccclass, property } = cc._decorator;

@ccclass
export default class NetLogger extends cc.Component {

    @property(cc.Label)
    private log: cc.Label = null;

    public show(log?: string) {
        if (!this.node.active) this.node.active = true;
        if (log) this.log.string = log;
        return this;
    }

    public close() {
        this.node.active = false;
        this.log.string = '';
    }

}
