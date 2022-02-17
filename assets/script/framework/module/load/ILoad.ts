
/*******************************************
脚本: ILoad
时间: 2021-12-24 14:44
作者: 何斌(1997_10_23@sina.com)
描述:
    加载接口
*******************************************/

export interface ILoad {
    loadPrefab(resOptions: IResOptions);
    loadImage(resOptions: IResOptions);
    loadAudio(resOptions: IResOptions);
    loadFont(resOptions: IResOptions);
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


/** 资源选项 */
export interface IResOptions {
    uuid?: string;
    url?: string; // 链接
    path?: string; // 路径
    bundle?: ELoadBundle; // bundle包
    type?: typeof cc.Asset; // 类型
}

/** 加载选项 */
export interface ILoadOptions {
    preset?: ELoadPreset; // 加载区域（本地、远程
}
