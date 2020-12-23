"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingservercmd = void 0;
var main_js_1 = require("../utils/main.js");
var axios_1 = __importDefault(require("axios"));
var es_json_1 = require("../lang/es.json");
function pingservercmd(bot, ip) {
    axios_1.default.get('https://api.mcsrvstat.us/2/' + ip)
        .then(function (serverdatos) {
        console.log(main_js_1.langformat(es_json_1.pingserver.motd, [serverdatos.data.motd.clean]));
        bot.chat(main_js_1.langformat(es_json_1.pingserver.motd, [serverdatos.data.motd.clean]));
        console.log(main_js_1.langformat(es_json_1.pingserver.jugadores, [serverdatos.data.players.online, serverdatos.data.players.max]));
        bot.chat(main_js_1.langformat(es_json_1.pingserver.jugadores, [serverdatos.data.players.online, serverdatos.data.players.max]));
    })
        .catch(function (error) {
        bot.chat(es_json_1.pingserver.error);
    });
}
exports.pingservercmd = pingservercmd;
