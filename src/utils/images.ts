import { nativeImage } from 'electron';

// * Assets
import appIcon from '../../build/icon.png?asset';


export const logoIcon = nativeImage.createFromPath(appIcon);