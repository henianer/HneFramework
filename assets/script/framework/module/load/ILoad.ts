
/*******************************************
脚本: ILoad
时间: 2021-12-24 14:44
作者: 何斌(1997_10_23@sina.com)
描述:
    加载接口
*******************************************/

export interface ILoad {
    loadPrefab(loadOptions: ILoadOptions);
    loadImage(loadOptions: ILoadOptions);
    loadAudio(loadOptions: ILoadOptions);
    loadFont(loadOptions: ILoadOptions);
}

/** 目标资源的Bundle */
export enum ELoadBundle {
    RESOURCES = 'resources'
}

/** 加载区域预设 */
export enum ELoadPreset {
    LOCAL,
    REMOTE
}


/** 加载选项 */
export interface ILoadOptions {
    uuid?: string;
    url?: string;
    path?: string;
    bundle?: ELoadBundle;
    type?: typeof cc.Asset;
    preset?: ELoadPreset;
}
