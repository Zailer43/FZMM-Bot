"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tageo = exports.sonidocmd = exports.volumencmd = void 0;
var main_js_1 = require("../utils/main.js");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var config_json_1 = require("../datos/config.json");
var es_json_1 = require("../lang/es.json");
var valoresdefault = {
    sonido: 'entity.player.levelup',
    volumen: 8
};
function volumencmd(bot, username, volumen) {
    var regexnumero = /^([0-9]{0,1})$/g;
    if (!volumen) {
        bot.chat(es_json_1.tageos.volumen);
        return;
    }
    else if (!regexnumero.test(volumen.toString())) {
        bot.chat(es_json_1.tageos.volumenesnumero);
        return;
    }
    var datostag = cargardatos();
    var datostagelegido = datostag.find(function (_a) {
        var nick = _a.nick;
        return nick === username;
    });
    if (!datostagelegido) {
        datostag.push({
            nick: username,
            sonido: valoresdefault.sonido,
            volumen: volumen
        });
    }
    else {
        datostagelegido.volumen = volumen;
    }
    guardardatos(datostag);
    bot.chat(es_json_1.tageos.volumencambiado);
}
exports.volumencmd = volumencmd;
function sonidocmd(bot, username, sonido) {
    var sonidosdisponibles = {
        levelup: 'entity.player.levelup',
        beacon: 'beacon.power',
        rayo: 'entity.lightning_bolt.impact',
        netherite: 'block.netherite_block.break',
        explosion: 'entity.generic.explode',
        firework: 'entity.firework_rocket.launch',
        campana: 'block.bell.use',
        aldeano: 'entity.villager.no'
    };
    if (!sonido) {
        bot.chat(main_js_1.langformat(es_json_1.tageos.sonidosdisponibles, [Object.keys(sonidosdisponibles).join(', ')]));
        return;
    }
    sonido = sonido.toLowerCase();
    if (sonidosdisponibles[sonido]) {
        var datostag = cargardatos();
        var datostagelegido2 = datostag.find(function (_a) {
            var nick = _a.nick;
            return nick === username;
        });
        if (!datostagelegido2) {
            datostag.push({
                nick: username,
                sonido: sonidosdisponibles[sonido],
                volumen: valoresdefault.volumen
            });
        }
        else {
            datostagelegido2.sonido = sonidosdisponibles[sonido];
        }
        guardardatos(datostag);
        bot.chat(es_json_1.tageos.sonidocambiado);
    }
    else {
        bot.chat(es_json_1.tageos.sonidoinexistente);
        return;
    }
}
exports.sonidocmd = sonidocmd;
function tageo(bot, username, message) {
    var tagmessage = message.split(' ');
    var maxtageos = 0, cargado = false, datostag;
    tagmessage.forEach(function (element) {
        if (maxtageos === config_json_1.tageosmax)
            return;
        if (element.startsWith('@')) {
            maxtageos++;
            if (!cargado) {
                datostag = cargardatos();
                cargado = true;
            }
            var datostagelegido3 = datostag.find(function (_a) {
                var nick = _a.nick;
                return nick === username;
            });
            if (!datostagelegido3) {
                bot.chat("/execute at " + element.slice(1) + " run playsound " + valoresdefault.sonido + " master " + element.slice(1) + " ~ ~ ~ 0." + valoresdefault.volumen);
            }
            else {
                bot.chat("/execute at " + element.slice(1) + " run playsound " + datostagelegido3.sonido + " master " + element.slice(1) + " ~ ~ ~ 0." + datostagelegido3.volumen);
            }
        }
    });
}
exports.tageo = tageo;
var datostagdirectorio = path_1.default.join(__dirname, '../datos/tageos.json');
function cargardatos() {
    var datostag = require(datostagdirectorio);
    return datostag;
}
function guardardatos(datos) {
    var i = JSON.stringify(datos, null, 2);
    fs_1.default.writeFileSync(datostagdirectorio, i, 'utf-8');
}
