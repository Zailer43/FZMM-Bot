"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeoscmd = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function tradeoscmd(bot) {
    var tiempo = bot.time.timeOfDay, ticksporsegundo = 20, tradeo1 = 2000, tradeo2 = 3000, tradeo3 = 5000, tradeo4 = 6000;
    var faltaminuto = 0, faltasegundo = 0;
    if (tiempo < tradeo1) {
        faltasegundo = (tradeo1 - tiempo) / ticksporsegundo;
    }
    else if (tiempo < tradeo2) {
        faltasegundo = (tradeo2 - tiempo) / ticksporsegundo;
    }
    else if (tiempo < tradeo3) {
        faltasegundo = (tradeo3 - tiempo) / ticksporsegundo;
    }
    else if (tiempo < tradeo4) {
        faltasegundo = (tradeo4 - tiempo) / ticksporsegundo;
    }
    else if (tiempo > tradeo1) {
        bot.chat(es_json_1.tradeos.nomastradeos);
        return;
    }
    if (faltasegundo > 60) {
        faltaminuto = Math.round(faltasegundo / 60);
        faltasegundo = faltasegundo % 60;
    }
    faltasegundo = Math.round(faltasegundo);
    bot.chat(main_js_1.langformat(es_json_1.tradeos.msg, [faltaminuto.toString(), faltasegundo.toString()]));
}
exports.tradeoscmd = tradeoscmd;
