"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tptogglecmd = exports.deudacmd = exports.restartpsecret = exports.pagartpcmd = exports.tpcmd = void 0;
var main_js_1 = require("../utils/main.js");
var config_json_1 = require("../datos/config.json");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var es_json_1 = require("../lang/es.json");
function tpcmd(bot, username, jugadorobjetivo) {
    if (!config_json_1.administrartp) {
        bot.chat(es_json_1.tp.deshabilitados);
        return;
    }
    else if (!jugadorobjetivo)
        return;
    jugadorobjetivo = jugadorobjetivo.toLowerCase();
    if (username.toLowerCase() === jugadorobjetivo) {
        bot.chat(es_json_1.tp.asimismo);
        return;
    }
    else {
        var estaonline_1 = false;
        var deudas = cargardatos();
        Object.keys(bot.players).forEach(function (element) {
            if (element.toLowerCase() === jugadorobjetivo) {
                estaonline_1 = true;
            }
        });
        if (!deudas[username])
            deudas[username] = {
                deuda: 0,
                toggle: false
            };
        if (deudas[username].deuda >= 5) {
            bot.chat(main_js_1.langformat(es_json_1.tp.deudaalmax, [config_json_1.prefix]));
        }
        else if (!estaonline_1) {
            bot.chat(es_json_1.tp.noestaonline);
        }
        else if (deudas[jugadorobjetivo] && deudas[jugadorobjetivo].toggle) {
            bot.chat(es_json_1.tp.tienetoggle);
        }
        else {
            deudas[username].deuda++;
            bot.chat("/tp " + username + " " + jugadorobjetivo);
            bot.chat(main_js_1.langformat(es_json_1.tp.tudeuda, [deudas[username].deuda.toString()]));
            guardardatos(deudas);
        }
    }
}
exports.tpcmd = tpcmd;
function pagartpcmd(bot, username, jugadorquepaga) {
    if (!config_json_1.administrartp) {
        bot.chat(es_json_1.tp.deshabilitados);
        return;
    }
    var deudas = cargardatos();
    username = username.toLowerCase();
    if (!deudas[username] || deudas[username].deuda <= 0) {
        bot.chat(es_json_1.tp.notienesdeuda);
    }
    else {
        var select = "@a[name=\"" + jugadorquepaga + "\",nbt={SelectedItem:{id:\"" + config_json_1.tpmaterial + "\",Count:64b}}]";
        bot.chat("/execute unless entity " + select + " run tellraw @a \"" + es_json_1.tp.notienescuarzo + "\"");
        bot.chat("/execute if entity " + select + " run tellraw " + bot.username + " \"<" + config_json_1.admin + "> " + config_json_1.prefix + "restartp " + username + "\"");
        bot.chat("/execute if entity " + select + " run clear " + jugadorquepaga + " " + config_json_1.tpmaterial + " 64");
    }
}
exports.pagartpcmd = pagartpcmd;
function restartpsecret(bot, username, restarletp) {
    if (!config_json_1.administrartp) {
        bot.chat(es_json_1.tp.deshabilitados);
        return;
    }
    else if (username != config_json_1.admin && !restarletp)
        return;
    var deudas = cargardatos();
    deudas[restarletp].deuda--;
    bot.chat(main_js_1.langformat(es_json_1.tp.ladeudade, [restarletp, deudas[restarletp].deuda.toString()]));
    if (deudas[restarletp].deuda === 0 && !deudas[restarletp].toggle)
        delete deudas[restarletp];
    guardardatos(deudas);
}
exports.restartpsecret = restartpsecret;
function deudacmd(bot, username) {
    if (!config_json_1.administrartp) {
        bot.chat(es_json_1.tp.deshabilitados);
        return;
    }
    username = username.toLowerCase();
    var deudas = cargardatos();
    var deuda = 0;
    if (deudas[username])
        deuda = deudas[username].deuda;
    bot.chat(main_js_1.langformat(es_json_1.tp.ladeudade, [username, deuda.toString()]));
}
exports.deudacmd = deudacmd;
function tptogglecmd(bot, username, estado) {
    if (!config_json_1.administrartp) {
        bot.chat(es_json_1.tp.deshabilitados);
        return;
    }
    var deudas = cargardatos();
    username = username.toLowerCase();
    if (!deudas[username])
        deudas[username] = {
            deuda: 0,
            toggle: false
        };
    if (estado === 'on')
        deudas[username].toggle = true;
    else if (estado === 'off')
        deudas[username].toggle = false;
    else
        deudas[username.toLowerCase()].toggle = !deudas[username].toggle;
    var msg;
    if (!deudas[username].toggle)
        msg = es_json_1.tp.activado;
    else
        msg = es_json_1.tp.desactivado;
    bot.chat(main_js_1.langformat(es_json_1.tp.toggleado, [msg]));
    if (deudas[username].deuda === 0 && !deudas[username].toggle)
        delete deudas[username];
    guardardatos(deudas);
}
exports.tptogglecmd = tptogglecmd;
var deudasdirectorio = path_1.default.join(__dirname, '../datos/deudas.json');
function cargardatos() {
    var deudas = require(deudasdirectorio);
    return deudas;
}
function guardardatos(datos) {
    var datostp = JSON.stringify(datos, null, 2);
    fs_1.default.writeFileSync(deudasdirectorio, datostp, 'utf-8');
}
