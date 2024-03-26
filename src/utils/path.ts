import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


export const getDirname = (path: string = import.meta.url) => {
    return dirname(fileURLToPath(path));
}