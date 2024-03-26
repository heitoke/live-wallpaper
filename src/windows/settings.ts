import { BrowserWindow, app, ipcMain, screen } from 'electron';
import path from 'path';

// * Utils
import { getDirname } from '~/utils/path';

// * Modules
import { $windows } from '~/modules/windows';

// * Classes
import { Window } from '~/classes/window';

// * Windows
import { type WallpaperWindow } from './wallpaper';
import { PreviewWindow } from './preview';


export class SettingsWindow extends Window {
    constructor() {
        super('settings');

        this.win = new BrowserWindow({
            frame: false,
            titleBarStyle: 'hiddenInset',
            vibrancy: 'fullscreen-ui',
            roundedCorners: true,
            webPreferences: {
                sandbox: true,
                preload: path.join(getDirname(), './preloads/settings.js')
            }
        });

        this.win.on('close', e => {
            e.preventDefault();

            this.win.hide();
        });

        this.win.on('show', () => {
            app.dock.show();
        });

        this.win.on('hide', () => {
            app.dock.hide();
        });

        if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
            this.win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/settings.html`);
        } else {
            this.win.loadURL('live-wallpaper://web/settings.html');
        }

        this.webContentsEvents();
    }


    webContentsEvents() {
        const { ipc } = this.win.webContents;

        ipc.handle('displays:list', () => {
            return screen.getAllDisplays();
        });

        ipc.handle('displays:wallpapers:set', (event, { displayId, type, url }: { displayId: number, type: string, url: string }) => {
            const win = $windows.get<WallpaperWindow>(`display:${displayId}`);

            win.setWallpaper(type as any, url);

            return true;
        });

        ipc.handle('wallpapers:preview', (event, { url }: { url: string }) => {
            const win = $windows.create('preview', PreviewWindow, false) as PreviewWindow;

            win.win.show();
            win.setWallpaper(url);

            return true;
        });
    }
}