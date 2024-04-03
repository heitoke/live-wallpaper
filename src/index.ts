import { app, screen } from 'electron';

// * Windows
import { WallpaperWindow } from '~/windows/wallpaper';

// * Modules
import { initProtocolEverglow } from '~/modules/protocol';
import { createAppTray } from '~/modules/tray';
import { $windows } from '~/modules/windows';


app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch('site-isolation-trial-opt-out');
app.commandLine.appendSwitch('enable-gpu-rasterization');


if (!app.requestSingleInstanceLock()) {
	app.quit();
}




function createScreenWindows() {
    const displays = screen.getAllDisplays();

    for (const { id, bounds } of displays) {
        const win = $windows.create(`display:${id}`, WallpaperWindow, false) as WallpaperWindow;
        
        win.setDisplayId(id);
        win.win.setBounds(bounds);
    }
}

app.whenReady().then(() => {
    app.setName('Everglow');

    console.log('Start');
    
    app.dock.hide();

    initProtocolEverglow();

    createScreenWindows();
    createAppTray();
});


app.on('activate', () => {
	if (!$windows.has('display:0')) {
		createScreenWindows();
	}
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});