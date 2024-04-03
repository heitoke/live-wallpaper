import { BrowserWindow, app, screen } from 'electron';
import path from 'path';
import fs from 'fs';

// * Libs
import { $config } from '~/libs/config';

// * Utils
import { getDirname } from '~/utils/path';

// * Modules
import { $windows } from '~/modules/windows';
import { $wallpapers } from '~/modules/wallpapers';

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
                webSecurity: false,
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
            this.win.loadURL('everglow://web/settings.html');
        }

        this.webContentsEvents();
    }


    webContentsEvents() {
        const { ipc, send } = this.win.webContents;

        ipc.handle('app:folder', () => {
            return $config.appFolder;
        });


        ipc.handle('fs:has', (_, path: string) => {
            let a=  fs.existsSync(path);
            console.log(a, path);
            
            return a;
        });

        ipc.handle('fs:mkdir', (_, path: string) => {
            return fs.mkdirSync(path);
        });

        ipc.handle('fs:read', (_, path: string) => {
            return fs.readFileSync(path);
        });

        ipc.handle('fs:write', (_, { path, data, type = 'json' }: { path: string, data: any, type: 'json' | 'buffer' }) => {
            let body;

            if (type === 'json') body = JSON.stringify(data);
            else if (type === 'buffer') body = Buffer.from(data, 'base64');

            return fs.writeFileSync(path, body as any);
        });


        ipc.handle('displays:list', () => {
            return screen.getAllDisplays().map(display => {
                return {
                    ...display,
                    wallpaperId: $config.data.displays[display.id] || null
                }
            });
        });

        ipc.handle('displays:wallpapers:set', (event, { displayId, wallpaperId }: { displayId: number, wallpaperId: string }) => {
            const win = $windows.get<WallpaperWindow>(`display:${displayId}`);
            
            win.setWallpaper(wallpaperId);

            return true;
        });


        ipc.handle('wallpapers:list', (event) => {
            return $wallpapers.list;
        });

        ipc.handle('wallpapers:preview', (event, { url }: { url: string }) => {
            const win = $windows.create('preview', PreviewWindow, true) as PreviewWindow;

            win.win.show();
            win.setWallpaper(url);

            return true;
        });

        ipc.handle('wallpapers:import', async (event, files: Array<File>) => {
            await $wallpapers.importLocalFiles(files);

            this.win.webContents.send('wallpapers:list', $wallpapers.list);

            return true;
        });

        ipc.handle('wallpapers:remove', async (event, { wallpaperId }: { wallpaperId: string }) => {
            $wallpapers.remove(wallpaperId);
            
            this.win.webContents.send('wallpapers:list', $wallpapers.list);

            return true;
        });

        ipc.handle('wallpapers:update', async (event, { wallpaperId, options }: { wallpaperId: string, options: WallpaperOptions }) => {
            const wallpaper = $wallpapers.get(wallpaperId);

            if (!wallpaper) return false;

            wallpaper.options = options;

            await $wallpapers.save();

            return true;
        });
    }
}