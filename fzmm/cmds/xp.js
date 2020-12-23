"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xpcmd = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function xpcmd(bot, nivelactual, niveldeseado, ejemplo) {
    var falta;
    if (nivelactual > niveldeseado) { //intercambia los valores por si confunden la sintaxis del comando así no tira error
        var niveldeseado2 = niveldeseado;
        niveldeseado = nivelactual;
        nivelactual = niveldeseado2;
        bot.chat(es_json_1.xp.alreves);
    }
    var niveldeseadototal = totalxpporlevel(niveldeseado), nivelactualtotal = totalxpporlevel(nivelactual);
    falta = niveldeseadototal - nivelactualtotal;
    if (ejemplo) {
        var ejemplofaltan = void 0, ejemplocantidadxp_1 = 0;
        var entidadesdeejemplo = [{
                entidades: ['creeper', 'enderman', 'pillager', 'zombi'],
                xp: 5
            },
            {
                entidades: ['blaze', 'guardian'],
                xp: 10
            },
            {
                entidades: ['witherboss'],
                xp: 50
            }
        ];
        entidadesdeejemplo.forEach(function (element) {
            if (element.entidades.includes(ejemplo))
                ejemplocantidadxp_1 = element.xp;
        });
        if (!ejemplocantidadxp_1) {
            var entidadeslista_1 = [];
            entidadesdeejemplo.forEach(function (element) {
                element.entidades.forEach(function (element2) {
                    entidadeslista_1.push(element2);
                });
            });
            bot.chat(main_js_1.langformat(es_json_1.xp.errorejemplo, [entidadeslista_1.join(', ')]));
            return;
        }
        ejemplofaltan = Math.round(falta / ejemplocantidadxp_1);
        bot.chat(main_js_1.langformat(es_json_1.xp.msgconejemplo, [ejemplofaltan.toString(), ejemplo.toLowerCase(), niveldeseado.toString()]));
    }
    else {
        bot.chat(main_js_1.langformat(es_json_1.xp.msg, [falta.toString(), nivelactual.toString(), niveldeseado.toString()]));
    }
}
exports.xpcmd = xpcmd;
;
function totalxpporlevel(level) {
    var resultado = 0;
    if (level >= 0 && level <= 16)
        resultado = Math.pow(level, 2) + 6 * level;
    else if (level >= 17 && level <= 31)
        resultado = 2.5 * Math.pow(level, 2) - 40.5 * level + 360;
    else if (level >= 32)
        resultado = 4.5 * Math.pow(level, 2) - 162.5 * level + 2220;
    return resultado;
}
