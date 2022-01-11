
/*******************************************
脚本: ResLoad
时间: 2021-12-24 16:44
作者: 何斌(1997_10_23@sina.com)
描述:
    资源加载
*******************************************/

import { ILoad, ILoadOptions } from "./ILoad";
import Res from "./Res";

export default class ResLoad implements ILoad {

    loadPrefab(loadOptions: ILoadOptions): Res<cc.Prefab> {
        loadOptions.type = cc.Prefab;
        return new Res(loadOptions);
    }

    loadImage(loadOptions: ILoadOptions): Res<cc.SpriteFrame> {
        loadOptions.type = cc.SpriteFrame;
        return new Res(loadOptions);
    }

    loadAudio(loadOptions: ILoadOptions): Res<cc.AudioClip> {
        loadOptions.type = cc.AudioClip;
        return new Res(loadOptions);
    }

    loadFont(loadOptions: ILoadOptions): Res<cc.Font> {
        loadOptions.type = cc.Font;
        return new Res(loadOptions);
    }
}
