import { $ipc } from './ipc';


class Config {
    private _appFolder: string = '';

    constructor() {
        $ipc.invoke('app:folder').then(folder => {
            this._appFolder = folder;
        });
    }


    get appFolder() {
        return this._appFolder;
    }


    has(path: string) {
        return $ipc.invoke('fs:has', path);
    }

    read(path: string) {
        return $ipc.invoke('fs:read', path);
    }

    write(path: string, data: any, type: 'json' | 'buffer') {
        return $ipc.invoke('fs:write', {
            path,
            data,
            type
        });
    }

    mkdir(path: string) {
        return $ipc.invoke('fs:mkdir', path);
    }
}


export const $config = new Config();