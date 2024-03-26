import { Tray, Menu, screen } from 'electron';

// * Utils
import { logoIcon } from '~/utils/images';

// * Modules
import { $windows } from './windows';

// * Windows
import { SettingsWindow } from '~/windows/settings';
import type { WallpaperWindow } from '~/windows/wallpaper';


const wallpapers = [
    'https://cdpn.io/Metty/fullpage/PogmqNW',
    'https://cdpn.io/leimapapa/fullpage/PoVgQoR',
    'https://cdpn.io/Dillo/fullpage/OJGbpqz',
    'https://cdpn.io/wakana-k/fullpage/gOqqWdY'
]

let selected = 0;


function createTrayMenu() {
    return Menu.buildFromTemplate([
        { role: 'about' },
        { type: 'separator' },
        {
            label: 'Settings',
            click: () => {
                const winSettings = $windows.create('settings', SettingsWindow, false);

                winSettings?.win?.show();
            }
        },
        { type: 'separator' },
        {
            label: 'Screens',
            enabled: false
        },
        ...screen.getAllDisplays().map(({ label }, i) => {
            return {
                type: 'submenu',
                label,
                submenu: wallpapers.map((url, idx) => {
                    return {
                        type: 'radio',  
                        label: `Wallpaper ${idx + 1}`,
                        sublabel: url,
                        checked: idx === 0,
                        click: () => {
                            const winWallpaper = $windows.get<WallpaperWindow>(`display:${i}`);
            
                            if (!winWallpaper) return;
            
                            winWallpaper.setWallpaper('website', url);
                        }
                    }
                })
            } as Electron.MenuItemConstructorOptions;
        }),
        { type: 'separator' },
        { role: 'quit' }
    ]);
}

export function createAppTray() {
    const tray = new Tray(logoIcon.resize({ width: 16, height: 16 }));

    tray.setContextMenu(createTrayMenu());
}