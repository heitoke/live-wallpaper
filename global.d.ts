type WallpaperType = 'image' | 'video' | 'website';

interface Wallpaper {
    id: string;
    label: string;
    previewUrl: string;
    type: WallpaperType;
    url: string;
    tags?: Array<string>;
}