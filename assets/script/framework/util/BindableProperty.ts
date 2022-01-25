
interface IBindableProperty<T> {
    onValueChange(pre: T, cur: T);
    onValueBigger(pre: T, cur: T);
    onValueSmaller(pre: T, cur: T);
    onValueSet(pre: T, cur: T);
}

/*******************************************
脚本: BindableProperty
时间: 2022-01-25 10:04
作者: 何斌(1997_10_23@sina.com)
描述:
    数据驱动
*******************************************/

export default class BindableProperty<T> implements IBindableProperty<T> {
    private _preValue: T = null;
    private _curValue: T = null;
    public get value(): T {
        return this._curValue;
    }
    public set value(value: T) {
        if (this._preValue !== this._curValue) {
            this._preValue = this._curValue;
        }

        if (this._curValue !== value) {
            this._curValue = value;
            this.onValueChange(this._preValue, this._curValue);
        }

        this.onValueSet(this._preValue, this._curValue);

        if (typeof this._preValue == 'number' && typeof this._curValue == 'number' && typeof value == 'number') {
            if (this._curValue > this._preValue) this.onValueBigger(this._preValue, this._curValue);
            else if (this._curValue < this._preValue) this.onValueSmaller(this._preValue, this._curValue);
        }
    }

    /**
     * 值发生变化
     * @param preValue 上一个值
     * @param curValue 当前值
     */
    public onValueChange(preValue: T, curValue: T) { };

    /**
     * 值变大(生效类型:数字)
     * @param preValue
     * @param curValue
     */
    public onValueBigger(preValue: T, curValue: T) { };

    /**
     * 值变小(生效类型:数字)
     * @param preValue
     * @param curValue
     */
    public onValueSmaller(preValue: T, curValue: T) { };

    /**
     * 值赋值
     * @param preValue
     * @param curValue
     */
    public onValueSet(preValue: T, curValue: T) { };
}
