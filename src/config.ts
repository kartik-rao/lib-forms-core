declare var __VERSION__ : string;
declare var __API_HOST__ : string;
declare var __DEBUG__ : boolean;
declare var __ENV__ : string;

const matches = location.hostname.match(/^(dev|stage)-.*forms.li$/);
const env = location.hostname == "localhost" ? "dev" : (matches && matches.length >= 1 ? matches[1] : "prod");
const port = location.port && location.port.length > 0 ? `:${location.port}` : "";
const host = `${location.hostname}${port}`

export default {
    env: typeof __ENV__ != undefined ? __ENV__ :env,
    debug: typeof __DEBUG__ == "undefined" ? __DEBUG__ : (env == "dev" || env == "stage" || location.search.indexOf("$$debug")),
    version: typeof __VERSION__ != "undefined" ? __VERSION__ : "6.6.2",
    apiHost : typeof __API_HOST__ != "undefined" ? __API_HOST__ : host
}