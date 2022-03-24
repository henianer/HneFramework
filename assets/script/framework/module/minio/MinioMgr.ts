
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
    bucketName: string,
    objectName: string,
    suffix: EGetSuffix
}

@ccclass
export default class MinioMgr extends Singleton<MinioMgr> {

    private minioClient: Minio.Client = null;

    constructor() {
        super();
        this.minioClient = new Minio.Client({
            endPoint: '47.97.35.144', // 47.97.35.144 henianer.cn
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
        this.minioClient.listBuckets((err, buckets) => {
            if (err) return console.log(err);
            console.log(buckets);
        })
    }

    /** 是否存在该桶 */
    public async isBucketExist(bucketName: string) {
        this.minioClient.bucketExists(bucketName, (err, result) => {
            if (err) return console.log(err);
            return result;
        });
    }

    /** 获取单个对象 */
    public getObject(getOptions: TGetOptions) {
        let isExist = this.isBucketExist(getOptions.bucketName);
        if (!isExist) return console.log(`不存在桶:${getOptions.bucketName}`);
        let size = 0;
        this.minioClient.getObject(getOptions.bucketName, `${getOptions.objectName}.${getOptions.suffix}`, (err, dataStream) => {
            if (err) {
                return console.log(err)
            }
            dataStream.on('data', (chunk) => {
                size += chunk.length
                console.log(chunk);
            })
            dataStream.on('end', () => {
                console.log('total size = ' + size)
            })
            dataStream.on('error', (err) => {
                console.log(err)
            })
        })
    }

}
