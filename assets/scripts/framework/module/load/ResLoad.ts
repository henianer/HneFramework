
/*******************************************
脚本: ResLoad
时间: 2021-12-24 16:44
作者: 何斌(1997_10_23@sina.com)
描述:
    资源加载
*******************************************/

import { ELoadBundle, ILoad } from "./ILoad";
import Res from "./Res";

export default class ResLoad implements ILoad {

    loadPrefab(path: string, bundle: ELoadBundle): Res<cc.Prefab> {
        throw new Error("Method not implemented.");
    }

    loadImage(path: string, bundle: ELoadBundle): Res<cc.SpriteFrame> {
        return new Res<cc.SpriteFrame>({ path, bundle, type: cc.SpriteFrame });
    }

    loadAudio(path: string, bundle: ELoadBundle): Res<cc.AudioClip> {
        throw new Error("Method not implemented.");
    }

    loadFont(path: string, bundle: ELoadBundle): Res<cc.Font> {
        throw new Error("Method not implemented.");
    }
}
