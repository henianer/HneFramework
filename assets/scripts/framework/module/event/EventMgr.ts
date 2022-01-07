/*******************************************
文件: EventManager
创建: 2021年09月09日 17:01
作者: 何斌(1997_10_23@sina.com)
描述:
    事件
*******************************************/

import Dictionary from "../../structure/Dictionary";
import { EAllEvent } from "./EAllEvent";

class Observer {
    private id: number = null;
    private callback: Function = null;
    public constructor(id: number, callback: Function) {
        this.id = id;
        this.callback = callback;
    }

    public notify(...param: any[]) {
        this.callback.call(this, ([...param].length > 0 || undefined) && [...param]);
    }

    public compareId(id: number) {
        return this.id === id;
    }
}

export class EventMgr {
    private static events: Dictionary<Observer[]> = new Dictionary<Observer[]>();

    /**
     * 注册事件
     * @param eventType 事件类型
     * @param id 当前类型里的回调id(注册时id需要大于0)
     * @param callback 回调
     * @returns
     */
    public static register(eventType: EAllEvent, id: number, callback: Function) {
        if (id <= 0) {
            cc.error('register=>[id] must greater than 0')
            return;
        }
        let name = eventType.toString();
        if (!this.events.containsKey(name)) {
            this.events.add(name, []);
        }
        this.events.get(name).push(new Observer(id, callback));
    }

    /**
     * 注销事件
     * @param eventType 事件类型
     * @param id 当前类型里的回调id(注销所有当前类型的回调的id为-1)
     * @returns
     */
    public static unregister(eventType: EAllEvent, id: number) {
        let name = eventType.toString();
        if (!this.events.containsKey(name)) return;
        if (id < 0) {
            this.events.delete(name);
            return;
        }
        let observers: Observer[] = this.events.get(name);
        for (let i = 0; i < observers.length; i++) {
            if (observers[i].compareId(id)) {
                observers.splice(i, 1);
            }
        }
        if (observers.length === 0) this.events.delete(name);
    }

    /**
     * 发送事件
     * @param eventType 事件类型
     * @param id 当前类型里的回调id(触发所有当前类型的回调的id为-1)
     * @param param 不定项参数
     * @returns
     */
    public static send(eventType: EAllEvent, id: number, ...param: any[]) {
        let name = eventType.toString();
        if (!this.events.containsKey(name)) return;
        let observers: Observer[] = this.events.get(name);
        if (id < 0) {
            observers.forEach((observer) => {
                observer.notify(...param);
            });
        } else {
            observers.forEach((observer) => {
                if (observer.compareId(id)) {
                    observer.notify(...param);
                }
            });
        }
    }
}