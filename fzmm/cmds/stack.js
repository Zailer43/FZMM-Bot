"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stackcmd = void 0;
var main_js_1 = require("../utils/main.js");
var config_json_1 = require("../datos/config.json");
var es_json_1 = require("../lang/es.json");
function stackcmd(bot, cantidad, tipo) {
    // fz!stack <cantidad> [64 / 16]-> Son ?? stacks y sobra ??
    if (!tipo)
        tipo = 64;
    if (cantidad > 250000) {
        bot.chat(es_json_1.stack.muygrande);
        return;
    }
    else if (cantidad < 0) {
        bot.chat(es_json_1.stack.negativo);
        return;
    }
    if (tipo === 64 || tipo === 16) {
        bot.chat(main_js_1.langformat(es_json_1.stack.msg, [Math.trunc(cantidad / tipo).toString(), tipo.toString(), (cantidad % tipo).toString()]));
    }
    else {
        bot.chat(main_js_1.langformat(es_json_1.stack.sintaxis, [config_json_1.prefix]));
    }
}
exports.stackcmd = stackcmd;
