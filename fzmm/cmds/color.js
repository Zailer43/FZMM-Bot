"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorcmd = void 0;
var main_js_1 = require("../utils/main.js");
var config_json_1 = require("../datos/config.json");
var es_json_1 = require("../lang/es.json");
function colorcmd(bot, username, colorelegido) {
    if (!colorelegido) {
        bot.chat(main_js_1.langformat(es_json_1.color.error, [config_json_1.prefix]));
        return;
    }
    var colores = ['aqua', 'black', 'blue', 'dark_aqua', 'dark_blue', 'dark_gray', 'dark_green', 'dark_purple', 'dark_red', 'gold', 'gray', 'green', 'light_purple', 'red', 'white', 'yellow'];
    if (colores.includes(colorelegido)) {
        var execute = "/execute if entity @a[name=\"" + username + "\",team=!" + username + config_json_1.subfixteams + "] run team ";
        bot.chat(execute + " leave " + username);
        bot.chat(execute + " add " + username + config_json_1.subfixteams);
        bot.chat(execute + " join " + username + config_json_1.subfixteams + " " + username);
        bot.chat("/team modify " + username + config_json_1.subfixteams + " color " + colorelegido);
        bot.chat(es_json_1.color.nuevocolor);
    }
    else {
        bot.chat(main_js_1.langformat(es_json_1.color.desconocido, [config_json_1.prefix]));
    }
}
exports.colorcmd = colorcmd;
