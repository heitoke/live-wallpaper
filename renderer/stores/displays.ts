import { ref } from 'hywer/jsx-runtime';

// * Libs
import { $ipc } from '@/libs/ipc';

// * Stores
import { wallpapersStore } from './wallpapers';


class Display {
    id: number;
    name: string;
    bounds: Electron.Rectangle;

    private _wallpaper = ref<Wallpaper | null>(null);

    constructor(display: EverglowDisplay) {
        this.id = display.id;
        this.name = display.label;
        this.bounds = display.bounds;
        
        if (display.wallpaperId && wallpapersStore.has(display.wallpaperId)) {
            this._wallpaper.val = wallpapersStore.get(display.wallpaperId)!;
        }
    }


    get wallpaper() {
        return this._wallpaper;
    }


    setWallpaper(wallpaperId: string) {
        const wallpaper = wallpapersStore.get(wallpaperId);

        if (!wallpaper) return false;

        this._wallpaper.val = wallpaper;

        $ipc.invoke('displays:wallpapers:set', {
            displayId: this.id,
            wallpaperId
        });

        return true;
    }
}


class StoreDisplays {
    private _list = ref<Array<Display>>([]);

    private _selected = ref(0);

    
    get list() {
        return this._list;
    }

    get selected() {
        return this._selected;
    }


    set(id: number) {
        this._selected.val = id;
    }


    async setDisplayWallpaper(displayId: number, wallpaperId: string) {
        const display = this._list.val[displayId];

        if (!display || !wallpapersStore.has(wallpaperId)) return;

        return display.setWallpaper(wallpaperId);
    }


    insert(display: EverglowDisplay) {
        const newDisplay = new Display(display);

        this._list.val = [...this._list.val, newDisplay];

        return newDisplay;
    }
}


export const displaysStore = new StoreDisplays();


const listDisplays = await $ipc.invoke('displays:list') as Array<EverglowDisplay>;

for (const display of listDisplays) {
    console.log(display);
    
    displaysStore.insert(display);
}
