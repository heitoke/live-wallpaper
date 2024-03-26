import { ref, derive } from 'hywer';

// * Styles
import './index.scss';

// * UIComponents
import { UIButton } from '@/components/ui/button';
import { UISelect } from '@/components/ui/select';

// * Stores
import { displaysStore } from '@/stores/displays';


const buttons = [
    {
        name: 'library',
        icon: '',
        label: 'Library'
    },
    {
        name: 'favorites',
        icon: '',
        label: 'Favorites'
    },
    {
        name: 'playlists',
        icon: '',
        label: 'Playlists'
    }
];


export const Sidebar = ({ onChangeView }: { onChangeView(name: string): void }) => {
    const selected = ref(0);

    const onSelectedButton = (idx: number) => {
        selected.val = idx;

        onChangeView(buttons[idx].name);
    }

    return <div class="sidebar">
        <ul>
            {buttons.map((btn, idx) => {
                const className = selected.derive(() => selected.val === idx ? 'active' : '');

                return <li class={className}
                    onClick={() => onSelectedButton(idx)}
                >
                    <div></div>

                    <span>{btn.label}</span>
                </li>
            })}
        </ul>

        <UISelect style="margin: 12px 0;"
            items={displaysStore.list.derive((v) => {
                return v.map((d, idx) => ({
                    label: d.name,
                    value: String(idx)
                }))
            }).val}

            onSelect={(id) => {
                displaysStore.set(Number(id));
            }}
        />

        <div style="margin-top: auto;"></div>

        <UIButton label="Open website"/>
    </div>
}