
/*******************************************
脚本: Http
时间: 2022-01-05 16:19
作者: 何斌(1997_10_23@sina.com)
描述:
    Http
*******************************************/

/** 就绪状态 */
export enum EHttpReadyState {
    RequestAfterOpen = 0, // 请求没有发出，在调用open()函数之前为该状态
    RequestAfterSend, // 请求已经建立但还没有发出，在调用send()函数之前为该状态
    RequestDealing, // 请求已经发出正在处理中
    AfterResponse, // 请求已经处理，响应中通常有部分数据可用，但是服务器还没有完成响应
    Response // 响应已经完成，可以访问服务器响应并使用它
}

/** http状态 */
export enum EHttpState {
    NoAccess = 401, // 所访问数据禁止访问
    ReceiveProtection = 403, // 所访问数据收到保护
    WrongUrl = 404, // 错误的URL请求，请求的服务器资源不存在
    Success = 200 // 一切顺利
}

export default class Http {

    public get(url: string) {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = () => {
            if (request.readyState === EHttpReadyState.Response &&
                (request.status >= EHttpState.Success && request.status < EHttpState.Success + 100)) {
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
            if (request.readyState === EHttpReadyState.Response &&
                (request.status >= EHttpState.Success && request.status < EHttpState.Success + 100)) {
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
