import { ref } from 'hywer/jsx-runtime';

// * Libs
import { $ipc } from '@/libs/ipc';

// * Stores
import { displaysStore } from '@/stores/displays';
import { wallpapersStore } from '@/stores/wallpapers';

// * Components
import { WallpaperPreview } from '../views/library';

// * Styles
import './index.scss';


async function updateWallpaperOptions(wallpaper: Wallpaper, key: keyof WallpaperOptions, value: any) {
    if (!wallpaper?.options) wallpaper.options = {
        muted: false
    };

    wallpaper.options![key] = value;

    const result = await $ipc.invoke('wallpapers:update', {
        wallpaperId: wallpaper.id,
        options: wallpaper.options
    });

    return result;
}


export const PanelOptions = () => {
    return displaysStore.selected.derive(index => {
        const wallpaper = displaysStore.list.val[index].wallpaper.val;

        if (!wallpaper) return <></>;

        console.log(wallpaper);
        

        return <div class="panel-options">
            <WallpaperPreview
                id={wallpaper.id}
                url={wallpaper.url}
                type={wallpaper.type}
            />

            <div class="name">{wallpaper.label}</div>

            <div class="content">
                <label>
                    <input type="checkbox" checked={wallpaper.options?.muted}
                        onInput={() => updateWallpaperOptions(wallpaper, 'muted', !wallpaper.options?.muted)}
                    />

                    <span>Muted</span>
                </label>
            </div>
        </div>
    });
}