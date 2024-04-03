import { ref } from 'hywer/jsx-runtime';

// * Libs
import { $ipc } from '@/libs/ipc';
import { $config } from '@/libs/config';

// * Stores
import { displaysStore } from '@/stores/displays';

// * Styles
import './index.scss';


export const WallpaperPreview = ({ type, url, id }: { type: WallpaperType, url: string, id: string }) => {
    let preview;

    if (type === 'website') {
        preview = <></>;
    } else if (type === 'image') {
        preview = <img src={url}/>
    } else if (type ==='video') {
        preview = <video style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
            <source src={url}></source>
        </video>;
    }
    
    return <div class="wallpaper-preview">{preview}</div>;
}

export const Card = ({ wallpaper: { id, label, url, type } }: { wallpaper: Wallpaper }) => {
    return <div class="card" id={id}>
        <WallpaperPreview type={type} url={url} id={id}/>

        <div class="header">
            <div class="name">{label}</div>

            <div class="type">{type}</div>
        </div>

        <div class="menu">
            <button onClick={() => {
                $ipc.invoke('wallpapers:preview', {
                    url
                })
            }}>Preview</button>

            <button onClick={() => {
                $ipc.invoke('wallpapers:remove', {
                    wallpaperId: id
                })
            }}>Remove</button>

            <button onClick={() => {
                displaysStore.setDisplayWallpaper(displaysStore.selected.val, id);
            }}>Set</button>
        </div>
    </div>
}

// const res = await fetch('https://wallpaper.heito.workers.dev/');

// const list = await res.json() as Array<Wallpaper>;

export const LibraryView = () => {
    return <div class="view library">
        <ul class="list-wallpapers">
            {/* {list.map((wallpaper, i) => {
                return <Card wallpaper={wallpaper}/>
            })} */}
        </ul>
    </div>
}