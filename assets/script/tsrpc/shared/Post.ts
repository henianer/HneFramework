export interface IUserInfo {
    _id: string;
    uid: string;
    headIcon: string;
    account: string;
    password: string;
    nickName: string;
    introduction: string;
    propertyData: {
        gold: number,
        diamond: number
    };
}

export enum EResCode {
    NON_EXISTENT = 'non-existent',
    SUCCESS = 'success',
    FAIL = 'fail',
    EMPTY = 'empty'
}

/** 数据库操作需要的类型 */
// Pick从类型中取出要用的属性 Omit从类型中剔除不要的属性
export type TDBAdd = Pick<IUserInfo, 'account' | 'password'>;
export type TDBDel = Pick<IUserInfo, 'uid'>;
export type TDBGet = Partial<Pick<IUserInfo, 'account' | 'uid' | 'nickName'>>;
// Partial可将类型中的属性都变成可选的 和 必须的uid
export type TDBUpdate = Partial<Pick<IUserInfo, 'account' | 'password' | 'nickName' | 'introduction' | 'propertyData'>> & { uid: string };

/** 消息操作类型 */
export type TSend = number | string | boolean;
