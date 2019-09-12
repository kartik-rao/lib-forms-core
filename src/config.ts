declare var __DEBUG__   : boolean;
declare var __ENV__     : string;
declare var __VERSION__ : string;
declare var __HOSTNAME__: string;
declare var __ASSET_PATH__: string;
declare var __API_HOST__    : string;
declare var __AUTO_RENDER__   : string;

export default {
    env: __ENV__,
    debug: __DEBUG__,
    version: __VERSION__,
    hostname: __HOSTNAME__,
    assetPath: __ASSET_PATH__,
    apiHost  : __API_HOST__,
    autoRender: __AUTO_RENDER__
}