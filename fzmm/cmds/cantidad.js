"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cantidadcmd = void 0;
var main_js_1 = require("../utils/main.js");
var config_json_1 = require("../datos/config.json");
var es_json_1 = require("../lang/es.json");
function cantidadcmd(bot, stacks, sobra, tipo) {
    // fz!cantidad 64 <cantidad (stacks)> <sobra> -> Son ?? Items
    if (!sobra)
        sobra = 0;
    if (!tipo)
        tipo = 64;
    if (stacks > 25000 || sobra > tipo) {
        bot.chat(es_json_1.cantidad.muygrande);
    }
    else if (stacks < 0 || sobra < 0) {
        bot.chat(es_json_1.cantidad.negativo);
    }
    else if (tipo === 64 || tipo === 16) {
        bot.chat(main_js_1.langformat(es_json_1.cantidad.msg, [(stacks * tipo + sobra).toString()]));
    }
    else {
        bot.chat(main_js_1.langformat(es_json_1.cantidad.sintaxis, [config_json_1.prefix]));
    }
}
exports.cantidadcmd = cantidadcmd;
