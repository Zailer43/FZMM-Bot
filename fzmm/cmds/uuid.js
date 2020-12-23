"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidcmd = void 0;
var main_js_1 = require("../utils/main.js");
var axios_1 = __importDefault(require("axios"));
var es_json_1 = require("../lang/es.json");
function uuidcmd(bot, nick) {
    var regexnick = /^(\w+)$/;
    if (!regexnick.test(nick)) {
        bot.chat(es_json_1.uuid.alfanumerico);
        return;
    }
    else if (nick.length > 16 || nick.length < 3) {
        bot.chat(es_json_1.uuid.longitud);
        return;
    }
    var uuidresultado = '';
    var espremium = false;
    axios_1.default.get('https://api.mojang.com/users/profiles/minecraft/' + nick)
        .then(function (uuidres) {
        if (!uuidres.data.id) {
            bot.chat(main_js_1.langformat(es_json_1.uuid.noespremium, [nick]));
            return;
        }
        console.log(main_js_1.langformat(es_json_1.uuid.es, [uuidres.data.name, uuidres.data.id]));
        bot.chat(main_js_1.langformat(es_json_1.uuid.es, [uuidres.data.name, uuidres.data.id]));
        axios_1.default.get('https://api.mojang.com/user/profiles/' + uuidres.data.id + '/names')
            .then(function (historial) {
            var longinicks = Object.keys(historial.data).length;
            var historialdenicks = [];
            historial.data.forEach(function (element) {
                historialdenicks.push(element.name);
            });
            var historialnicks = historialdenicks.join(', ');
            bot.chat(main_js_1.langformat(es_json_1.uuid.nicks, [historialnicks]));
            console.log(main_js_1.langformat(es_json_1.uuid.nicks, [historialnicks]));
        })
            .catch(function (error) {
            console.log(error);
        });
    })
        .catch(function (error) {
        console.log(error);
    });
}
exports.uuidcmd = uuidcmd;
