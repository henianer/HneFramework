/*******************************************
文件: EventManager
创建: 2021年09月09日 17:01
作者: 何斌(1997_10_23@sina.com)
描述:
    事件
*******************************************/

import Dictionary from "../../structure/Dictionary";
import Singleton from "../../util/Singleton";
import { EAllEvent } from "./EAllEvent";

interface EventData {
    callbacks: { callback: Function, target: any }[];
}

export default class EventMgr extends Singleton<EventMgr>{

    private events: Dictionary<EventData> = new Dictionary();

    public on(eventName: EAllEvent, callback: Function, target: any) {
        if (this.events.containsKey(eventName)) {
            let callbacks = this.events.get(eventName).callbacks;
            let isExistCallback = false;
            let isExistTarget = false;
            for (let i = 0; i < callbacks.length; i++) {
                if (callbacks[i].callback === callback && callbacks[i].target === target) {
                    cc.log(`[存在${eventName},存在回调,存在指向,进行覆盖]`);
                    this.events.get(eventName).callbacks[i].callback = callback;
                    this.events.get(eventName).callbacks[i].target = target;
                    isExistCallback = true;
                    isExistTarget = true;
                    break;
                }
            }
            if (!isExistCallback && !isExistTarget) {
                cc.log(`[存在${eventName},不存在回调,不存在指向,进行添加]`);
                this.events.get(eventName).callbacks.push({ callback, target });
            }
            else if (isExistCallback && !isExistTarget) {
                cc.log(`[存在${eventName},存在回调,不存在指向,进行添加]`);
                this.events.get(eventName).callbacks.push({ callback, target });
            }
        }
        else {
            cc.log(`[不存在${eventName},进行注册添加]`);
            this.events.add(eventName, { callbacks: [{ callback, target }] });
        }
    }

    public emit(eventName: EAllEvent, param: any) {
        if (this.events.containsKey(eventName)) {
            let callbacks = this.events.get(eventName).callbacks;
            for (let i = 0; i < callbacks.length; i++) {
                let callback = callbacks[i].callback;
                let target = callbacks[i].target;
                callback.call(target, param);
            }
        }
        else {
            cc.log(`[不存在${eventName}]`);
        }
    }

    public off(eventName: EAllEvent, callback: Function, target: any) {
        if (this.events.containsKey(eventName)) {
            let callbacks = this.events.get(eventName).callbacks;
            let isExistCallback = false;
            let isExistTarget = false;
            for (let i = 0; i < callbacks.length; i++) {
                if (callbacks[i].callback === callback && callbacks[i].target === target) {
                    cc.log(`[存在${eventName},存在回调,存在指向,进行注销]`);
                    this.events.get(eventName).callbacks.splice(i, 1);
                    isExistCallback = true;
                    isExistTarget = true;
                    break;
                }
            }
            if (this.events.get(eventName).callbacks.length === 0) {
                cc.log(`[${eventName}监听回调长度为0,注销此监听]`);
                this.events.delete(eventName);
            }
            if (!isExistCallback) {
                cc.log(`[存在${eventName},不存在回调,注销失败]`);
            }
            else if (isExistCallback && !isExistTarget) {
                cc.log(`[存在${eventName},存在回调,不存在指向,注销失败]`);
            }
        }
        else {
            cc.log(`[不存在${eventName}监听]`);
        }
    }
}