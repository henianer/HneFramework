
/*******************************************
脚本: Util
时间: 2022-03-24 14:56
作者: 何斌(1997_10_23@sina.com)
描述:
    常用工具
*******************************************/

export default class Util {

    /** uint8array转base64 */
    public static uint8ArrayToBase64(stream: Uint8Array | number[]) {
        var array = new Uint8Array(stream);
        var length = array.byteLength;
        var table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'];
        var base64Str = '';
        for (var i = 0; length - i >= 3; i += 3) {
            var num1 = array[i];
            var num2 = array[i + 1];
            var num3 = array[i + 2];
            base64Str += table[num1 >>> 2]
                + table[((num1 & 0b11) << 4) | (num2 >>> 4)]
                + table[((num2 & 0b1111) << 2) | (num3 >>> 6)]
                + table[num3 & 0b111111];
        }
        var lastByte = length - i;
        if (lastByte === 1) {
            var lastNum1 = array[i];
            base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '==';
        } else if (lastByte === 2) {
            var lastNum1 = array[i];
            var lastNum2 = array[i + 1];
            base64Str += table[lastNum1 >>> 2]
                + table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)]
                + table[(lastNum2 & 0b1111) << 2]
                + '=';
        }
        return base64Str;
    }

    // public static base64ToUint8Array() {

    // }

    /** uint8array转JSON */
    public static uint8ArrayToJSON(stream: Uint8Array) {
        let str = String.fromCharCode.apply(null, stream);
        let res = JSON.parse(str);
        return res;
    }

    /** uint8array转图片 */
    public static uint8ArrayToIamge(stream: Uint8Array) {
        // console.log(stream);
        let base64Str = this.uint8ArrayToBase64(stream);
        let data = 'data:image/png;base64,' + base64Str;
        // console.log(data);
        let image = new Image();
        image.src = data;
        let texture = new cc.Texture2D();
        texture.initWithElement(image);
        texture.handleLoadedTexture();
        let spriteFrame = new cc.SpriteFrame(texture);
        // console.log(spriteFrame);
        return spriteFrame;
    }
}
