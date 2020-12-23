"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpcmd = void 0;
var main_js_1 = require("../utils/main.js");
var config_json_1 = require("../datos/config.json");
var es_json_1 = __importDefault(require("../lang/help/es.json"));
var es_json_2 = require("../lang/es.json");
function helpcmd(bot, comandoelegido, pagina) {
    if (comandoelegido === '*') {
        var comandos = es_json_1.default.map(function (element) { return element.cmd; });
        bot.chat(comandos.join(', '));
        console.log(comandos);
        return;
    }
    var helpbuscado = es_json_1.default.find(function (comando) { return comando.cmd === comandoelegido.toLowerCase(); });
    if (helpbuscado) {
        if (helpbuscado.args)
            bot.chat(main_js_1.langformat(es_json_2.helpmsg.cmd, [config_json_1.prefix, helpbuscado.cmd, helpbuscado.args, helpbuscado.msg]));
        else
            bot.chat(main_js_1.langformat(es_json_2.helpmsg.cmdsinargs, [config_json_1.prefix, helpbuscado.cmd, helpbuscado.msg]));
    }
    else if (pagina) {
        if (comandoelegido.toLowerCase() === 'page') {
            var paginanumero = parseInt(pagina);
            var maximopaginas = Math.ceil((es_json_1.default).length / config_json_1.paginasporhelp);
            var regexnumero = /^[0-9]{1,3}$/g;
            if (paginanumero > maximopaginas || paginanumero <= 0 || !regexnumero.test(pagina)) {
                bot.chat(main_js_1.langformat(es_json_2.helpmsg.noexiste, [maximopaginas.toString()]));
                return;
            }
            bot.chat(main_js_1.langformat(es_json_2.helpmsg.top, [pagina, maximopaginas.toString()]));
            for (var i = config_json_1.paginasporhelp * (paginanumero - 1); i != config_json_1.paginasporhelp * (paginanumero - 1) + config_json_1.paginasporhelp; i++) {
                if (!es_json_1.default[i])
                    return;
                if (es_json_1.default[i].args)
                    bot.chat(main_js_1.langformat(es_json_2.helpmsg.cmd, [config_json_1.prefix, es_json_1.default[i].cmd, es_json_1.default[i].args, es_json_1.default[i].msg]));
                else
                    bot.chat(main_js_1.langformat(es_json_2.helpmsg.cmdsinargs, [config_json_1.prefix, es_json_1.default[i].cmd, es_json_1.default[i].msg]));
                main_js_1.sleep(250);
            }
        }
    }
    else
        bot.chat(es_json_2.helpmsg.comandoinexistente);
}
exports.helpcmd = helpcmd;
