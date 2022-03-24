
/*******************************************
脚本: Util
时间: 2022-03-24 14:56
作者: 何斌(1997_10_23@sina.com)
描述:
    常用工具
*******************************************/

export default class Util {

    /** uint8array转base64 */
    public static uint8ArrayToBase64(array: Uint8Array) {
        let CHUNK_SIZE = 0x8000; //arbitrary number
        let index = 0;
        let length = array.length;
        let result = '';
        let slice;
        while (index < length) {
            slice = array.subarray(index, Math.min(index + CHUNK_SIZE, length));
            result += String.fromCharCode.apply(null, slice);
            index += CHUNK_SIZE;
        }
        return Buffer.from(result, 'base64');
    }

    /** uint8array创建图片 */
    public static createIamge(array: Uint8Array) {
        let base64Encode = this.uint8ArrayToBase64(array);
        return 'data:image/png;base64,' + base64Encode;
    }

}
