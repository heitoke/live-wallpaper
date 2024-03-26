import { ref } from 'hywer/jsx-runtime';

// * Libs
import { $ipc } from '@/libs/ipc';


class Display {
    name: string;
    bounds: Electron.Rectangle;

    constructor(display: Electron.Display) {
        this.name = display.label;
        this.bounds = display.bounds;
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


    insert(display: Electron.Display) {
        const newDisplay = new Display(display);

        this._list.val = [...this._list.val, newDisplay];

        return newDisplay;
    }
}


export const displaysStore = new StoreDisplays();


const listDisplays = await $ipc.invoke('displays:list') as Array<Electron.Display>;

for (const display of listDisplays) {
    displaysStore.insert(display);
}
