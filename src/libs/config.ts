import { app, screen } from 'electron';
import fs from 'fs';


interface ConfigData {
    displays: Record<number, string | null>;
    downloadFolder: string;
}


class Config {
    readonly appFolder = app.getPath('documents') + '/Everglow';
    private _data: ConfigData;

    constructor() {
        this.checkExistsAppFolder();

        this._data = this.getFile<ConfigData>('config.json', {
            displays: {},
            downloadFolder: this.appFolder + '/Downloads'
        });

        this.checkExistsAppFolder(this.data.downloadFolder);
    }


    get data() {
        return this._data;
    }


    public checkExistsAppFolder(path: string = this.appFolder, type: 'folder' | 'file' = 'folder', data: any = []) {
        if (fs.existsSync(path)) return true;

        if (type === 'folder') fs.mkdirSync(path);
        else if (type === 'file') this.setFile(path, data);

        return true;
    }

    public getFile<Type = any>(fileName: string, defaultData: any = []): Type {
        try {
            this.checkExistsAppFolder();

            const filePath = this.appFolder + '/' + fileName;

            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify(defaultData), { encoding: 'utf-8' });
            }
    
            const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
            return JSON.parse(data) as Type;
        } catch (error) {
            console.log(error);
            
            return defaultData;
        }
    }

    public setFile<Type>(fileName: string, data: Type) {
        try {
            this.checkExistsAppFolder();

            const filePath = this.appFolder + '/' + fileName;

            fs.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf-8' });
        
            return true;
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }


    public async updateData(callback: (data: ConfigData) => void) {
        const cloneData = { ...this.data };

        await callback(cloneData);

        if (this.setFile('/config.json', cloneData)) {
            this._data = cloneData;
        }
    }
}


export const $config = new Config();