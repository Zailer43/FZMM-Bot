"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGBrandom = exports.botcmdblock = exports.langformat = exports.sleep = void 0;
var config_json_1 = require("../datos/config.json");
var vec3_1 = require("vec3");
function sleep(ms) {
    var r = Date.now() + ms;
    while (Date.now() < r) { }
}
exports.sleep = sleep;
function langformat(message, arr) {
    arr.forEach(function (element, index) {
        message = message.replace("%" + index + "$", element);
    });
    return message;
}
exports.langformat = langformat;
function botcmdblock(bot, message) {
    if (message.length > 255 && config_json_1.usarcommandblock) {
        if (!message.startsWith('/'))
            message = "/tellraw @a \"<[Bot] " + bot.username + "> " + message + "\"";
        bot.chat('/setblock 0 0 0 command_block destroy');
        sleep(500 + bot.entity.ping * 20);
        try {
            bot.setCommandBlock(new vec3_1.Vec3(0, 0, 0), message, {
                mode: 2,
                trackOutput: true,
                conditional: false,
                alwaysActive: true
            });
        }
        catch (e) {
            console.log(e);
            bot.chat('Ocurrió un error al escribir el command bock');
        }
    }
    else {
        bot.chat(message);
    }
}
exports.botcmdblock = botcmdblock;
function RGBrandom() {
    var color = '#';
    for (var i = 0; i != 6; i++)
        color += Math.floor(Math.random() * 16).toString(16);
    return color;
}
exports.RGBrandom = RGBrandom;
