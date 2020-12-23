"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tpscmd = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function tpscmd(bot) {
    var tpscantidad = bot.getTps(), estado = '';
    if (tpscantidad === 20) {
        estado = es_json_1.tps.perfecto;
    }
    else if (tpscantidad === 19) {
        estado = es_json_1.tps.casisinlag;
    }
    else if (tpscantidad >= 16 && tpscantidad <= 18) {
        estado = es_json_1.tps.unpocolag;
    }
    else if (tpscantidad >= 14 && tpscantidad <= 15) {
        estado = es_json_1.tps.lag;
    }
    else if (tpscantidad >= 11 && tpscantidad <= 13) {
        estado = es_json_1.tps.lageado;
    }
    else if (tpscantidad >= 6 && tpscantidad <= 10) {
        estado = es_json_1.tps.muylageado;
    }
    else if (tpscantidad >= 2 && tpscantidad <= 5) {
        estado = es_json_1.tps.injugable;
    }
    else if (tpscantidad >= 0 && tpscantidad <= 1) {
        estado = es_json_1.tps.terrible;
    }
    bot.chat(main_js_1.langformat(es_json_1.tps.mensaje, [tpscantidad.toString(), estado]));
    console.log(main_js_1.langformat(es_json_1.tps.mensaje, [tpscantidad.toString(), estado]));
}
exports.tpscmd = tpscmd;
