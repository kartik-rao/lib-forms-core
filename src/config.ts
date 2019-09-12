declare var __DEBUG__   : boolean;
declare var __ENV__     : string;
declare var __VERSION__ : string;
declare var __HOSTNAME__: string;

export default {
    env: __ENV__,
    debug: __DEBUG__,
    version: __VERSION__,
    hostname: __HOSTNAME__
}