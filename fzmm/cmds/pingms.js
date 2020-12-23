"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingcmd = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function pingcmd(bot, username) {
    try {
        //console.log(bot.players);
        Object.keys(bot.players).forEach(function (element) {
            if (element.toLowerCase() === username.toLowerCase()) {
                var pingms = bot.players[element].ping;
                if (pingms === 0) {
                    bot.chat(es_json_1.ping.recienconectado);
                }
                else {
                    bot.chat(main_js_1.langformat(es_json_1.ping.msg, [element, pingms]));
                    console.log(main_js_1.langformat(es_json_1.ping.msg, [element, pingms]));
                }
                return;
            }
            ;
        });
    }
    catch (e) {
        bot.chat(es_json_1.ping.error);
    }
}
exports.pingcmd = pingcmd;
