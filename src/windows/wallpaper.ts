import { app, BrowserWindow, Menu } from 'electron';
import path from 'node:path';

// * Classes
import { Window } from '~/classes/window';

// * Libs
import { getDirname } from '~/utils/path';


export class WallpaperWindow extends Window {
    constructor() {
        super('wallpaper-screen');
        

        this.win = new BrowserWindow({
            type: 'desktop',
            frame: false,
            x: 0,
            y: 0,
            width: 1440,
            height: 900,
            titleBarStyle: 'hidden',
            roundedCorners: false,
            hasShadow: false,
            skipTaskbar: true,
            enableLargerThanScreen: true,
            transparent: true,
            webPreferences: {
                sandbox: true,
                webviewTag: true,
                preload: path.join(getDirname(), './preloads/wallpaper.js')
            }
        });
        
        if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
            this.win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/wallpaper.html`);
        } else {
            this.win.loadURL('live-wallpaper://web/wallpaper.html');
        }

        this.win.setSkipTaskbar(true);
        this.win.setIgnoreMouseEvents(true);

        this.win.webContents.once('dom-ready', () => {
            this.setWallpaper('website', 'https://cdpn.io/Metty/fullpage/PogmqNW');
        });
    }

    setWallpaper(type: 'image' | 'website' | 'video', url: string) {
        this.win.webContents.send('wallpapers:set', {
            type: type,
            url
        });
    }
}