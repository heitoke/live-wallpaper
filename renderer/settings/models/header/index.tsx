// * Libs
import { $ipc } from '@/libs/ipc';

// * Styles
import './index.scss';

// * UI Components
import { UIButton } from '@/components/ui/button';

import { listFileTypes } from '../views/installed';


export const Header = () => {
    function openDialogFiles() {
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = listFileTypes.join(', ');

        input.addEventListener('cancel', input.remove);

        input.addEventListener('input', event => {
            const target = event.target as HTMLInputElement;

            input.remove();

            if (!target.files?.length) return;

            const files: Array<Omit<File, 'arrayBuffer' | 'slice' | 'stream' | 'text'>> = [];

            for (const { name, type, path, size, lastModified, webkitRelativePath } of Array.from(target.files)) {
                if (!listFileTypes.includes(type)) continue;

                files.push({
                    name,
                    type,
                    path,
                    size,
                    lastModified,
                    webkitRelativePath
                });
            }

            if (files.length < 1) return;

            $ipc.invoke('wallpapers:import', files);
        });

        input.click();
    }

    return <header>
        <UIButton label="Import video"
            onClick={openDialogFiles}
        />

        <span class="name">Everglow</span>
    </header>
}