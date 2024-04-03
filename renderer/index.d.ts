type OnListener = (event: Electron.IpcRendererEvent, ...args: Array<any>) => void;

interface IPC {
    send(channel: string, ...args: Array<any>): void;
    invoke<Result = any>(channel: string, ...args: Array<any>): Promise<Result>;
    on(channel: string, listener: OnListener): void;
    once(channel: string, listener: OnListener): void;
}

interface WallpaperAPI {
    appFolder: string;
    versions: Record<'node' | 'chrome' | 'electron', string>;
    os: Record<'arch' | 'platform', string>;
    ipc: IPC;
}

declare const wallpaperAPI: WallpaperAPI;


interface EverglowDisplay extends Electron.Display {
    wallpaperId: string | null;
}