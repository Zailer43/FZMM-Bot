"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entidadescmd = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function entidadescmd(bot, message) {
    var entidades = message.split(', ');
    var listaentidades = Array.from(new Set(entidades));
    var cantidadentidades = {}, mayor = 1, mayormob = '', i = 0;
    listaentidades.forEach(function (element) {
        cantidadentidades[element] = 0;
    });
    entidades.forEach(function (element) {
        cantidadentidades[element]++;
    });
    console.log(cantidadentidades);
    for (var x in cantidadentidades) {
        if (cantidadentidades[x] >= mayor) {
            mayor = cantidadentidades[x];
            mayormob = listaentidades[i];
        }
        i++;
    }
    ;
    bot.chat(main_js_1.langformat(es_json_1.entidadescount.msg, [entidades.length.toString(), mayormob, mayor.toString()]));
    console.log(main_js_1.langformat(es_json_1.entidadescount.msg, [entidades.length.toString(), mayormob, mayor.toString()]));
}
exports.entidadescmd = entidadescmd;
