import type { Window } from '~/classes/window';


class Windows {
    private list = new Map<string, Window>();


    public has(key: string) {
        return this.list.has(key);
    }

    public get<TypeWindow extends Window>(key: string): TypeWindow {
        return this.list.get(key) as TypeWindow;
    }

    public create<TypeWindow extends typeof Window>(key: string, window: TypeWindow, recreated: boolean = true) {
        if (!recreated && this.has(key)) return this.get(key);

        const newWindow = new window();

        this.list.set(key, newWindow);

        return newWindow;
    }

    public remove(key: string) {
        return this.list.delete(key);
    }
}

export const $windows = new Windows();