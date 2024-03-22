import { BrowserWindow } from 'electron';

// * Classes
import { Window } from '../classes/window';


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
            backgroundColor: '#7579ff',
            roundedCorners: false,
            hasShadow: false,
            skipTaskbar: true
        });

        this.win.on('ready-to-show', () => {
            this.win.show();
        });

        this.setWallpaper('https://cdpn.io/Metty/fullpage/PogmqNW');
        this.win.setSkipTaskbar(true);
        this.win.setIgnoreMouseEvents(false);
        
        this.win.webContents.addListener('dom-ready', () => {
            this.win.webContents.insertCSS(`body > .referer-warning { display: none; }`);
        });
    }

    setWallpaper(url: string) {
        this.win.loadURL(url);
    }
}