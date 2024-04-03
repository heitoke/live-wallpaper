import { $config } from '~/libs/config';


const fileTypes: Record<string, WallpaperType> = {
    'text/html': 'website',
    'image/png': 'image',
    'image/jpeg': 'image',
    'image/gif': 'image',
    'video/mp4': 'video',
    'video/webm': 'video'
};


class Wallpapers {
    private _list: Array<Wallpaper> = [];

    constructor() {
        this.load();
    }


    public get list() {
        return this._list;
    }


    public load() {
        const wallpapers = $config.getFile<Array<Wallpaper>>('/wallpapers.json', []);
        
        Array.prototype.push.apply(this._list, wallpapers);
    }

    public save() {
        return $config.setFile('/wallpapers.json', this._list);
    }


    public importLocalFiles(files: Array<File>) {
        for (const { type: fileType, path, name } of files) {
            const type = fileTypes[fileType as keyof typeof fileTypes];
            const url = 'file://' + path;
    
            this._list.push({
                id: `local_${Date.now() + Math.random()}`,
                type,
                label: name,
                url,
                previewUrl: type === 'image' ? url : '',
                tags: []
            });
        }

        this.save();
    }


    public get(id: string) {
        return this._list.find(w => w.id === id) || null;
    }

    public remove(...ids: Array<string>) {
        this._list = this._list.filter(w => !ids.includes(w.id));

        return true;
    }
}


export const $wallpapers = new Wallpapers();