"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = inject;
var main_js_1 = require("./utils/main.js");
var es_json_1 = require("./lang/es.json");
var config_json_1 = require("./datos/config.json");
function inject(bot) {
    bot.on('chat2', function (username, message) {
        if (username === bot.username)
            return;
        console.log(username + ': ' + message);
    });
    bot.on('comando', function (username, message) {
        switch (message.toLowerCase()) {
            case 'test':
                bot.chat(es_json_1.texto.test);
                console.log(es_json_1.texto.test);
                break;
            //startwith help
            case 'help':
                bot.chat(main_js_1.langformat(es_json_1.texto.help.help, [config_json_1.prefix, config_json_1.prefix]));
                break;
            case 'help text':
                bot.chat(es_json_1.texto.help.textinfo);
                main_js_1.sleep(150);
                bot.chat(config_json_1.prefix + "test " + config_json_1.prefix + "nuke " + config_json_1.prefix + "ak-47 " + config_json_1.prefix + "?? " + config_json_1.prefix + "shrug " + config_json_1.prefix + "tableflip " + config_json_1.prefix + "tableflipx2 " + config_json_1.prefix + "f <texto> " + config_json_1.prefix + "hi " + config_json_1.prefix + "wtf " + config_json_1.prefix + "wtfgrupal " + config_json_1.prefix + "magic " + config_json_1.prefix + "calmate " + config_json_1.prefix + "patas " + config_json_1.prefix + "zzz " + config_json_1.prefix + "r1p " + config_json_1.prefix + "conteo " + config_json_1.prefix + "bruh " + config_json_1.prefix + "colores");
                break;
            case 'help tp':
                bot.chat(es_json_1.texto.help.tpinfo);
                main_js_1.sleep(150);
                bot.chat(config_json_1.prefix + "tp <nick> - " + config_json_1.prefix + "pagartp <nick> - " + config_json_1.prefix + "deuda <nick>");
                break;
            case 'bot':
                bot.chat(es_json_1.texto.bot);
                break;
            case 'colores':
                bot.chat(es_json_1.texto.colores);
                break;
            case 'nuke':
                bot.chat(es_json_1.emotes.nuke);
                console.log(es_json_1.emotes.nuke);
                break;
            case 'ak-47':
                bot.chat(es_json_1.emotes.ak47);
                console.log(es_json_1.emotes.ak47);
                break;
            case '??':
                bot.chat(es_json_1.emotes.que);
                console.log(es_json_1.emotes.que);
                break;
            case 'shrug':
                bot.chat(es_json_1.emotes.shrug);
                console.log(es_json_1.emotes.shrug);
                break;
            case 'tableflip':
                bot.chat(es_json_1.emotes.tableflip);
                console.log(es_json_1.emotes.tableflip);
                break;
            case 'tableflipx2':
                bot.chat(es_json_1.emotes.tableflipx2);
                console.log(es_json_1.emotes.tableflipx2);
                break;
            case 'hi':
                bot.chat(es_json_1.emotes.hi);
                console.log(es_json_1.emotes.hi);
                break;
            case 'wtf':
                bot.chat(es_json_1.emotes.wtf);
                console.log(es_json_1.emotes.wtf);
                break;
            case 'wtfgrupal':
                bot.chat(es_json_1.emotes.wtfx3);
                console.log(es_json_1.emotes.wtfx3);
                break;
            case 'magic':
                bot.chat(es_json_1.emotes.magic);
                console.log(es_json_1.emotes.magic);
                break;
            case 'calmate':
                bot.chat(es_json_1.emotes.calmate);
                console.log(es_json_1.emotes.calmate);
                break;
            case 'patas':
                bot.chat(es_json_1.emotes.patas);
                break;
            case 'zzz':
                bot.chat(es_json_1.emotes.zzz);
                console.log(es_json_1.emotes.zzz);
                break;
            case 'f':
                efe(es_json_1.texto.defaultf);
                break;
            case 'r1p':
                r1p();
                break;
            case 'conteo':
                bot.chat(es_json_1.texto.conteoinicio);
                main_js_1.sleep(4000);
                bot.chat('3');
                main_js_1.sleep(1000);
                bot.chat('2');
                main_js_1.sleep(1000);
                bot.chat('1');
                main_js_1.sleep(1000);
                bot.chat(es_json_1.texto.conteofinal);
                break;
            case 'simbolos':
                bot.chat('/tellraw @a {"text":"' + es_json_1.texto.simbolosmsg + '","clickEvent":{"action":"copy_to_clipboard","value":"' + es_json_1.texto.simbolos + '"}}');
                break;
            case es_json_1.texto.bruh:
                bot.chat(es_json_1.texto.bruh);
                console.log(es_json_1.texto.bruh);
                break;
        }
        var cmd = message.split(' ');
        if (cmd[0].toLowerCase() === 'f') {
            if (cmd.length === 1)
                return;
            if (cmd[1].length > 8) {
                bot.chat(es_json_1.texto.errorf);
            }
            else
                efe(cmd[1]);
        }
    });
    bot.on('join', function (player) {
        console.log('+ ' + main_js_1.langformat(es_json_1.texto.entro, [player]));
    });
    bot.on('leave', function (player) {
        console.log('- ' + main_js_1.langformat(es_json_1.texto.salio, [player]));
    });
    bot.on('connect', function () {
        console.info((es_json_1.texto.conectado));
        //console.log(mcData.blocksByName.tnt)
    });
    bot.on('kicked', function (reason) {
        console.log(main_js_1.langformat(es_json_1.texto.kick, [reason]));
    });
    bot.on('whisper', function (username, message) {
        if (username === bot.username)
            return;
        console.log(main_js_1.langformat(es_json_1.texto.tell, [username, message]));
    });
    function efe(f) {
        bot.chat(f + f + f + f);
        main_js_1.sleep(150);
        bot.chat(f);
        main_js_1.sleep(150);
        bot.chat(f + f + f);
        main_js_1.sleep(150);
        bot.chat(f);
        bot.chat(f);
        console.log('F');
    }
    function r1p() {
        es_json_1.texto.r1p.forEach(function (element) {
            bot.chat(element);
            main_js_1.sleep(150);
        });
    }
}
/*
█▄████─█▄████─█▄████
▀▀─▄█▀─▀▀─▄█▀─▀▀─▄█▀
──▄██────▄██────▄██
─▄██▀───▄██▀───▄██▀
─███────███────███
*/ 
