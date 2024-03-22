import { BrowserWindow } from 'electron';

// * Classes
import { Window } from '../classes/window';


export class SettingsWindow extends Window {
    constructor() {
        super('settings');

        this.win = new BrowserWindow({
            frame: true,
            vibrancy: 'fullscreen-ui',
            roundedCorners: true
        });

        this.win.on('close', e => {
            e.preventDefault();

            this.win.hide();
        });
    }
}