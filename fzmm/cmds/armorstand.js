"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.armorstandcmd = void 0;
var main_js_1 = require("../utils/main.js");
var es_json_1 = require("../lang/es.json");
function armorstandcmd(bot, username, elegido) {
    var cmdarmorstand = "/execute at " + username + " run data merge entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] {%0$:1b}";
    switch (elegido.toLowerCase()) {
        case 'arms':
            bot.chat(main_js_1.langformat(cmdarmorstand, ['ShowArms']));
            break;
        case 'base':
            bot.chat(main_js_1.langformat(cmdarmorstand, ['NoBasePlate']));
            break;
        case 'small':
            bot.chat(main_js_1.langformat(cmdarmorstand, ['Small']));
            break;
        default:
            return;
    }
    bot.chat("/execute at " + username + " if entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] run tellraw @a \"" + es_json_1.armorstand.funciono + "\"");
    bot.chat("/execute at " + username + " unless entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] run tellraw @a \"" + es_json_1.armorstand.error + "\"");
}
exports.armorstandcmd = armorstandcmd;
