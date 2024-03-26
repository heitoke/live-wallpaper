import { ref } from 'hywer/jsx-runtime';


type WallpaperType = 'image' | 'video' | 'website';

interface Wallpaper {
    type: WallpaperType;
    url: string;
}



const WallpaperImage = ({ url }: { url: string }) => {
    return <img src={url}/>
}

const WallpaperVideo = ({ url }: { url: string }) => {
    return <video autoplay loop>
        <source src={url} type="video/mp4"/>
        <source src={url} type="video/webm"/>
    </video>
}

const WallpaperWebsite = ({ url }: { url: string }) => {
    const webview = document.createElement('webview');

    webview.src = url;

    webview.addEventListener('dom-ready', () => {
        webview.insertCSS('body > .referer-warning { display: none; }');
    });

    return webview;
}


export const App = () => {
    const wallpaper = ref<Wallpaper | null>(null);

    wallpaperAPI.ipc.on('wallpapers:set', (event, { type, url }: Wallpaper) => {
        wallpaper.val = { type, url };
    });

    return <>
        {wallpaper.derive(w => {
            if (!w) return <div></div>;

            const types: Record<WallpaperType, any> = {
                image: WallpaperImage,
                video: WallpaperVideo,
                website: WallpaperWebsite
            };

            return types[w.type]({ url: w.url });
        })}
    </>;
}