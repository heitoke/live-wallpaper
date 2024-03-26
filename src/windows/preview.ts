import { BrowserWindow, Menu, screen } from 'electron';

// * Classes
import { Window } from '~/classes/window';


export class PreviewWindow extends Window {
    constructor() {
        super('preview');
        
        const { size: { width, height } } = screen.getPrimaryDisplay();

        this.win = new BrowserWindow({
            width: width - 128,
            height: height - 128,
            // frame: false,
            titleBarStyle: 'hidden',
            // transparent: true,
            vibrancy: 'fullscreen-ui',
            center: true,
            maximizable: false,
            minimizable: false
        });
        
        this.win.webContents.addListener('dom-ready', () => {
            this.win.webContents.insertCSS(`
            body > .referer-warning {
                display: none;
            }

            body > img {
                pointer-events: none;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
            `);
        });

        this.win.on('close', e => {
            e.preventDefault();

            this.win.hide();
        });
    }

    setWallpaper(url: string) {
        this.win.loadURL(url);
    }
}