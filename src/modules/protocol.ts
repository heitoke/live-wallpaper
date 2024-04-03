import { protocol, net } from 'electron';
import url from 'url';
import path from 'path';

// * Modules
import { $wallpapers } from './wallpapers';


type RouterHandler = (url: URL, request: Request) => Response | Promise<Response>;

interface Router {
    host: string;
    handler: RouterHandler;
}


const dirname = path.dirname(url.fileURLToPath(import.meta.url));


const routers: Record<string, Router> = {};

const router = (hostName: string, handler: RouterHandler) => {
    routers[hostName] = {
        host: hostName,
        handler
    };
}


router('web', ({ pathname }) => {
    return net.fetch(url.pathToFileURL(path.join(dirname, '/web' + pathname)).toString());
});


export const initProtocolEverglow = () => protocol.handle('everglow', (request) => {
    const url = new URL(request.url);

    const router = routers[url.host];

    if (router) return router.handler(url, request);

    return new Response('A?', {
        status: 404
    });
});