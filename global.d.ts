type WallpaperType = 'image' | 'video' | 'website';


interface WallpaperOptions {
    muted?: boolean;
}

interface Wallpaper {
    id: string;
    label: string;
    previewUrl: string;
    type: WallpaperType;
    url: string;
    tags?: Array<string>;

    options?: WallpaperOptions;
}