import { app, protocol, net, screen } from 'electron';
import url from 'url';
import path from 'path';

// * Windows
import { WallpaperWindow } from '~/windows/wallpaper';

// * Modules
import { createAppTray } from '~/modules/tray';
import { $windows } from '~/modules/windows';


if (!app.requestSingleInstanceLock()) {
	app.quit();
}

function createScreenWindows() {
    const displays = screen.getAllDisplays();

    for (let i = 0; i < displays.length; i++) {
        const { bounds } = displays[i];

        const { win } = $windows.create(`display:${i}`, WallpaperWindow, false);
        
        win.setBounds(bounds);
    }
}

app.whenReady().then(() => {
    app.setName('Everglow');

    console.log('Start');
    
    app.dock.hide();

    protocol.handle('live-wallpaper', (request) => {
        const filePath = request.url.slice(17);
        const dirname = path.dirname(url.fileURLToPath(import.meta.url));
        
        return net.fetch(url.pathToFileURL(path.join(dirname, filePath)).toString());
    });

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