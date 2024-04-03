import { app, BrowserWindow, screen } from 'electron';
import path from 'node:path';

// * Classes
import { Window } from '~/classes/window';
import { $wallpapers } from '~/modules/wallpapers';

// * Libs
import { getDirname } from '~/utils/path';
import { $config } from '~/libs/config';


export class WallpaperWindow extends Window {
    private _displayId: number = -1;
    private currentWallpaperId: string = '';

    constructor() {
        super('wallpaper-screen');
        

        this.win = new BrowserWindow({
            type: 'desktop',
            frame: false,
            x: 0,
            y: 0,
            titleBarStyle: 'hidden',
            roundedCorners: false,
            hasShadow: false,
            skipTaskbar: true,
            enableLargerThanScreen: true,
            transparent: true,
            webPreferences: {
                webSecurity: false,
                webviewTag: true,
                preload: path.join(getDirname(), './preloads/wallpaper.js')
            }
        });
        
        if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
            this.win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/wallpaper.html`);
        } else {
            this.win.loadURL('everglow://web/wallpaper.html');
        }


        this.win.setSkipTaskbar(true);
        this.win.setIgnoreMouseEvents(true);

        
        this.win.once('show', () => {
            const displays = screen.getAllDisplays();

            const [x, y] = this.win.getPosition();

            const display = displays.find(({ bounds }) => bounds.x === x && bounds.y === y);

            if (!display) return;

            this._displayId = display.id;

            if ($config.data.displays[display.id]) {
                this.win.webContents.once('dom-ready', () => {
                    this.setWallpaper($config.data.displays[display.id]!);
                });
            }
        });
    }


    get displayId() {
        return this._displayId;
    }

    get currentWallpaper() {
        return $wallpapers.list.find(({ id }) => id === this.currentWallpaperId);
    }


    public setDisplayId(id: number) {
        if (this._displayId > -1) return;

        this._displayId = id;
    }


    public setWallpaper(wallpaperId: string) {
        this.currentWallpaperId = wallpaperId;

        if (!this.currentWallpaper) return;

        this.win.webContents.send('wallpapers:set', this.currentWallpaper);

        this.win.webContents.setAudioMuted(this.currentWallpaper?.options?.muted || false);

        $config.updateData(data => {
            data.displays[this.displayId] = this.currentWallpaperId;
        });
    }
}