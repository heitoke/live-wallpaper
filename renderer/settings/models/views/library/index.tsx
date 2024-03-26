// * Libs
import { $ipc } from '@/libs/ipc';

// * Stores
import { displaysStore } from '@/stores/displays';

// * Styles
import './index.scss';



const Card = ({ wallpaper: { label, url, type } }: { wallpaper: Wallpaper }) => {
    return <div class="card">
        <div class="preview" style={`background-image: url('${url}')`}></div>

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
                $ipc.invoke('displays:wallpapers:set', {
                    displayId: displaysStore.selected.val,
                    type,
                    url,
                })
            }}>Set</button>
        </div>
    </div>
}

const res = await fetch('https://wallpaper.heito.workers.dev/');

const list = await res.json() as Array<Wallpaper>;

export const LibraryView = () => {
    return <div class="view library">
        <ul>
            {list.map((wallpaper, i) => {
                return <Card wallpaper={wallpaper}/>
            })}
        </ul>
    </div>
}