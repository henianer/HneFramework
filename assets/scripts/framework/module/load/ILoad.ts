
/*******************************************
脚本: ILoad
时间: 2021-12-24 14:44
作者: 何斌(1997_10_23@sina.com)
描述:
    加载接口
*******************************************/

export interface ILoad {
    loadPrefab(path: string, bundle: ELoadBundle);
    loadImage(path: string, bundle: ELoadBundle);
    loadAudio(path: string, bundle: ELoadBundle);
    loadFont(path: string, bundle: ELoadBundle);
}

export enum ELoadBundle {
    Resources = 'resources'
}

export enum ELoadPreset {
    Local,
    Remote
}

export interface ILoadOptions {
    readonly uuid?: string;
    readonly url?: string;
    readonly path?: string;
    readonly bundle?: string;
    readonly type?: typeof cc.Asset;

    readonly preset?: ELoadPreset;
}