import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('wallpaperAPI', {
    versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    },
    os: {
        arch: process.arch,
        platform: process.platform
    },
    ipc: {
        send: (channel: string, ...args: Array<any>) => {
            return ipcRenderer.send(channel, ...args);
        },
        invoke: (channel: string, ...args: Array<any>) => {
            return ipcRenderer.invoke(channel, ...args);
        },
        on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: Array<any>) => void) => {
            return ipcRenderer.on(channel, listener);
        },
        once: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: Array<any>) => void) => {
            return ipcRenderer.once(channel, listener);
        }
    }
});