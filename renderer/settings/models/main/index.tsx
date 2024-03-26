import { ref } from 'hywer/jsx-runtime';

// * Styles
import './index.scss';

// * Components
import { Sidebar } from '../sidebar';

// * Views
import { LibraryView } from '../views/library';
import { FavoritesView } from '../views/favorites';
import { PlaylistsView } from '../views/playlists';


export const Main = () => {
    const viewName = ref('library');

    return <main>
        <Sidebar onChangeView={name => viewName.val = name}/>

        <div class="views">
            {viewName.derive(name => {
                switch(name) {
                    case 'library':
                        return LibraryView();
                    case 'favorites':
                        return FavoritesView();
                    case 'playlists':
                        return PlaylistsView();

                    default:
                        return <div>A?</div>;
                }
            })}
        </div>
    </main>
}