"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64cmd = void 0;
var es_json_1 = require("../lang/es.json");
function base64cmd(bot, modoelegido, message) {
    if (modoelegido === 'decode') {
        var decode = Buffer.from(message, 'base64').toString('binary');
        var asciiregex = /^[\x00-\x7FáéíóúýÁÉÍÓÚçÇ·¨´ºª¿¡]*$/;
        if (!asciiregex.test(decode)) {
            bot.chat(es_json_1.base64.illegalcharacter);
            return;
        }
        bot.chat(decode);
        console.log(decode);
    }
    else if (modoelegido === 'encode') {
        var encode = Buffer.from(message, 'binary').toString('base64');
        bot.chat(encode);
        console.log(encode);
    }
}
exports.base64cmd = base64cmd;
