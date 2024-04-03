// * Libs
import { $ipc } from '@/libs/ipc';

// * Components
import { Header } from './models/header';
import { Main } from './models/main';
import { PanelOptions } from './models/options';


export const App = () => {
    return <>
        <Header/>
        <Main/>
        <PanelOptions/>
    </>
}