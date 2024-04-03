import { ref, derive } from 'hywer/jsx-runtime';

// * Libs
import { $ipc } from '@/libs/ipc';

// * Stores
import { wallpapersStore } from '@/stores/wallpapers';

// * Styles
import './index.scss';

// * UI Components
import { UISelect } from '@/components/ui/select';
import { UIInput } from '@/components/ui/input';

// * Components
import { Card } from '../library';


export const fileTypes = {
    'text/html': 'website',
    'image/png': 'image',
    'image/jpeg': 'image',
    'image/gif': 'image',
    'video/mp4': 'video',
    'video/webm': 'video'
};

export const listFileTypes = Object.keys(fileTypes);


export const InstalledView = () => {
    const list = ref<Array<Wallpaper>>([]);
    const filter = ref<WallpaperType | 'all'>('all');
    const text = ref<string>('');

    return <div class="view installed">
        <div class="bar">
            <UISelect style='margin-right: 12px;'
                items={[
                    { label: 'All' },
                    { label: 'Image' },
                    { label: 'Video' },
                    { label: 'Website' }
                ]}

                onSelect={value => filter.val = value.toLocaleLowerCase() as any}
            />

            <UIInput value={text.val} type='text'
                onUpdate={value => text.val = value}
            />
        </div>

        {derive(() => {
            const filterList = wallpapersStore.list.val.filter(w => {
                const regex = new RegExp(text.val, 'gi');

                return regex.test(w.label) && (filter.val === 'all' ? true : w.type === filter.val);
            });

            return <ul class="list-wallpapers">
                {filterList.map(w => <Card wallpaper={w}/>)}
            </ul>
        }, [list, filter, text])}
    </div>
}