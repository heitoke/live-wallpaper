class IPC {
    renderer = wallpaperAPI.ipc;


    emit(channel: string, ...args: Array<any>) {
        return this.renderer.send(channel, ...args);
    }

    invoke(channel: string, ...args: Array<any>) {
        return this.renderer.invoke(channel, ...args);
    }

    on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: Array<any>) => void) {
        return this.renderer.on(channel, listener);
    }

    once(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: Array<any>) => void) {
        return this.renderer.once(channel, listener);
    }
}

export const $ipc = new IPC();