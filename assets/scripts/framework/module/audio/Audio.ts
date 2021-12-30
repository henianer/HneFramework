
/*******************************************
脚本: Audio
时间: 2021-12-30 16:27
作者: 何斌(1997_10_23@sina.com)
描述:
    声音
*******************************************/

const MUSIC_VOLUME = 'MUSIC_VOLUME';
const MUSIC_NOT_MUTE = 'MUSIC_NOT_MUTE';
const EFFECT_VOLUME = 'EFFECT_VOLUME';
const EFFECT_NOT_MUTE = 'EFFECT_NOT_MUTE';

export default class Audio {

    private static _musicIsPlaying: boolean = false;
    private static _musicVolume: number = 1; // 声音
    private static _musicNotMute: boolean = true; // 是否没静音
    private static _effectVolume: number = 1;
    private static _effectNotMute: boolean = true;

    public static init() {
        this._musicVolume = Number(localStorage.getItem(MUSIC_VOLUME)) || 1;
        this._musicNotMute = Boolean(localStorage.getItem(MUSIC_NOT_MUTE)) || true;
        this._effectVolume = Number(localStorage.getItem(EFFECT_VOLUME)) || 1;
        this._effectNotMute = Boolean(localStorage.getItem(EFFECT_NOT_MUTE)) || true;

        cc.audioEngine.setMusicVolume(this._musicNotMute ? this._musicVolume : 0);
        cc.audioEngine.setEffectsVolume(this._effectNotMute ? this._effectVolume : 0);
    }

    /****************************************音乐**************************************************/
    /** 渐变退出上一首音乐并播放下一首音乐，同时只能播放一首 */
    public static playMusic(clip: cc.AudioClip, loop: boolean = true, callback: Function = null): Promise<number> {
        return new Promise<number>((resolve: (musicID: number) => void) => {
            if (!this._musicNotMute) return resolve(NaN);
            if (!clip || !clip.loaded) return resolve(NaN);
            let musicID: number;
            if (!this._musicIsPlaying) {
                this._musicIsPlaying = true;
                musicID = cc.audioEngine.playMusic(clip, loop);
                if (callback) {
                    cc.audioEngine.setFinishCallback(musicID, callback);
                }
                return resolve(musicID);
            } else {
                let fadeDuration: number = 0.5;
                let tempMusicVolume: number = this._musicVolume;
                cc.tween(this)
                    .to(fadeDuration, { musicVolume: 0 })
                    .call(() => {
                        this.musicVolume = tempMusicVolume;
                        musicID = cc.audioEngine.playMusic(clip, loop);
                        if (callback) {
                            cc.audioEngine.setFinishCallback(musicID, callback);
                        }
                        return resolve(musicID);
                    })
                    .start()
            }

        });
    }

    public static stopMusic() {
        this._musicIsPlaying = false;
        cc.audioEngine.stopMusic();
    }

    public static pauseMusic() {
        this._musicIsPlaying = false;
        cc.audioEngine.pauseMusic();
    }

    public static resumeMusic() {
        this._musicIsPlaying = true;
        cc.audioEngine.resumeMusic();
    }

    public static get musicIsPlaying():boolean{
        return this._musicIsPlaying;
    }

    public static get musicVolume(): number {
        return this._musicVolume;
    }

    public static set musicVolume(volume: number) {
        this._musicVolume = volume;
        cc.audioEngine.setMusicVolume(volume);
        localStorage.setItem(MUSIC_VOLUME, `${volume}`);
    }

    public static get musicNotMute(): boolean {
        return this._musicNotMute;
    }

    public static set musicNotMute(b: boolean) {
        this._musicNotMute = b;
        cc.audioEngine.setMusicVolume(b ? this._musicVolume : 0);
        localStorage.setItem(MUSIC_NOT_MUTE, `${b}`);
    }

    /****************************************音效**************************************************/
}
