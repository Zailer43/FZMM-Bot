"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caraocruz = exports.perdoname = exports.calavera = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function calavera(bot) {
    bot.chat(main_js_1.langformat(es_json_1.random.wither, [Math.floor((Math.random() * 20) + 1).toString()]));
}
exports.calavera = calavera;
function perdoname(bot) {
    var perdonado = Math.round(Math.random() * 2);
    if (perdonado)
        bot.chat(es_json_1.random.perdonado);
    else if (!perdonado)
        bot.chat(es_json_1.random.noperdono);
}
exports.perdoname = perdoname;
function caraocruz(bot) {
    var caraocruz = Math.floor(Math.random() * 2);
    if (caraocruz <= 0.5)
        bot.chat(es_json_1.random.cara);
    else if (caraocruz > 0.5)
        bot.chat(es_json_1.random.cruz);
}
exports.caraocruz = caraocruz;
/*
exports function geitometro(bot: any, username: string) {
    let porcentaje:number = Math.floor(Math.random() * 101);
    bot.chat(langformat('%0$ es un %1$% gei D:', [username, porcentaje]));
}
*/ 
