
/*******************************************
脚本: RoundRectMask
时间: 2021-12-30 16:06
作者: 何斌(1997_10_23@sina.com)
描述:
    圆角遮罩
*******************************************/

cc.macro.ENABLE_WEBGL_ANTIALIAS = true;

const { ccclass, menu, disallowMultiple, requireComponent, executeInEditMode, property } = cc._decorator;

@ccclass()
@executeInEditMode()
@disallowMultiple()
@requireComponent(cc.Mask)
@menu("工具/圆角遮罩")
export class RoundRectMask extends cc.Component {

    @property()
    private _radius: number = 50;
    @property({
        tooltip: "圆角半径:\n0-1之间为最小边长比例值, \n>1为具体像素值"
    })
    public get radius(): number {
        return this._radius;
    }
    public set radius(r: number) {
        this._radius = r;
        this.updateMask(r);
    }

    protected _mask: cc.Mask = null;
    protected _prePosition: cc.Vec3 = cc.Vec3.ZERO;

    protected onEnable(): void {
        this.updateMask(this.radius);
    }

    private updateMask(r: number) {
        this._mask = this.getComponent(cc.Mask);
        let _radius = r >= 0 ? r : 0;
        if (_radius < 1) {
            _radius = Math.min(this.node.width, this.node.height) * _radius;
        }
        this._mask["radius"] = _radius;
        this._mask["onDraw"] = this.onDraw.bind(this._mask);
        this._mask["_updateGraphics"] = this._updateGraphics.bind(this._mask);
        this._mask.type = cc.Mask.Type.RECT;
    }

    private _updateGraphics() {
        //@ts-ignore
        let graphics = this._graphics;
        if (!graphics) {
            return;
        }
        this.onDraw(graphics);
    }

    /**
     * mask 用于绘制罩子的函数.
     * this 指向mask 对象,需要特别注意.
     * @param graphics
     */
    protected onDraw(graphics: cc.Graphics) {
        graphics.clear(false);
        let node = this.node;
        let width = node.width;
        let height = node.height;
        let x = -width * node.anchorX;
        let y = -height * node.anchorY;
        graphics.roundRect(x, y, width, height, this.radius || 0);
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            graphics.stroke();
        } else {
            graphics.fill();
        }
    }
}