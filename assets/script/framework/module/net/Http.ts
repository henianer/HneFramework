
/*******************************************
脚本: Http
时间: 2022-01-05 16:19
作者: 何斌(1997_10_23@sina.com)
描述:
    Http
*******************************************/

import { EHttpReadyState, EHttpState } from "./INetwork";

export default class Http {

    public get(url: string) {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = () => {
            if (request.readyState === EHttpReadyState.RESPONSE &&
                (request.status >= EHttpState.SUCCESS && request.status < EHttpState.SUCCESS + 100)) {
                let responseText = request.responseText;
                cc.log(`[GET][${responseText}]`);
                // let responseTestJson = JSON.parse(responseText);
            }
        }
        request.timeout = 8000;
        request.ontimeout = () => {
            console.log("request timeout:", url);
        };
        request.onerror = (event: ProgressEvent) => {
            cc.log(`[Http][Get][${url}][Error]`);
            cc.log(event);
        }
        request.send();
    }

    public post(url: string) {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        request.onreadystatechange = () => {
            if (request.readyState === EHttpReadyState.RESPONSE &&
                (request.status >= EHttpState.SUCCESS && request.status < EHttpState.SUCCESS + 100)) {
                let responseText = request.responseText;
                cc.log(`[POST][${responseText}]`);
            }
        }
        request.timeout = 8000;
        request.ontimeout = () => {
            console.log("request timeout:", url);
        };
        request.onerror = (event: ProgressEvent) => {
            cc.log(`[Http][Post][${url}][Error]`);
            cc.log(event);
        }
        request.send(new Uint8Array([1, 2, 3, 4]));
    }

}
