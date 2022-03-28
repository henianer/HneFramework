import Path from "../../config/Path";
import { ELoadPreset } from "../../framework/module/load/ILoad";
import LoadMgr from "../../framework/module/load/LoadMgr";
import MinioMgr, { EGetSuffix, TGetOptions } from "../../framework/module/minio/MinioMgr";
import UIMgr from "../../framework/module/ui/UIMgr";
import { LinkList } from "../../framework/structure/LinkList";

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

    protected onLoad(): void {
        // UIMgr.instance(UIMgr).show(Path.DIALOG_HOME, this.node);
        this.getMinioObject();
    }

    public async getMinioObject() {
        let getOptions: TGetOptions = { bucketName: "test", objectName: "test0", suffix: EGetSuffix.JPG };
        let res = await MinioMgr.instance(MinioMgr).getObject(getOptions);
        this.sprite0.spriteFrame = res;
        getOptions = { bucketName: "test", objectName: "test1", suffix: EGetSuffix.JPG };
        res = await MinioMgr.instance(MinioMgr).getObject(getOptions);
        this.sprite1.spriteFrame = res;
    }
}
