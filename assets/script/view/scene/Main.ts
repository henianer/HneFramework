import { HttpClient, WsClient } from "tsrpc-browser";
import Path from "../../config/Path";
import { ELoadPreset } from "../../framework/module/load/ILoad";
import LoadMgr from "../../framework/module/load/LoadMgr";
import MinioMgr, { EGetSuffix, TGetOptions } from "../../framework/module/minio/MinioMgr";
import UIMgr from "../../framework/module/ui/UIMgr";
import { LinkList } from "../../framework/structure/LinkList";
import { serviceProto } from "../../tsrpc/shared/protocols/serviceProto";

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

    // @property(cc.Sprite)
    // public sprite0: cc.Sprite = null;

    // @property(cc.Sprite)
    // public sprite1: cc.Sprite = null;

    protected async onLoad(): Promise<void> {
        UIMgr.instance(UIMgr).show(Path.DIALOG_LOG_IN, this.node);
        // this.getMinioObject()：

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
