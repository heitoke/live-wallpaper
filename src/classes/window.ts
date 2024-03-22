import type { BrowserWindow } from 'electron';

export class Window {
    name?: string;
    win: BrowserWindow;

    constructor(name?: string) {
        this.name = name;
    }
}