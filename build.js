import builder from 'electron-builder';

const Platform = builder.Platform;


/** @type { builder.Configuration } */
const builderConfig = {
    directories: {
        output: 'build-app'  
    },
    appId: 'com.heito.everglow',
    productName: 'Everglow',
    mac: {
        category: 'public.app-category.video',
        target: ['dmg', 'zip']
    },
    dmg: {
        icon: 'build/icon.png',
        title: 'Everglow',
        iconSize: 72
    }
}


builder.build({
    targets: Platform.MAC.createTarget(),
    config: builderConfig
}).then((v) => {
    console.log(v);
}).catch((error) => {
    console.log(error);
});