import { Menu, Tray, app, nativeImage } from 'electron';

// * Windows
import { WallpaperWindow } from './windows/wallpaper';

// * Modules
import { createAppTray } from './modules/tray';
import { $windows } from './modules/windows';


function createMainWindow() {
    $windows.create('wallpaper', WallpaperWindow, false);
}


if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.whenReady().then(() => {
    console.log('Start');
    
    createMainWindow();

    // app.dock.hide();
    createAppTray();
});

app.on('activate', () => {
	if (!$windows.has('wallpaper')) {
		createMainWindow();
	}
});



app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});