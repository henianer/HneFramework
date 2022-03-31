
/*******************************************
脚本: MinioMgr
时间: 2022-03-24 11:10
作者: 何斌(1997_10_23@sina.com)
描述:
    Minio管理
*******************************************/
import * as Minio from "minio";
import Singleton from "../../designPattern/Singleton";
import Util from "../../util/Util";

const { ccclass, property } = cc._decorator;

export enum EGetSuffix {
    JPG = 'jpg',
    JSON = 'json',
    PNG = 'png',
    TXT = 'txt'
}

export type TGetOptions = {
    bucketName: string, // 桶名称
    objectName: string, // 对象主名称
    suffix: EGetSuffix, // 后缀
    expires?: number, // 过期时间 <=7 (取外链时)
}

@ccclass
export default class MinioMgr extends Singleton<MinioMgr> {

    private minioClient: Minio.Client = null;


    constructor() {
        super();
        this.minioClient = new Minio.Client({
            endPoint: 'henianer.cn', // 47.97.35.144 henianer.cn
            port: 9000,
            useSSL: false,
            accessKey: 'minioadmin',
            secretKey: 'minioadmin',
        });
    }

    /** 查看mino服务器数据 */
    public getClientData() {
        console.log(this.minioClient);
    }

    /** 获取所有桶列表 */
    public getListBuckets() {
        return this.minioClient.listBuckets();
    }

    /**
     * 获取指定桶的对象列表
     * @param bucketName 
     * @returns promise<Minio.BucketItem>
     * @example
     *  let data:Minio.BucketItem[] = [];
     *  let stream = await MinioMgr.instance(MinioMgr).getListObjects('***');
     *      stream.on('data', (obj) => { data.push(obj) })
     *      stream.on("end", () => { console.log(data); })
     *      stream.on('error', (err) => { console.log(err); })
     */
    public async getListObjects(bucketName: string) {
        let isExist = await this.isBucketExist(bucketName);
        if (!isExist) return null;
        return this.minioClient.listObjects(bucketName, '', false);
    }

    // public async getBucket(bucketName: string) {
    //     let isExist = await this.isBucketExist(bucketName);
    //     if (!isExist) {
    //         console.log(`不存在桶:${bucketName}`)
    //         return null;
    //     }
    //     // return this.minioClient.listBuckets().
    // }

    public async createBucket(bucketName: string) {
        let isExist = await this.isBucketExist(bucketName);
        if (!isExist) return;
        this.minioClient.makeBucket(bucketName, 'cn-north-1', (err) => {
            if (err) console.log(`创建【${bucketName}】失败`);
            else console.log(`创建【${bucketName}】成功`);
        });
    }

    public async removeBucket(bucketName: string) {
        let isExist = await this.isBucketExist(bucketName);
        if (!isExist) return;
        this.minioClient.removeBucket(bucketName, (err) => {
            if (err) console.log(`删除【${bucketName}】失败`);
            else console.log(`删除【${bucketName}】失败`);
        });
    }

    /** 是否存在该桶 */
    public async isBucketExist(bucketName: string) {
        // this.minioClient.bucketExists(bucketName, (err, exist) => {
        //     if (err) {
        //         console.log(err);
        //         return false;
        //     }
        //     if (exist) {
        //         console.log(`存在桶【${bucketName}】`);
        //         return true;
        //     } else {
        //         console.log(`不存在桶【${bucketName}】`);
        //         return false;
        //     }
        // })
        // TODO console.log('判断桶是否存在的方法未用官方API，之后完善')
        let listBuckets: Minio.BucketItemFromList[] = await this.getListBuckets();
        let isExist = false;
        for (let i = 0; i < listBuckets.length; i++) {
            if (listBuckets[i].name === bucketName) {
                isExist = true;
                break;
            }
        }
        if (!isExist) console.log(`不存在桶【${bucketName}】`);
        return isExist;
    }

    /**
     * 获取对象
     * @param getOptions 参数
     * @returns
     */
    public async getObject(getOptions: TGetOptions): Promise<any> {
        let isExist = await this.isBucketExist(getOptions.bucketName);
        if (!isExist) return null;
        return new Promise<Uint8Array>((resolve, reject) => {
            let size = 0;
            let uint8s: Uint8Array = null;
            let chunks: Uint8Array[] = [];
            this.minioClient.getObject(getOptions.bucketName, `${getOptions.objectName}.${getOptions.suffix}`, (err, stream) => {
                stream.on('data', (chunk) => {
                    size += chunk.length;
                    chunks.push(chunk);
                })
                stream.on('end', () => {
                    // console.log('total size = ' + size);
                    uint8s = new Uint8Array(size);
                    for (let i = 0; i < chunks.length; i++) {
                        uint8s.set(chunks[i]);
                    }
                    return resolve(this.objectParse(uint8s, getOptions.suffix));
                })
                stream.on('error', (err) => {
                    // console.log(err);
                    return reject(err);
                })
            });
        })
    }

    /** 对象解析 */
    public objectParse(stream: Uint8Array, suffix: EGetSuffix) {
        let res = null;
        switch (suffix) {
            case EGetSuffix.JSON:
                res = Util.uint8ArrayToJSON(stream);
                break;
            case EGetSuffix.JPG || EGetSuffix.PNG:
                res = Util.uint8ArrayToIamge(stream);
                break;
            case EGetSuffix.TXT:
                res = Util.uint8ArrayToString(stream);
        }
        return res;
    }

    /**
     * 获取文件外链
     * @param getOptions
     * @returns 地址
     */
    public async getObjectURL(getOptions: TGetOptions) {
        let isExist = await this.isBucketExist(getOptions.bucketName);
        if (!isExist) return null;
        if (getOptions.expires) {
            return this.minioClient.presignedGetObject(
                getOptions.bucketName,
                `${getOptions.objectName}.${getOptions.suffix}`,
                getOptions.expires);
        }
        return this.minioClient.presignedGetObject(getOptions.bucketName, `${getOptions.objectName}.${getOptions.suffix}`);
    }

}
