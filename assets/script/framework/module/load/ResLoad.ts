
/*******************************************
脚本: ResLoad
时间: 2021-12-24 16:44
作者: 何斌(1997_10_23@sina.com)
描述:
    资源加载
*******************************************/

import { ILoad, IResOptions } from "./ILoad";
import Res from "./Res";

export default class ResLoad implements ILoad {

    loadPrefab(resOptions: IResOptions): Res<cc.Prefab> {
        resOptions.type = cc.Prefab;
        return new Res(resOptions);
    }

    loadImage(resOptions: IResOptions): Res<cc.SpriteFrame> {
        resOptions.type = cc.SpriteFrame;
        return new Res(resOptions);
    }

    loadRemoteImage(resOptions: IResOptions):Res<cc.Texture2D>{
        resOptions.type = cc.Texture2D;
        return new Res(resOptions);
    }

    loadAudio(resOptions: IResOptions): Res<cc.AudioClip> {
        resOptions.type = cc.AudioClip;
        return new Res(resOptions);
    }

    loadFont(resOptions: IResOptions): Res<cc.Font> {
        resOptions.type = cc.Font;
        return new Res(resOptions);
    }
}
