import { HttpClient } from "tsrpc-browser";
import Path from "../../config/Path";
import { ELoadPreset } from "../../framework/module/load/ILoad";
import LoadMgr from "../../framework/module/load/LoadMgr";
import MinioMgr, { EGetSuffix, TGetOptions } from "../../framework/module/minio/MinioMgr";
import UIMgr from "../../framework/module/ui/UIMgr";
import { LinkList } from "../../framework/structure/LinkList";
import { serviceProto } from "../../tsrpc/protocols/serviceProto";

/*******************************************
脚本: Main
时间: 2021-12-29 14:22
作者: 何斌(1997_10_23@sina.com)
描述:
    主场景
*******************************************/
const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Sprite)
    public sprite0: cc.Sprite = null;

    @property(cc.Sprite)
    public sprite1: cc.Sprite = null;

    private client = new HttpClient(serviceProto, {
        server: 'http://47.97.35.144:8888',
        logger: console
    });

    protected async onLoad(): Promise<void> {
        // UIMgr.instance(UIMgr).show(Path.DIALOG_HOME, this.node);
        // this.getMinioObject();
        let retAdd = await this.client.callApi('AddPost', {
            add: {
                author: '何斌',
                title: '这是一个标题',
                content: '这是内容'
            }
        });

        let insertedId = retAdd.isSucc && retAdd.res.insertedId;

        console.log(insertedId);

        let retGet = await this.client.callApi('GetPost', {
            _id: insertedId
        });

        console.log(retGet.isSucc && retGet.res.post);

        let post = retGet.res!.post;
        post.title = '这是一个新标题';
        post.content = '这是新内容';

        await this.client.callApi('UpdatePost', {
            update: post
        });

        let retGetNew = await this.client.callApi('GetPost', {
            _id: insertedId
        });

        console.log(retGetNew.isSucc && retGetNew.res.post);

        await this.client.callApi('DelPost', {
            _id: insertedId
        });

    }

    //     public async getMinioObject() {
    //         let getOptions: TGetOptions = { bucketName: "test", objectName: "test2", suffix: EGetSuffix.JSON };
    //         // let res = await MinioMgr.instance(MinioMgr).getObject(getOptions);
    //         // this.sprite0.spriteFrame = res;
    //         // getOptions = { bucketName: "test", objectName: "binbin1", suffix: EGetSuffix.JPG };
    //         // res = await MinioMgr.instance(MinioMgr).getObject(getOptions);
    //         // this.sprite1.spriteFrame = res;
    //         // let url = await MinioMgr.instance(MinioMgr).getObjectURL(getOptions);
    //         // console.log(url);
    //         let res = await MinioMgr.instance(MinioMgr).getObject(getOptions);
    //         console.log(res);
    //     }
}
