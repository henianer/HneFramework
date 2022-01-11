
export default class LocalStorage {

    public static get(key: string): string {
        return localStorage.getItem(key);
    }

    public static set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static remove(key: string) {
        localStorage.removeItem(key);
    }

    public static clear() {
        localStorage.clear();
    }

    public static get count() {
        return localStorage.length;
    }

    public static print() {
        cc.log(localStorage);
    }
}
