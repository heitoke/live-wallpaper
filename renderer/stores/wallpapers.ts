import { ref } from 'hywer/jsx-runtime';

// * Libs
import { $ipc } from '@/libs/ipc';


class Wallpapers {
    private _list = ref<Array<Wallpaper>>([]);


    constructor() {
        $ipc.invoke('wallpapers:list', { type: 'installed' }).then((wallpapers: Array<Wallpaper>) => {
            this._list.val = wallpapers;
        });
    
        $ipc.on('wallpapers:list', (event, wallpapers: Array<Wallpaper>) => {
            this._list.val = wallpapers;
        });
    }


    get list() {
        return this._list;
    }


    has(wallpaperId: string) {
        return this.list.val.findIndex(w => w.id === wallpaperId) > -1;
    }
    
    get(wallpaperId: string) {
        return this.list.val.find(w => w.id === wallpaperId);
    }


    insert(...wallpapers: Array<Wallpaper>) {
        this._list.val = [...this._list.val, ...wallpapers];
    }

    remove(...wallpaperIds: Array<string>) {
        this._list.val = this._list.val.filter(w => !wallpaperIds.includes(w.id));
    }
}


export const wallpapersStore = new Wallpapers();