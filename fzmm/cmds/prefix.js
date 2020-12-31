"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixcmd = void 0;
var main_js_1 = require("../utils/main.js");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var config_json_1 = require("../datos/config.json");
var es_json_1 = require("../lang/es.json");
var prefixpordefecto = {
    lados: {
        estilo: ['[', ']'],
        color: 'dark_aqua',
        espacios: false
    },
    mensaje: {
        texto: 'FZMM',
        color: 'blue'
    }
};
function estilos(bot, username, estiloelegido) {
    if (!estiloelegido && estiloelegido != 0) {
        bot.chat(main_js_1.langformat(es_json_1.prefixlang.estilos, [config_json_1.prefix]));
        var estilos_1 = cargardatos().estilos;
        var msg_1 = '/tellraw @a "';
        estilos_1.forEach(function (element, index) {
            msg_1 += "\\u00a7a" + index + ": \\u00a72" + element[0].replace('\\', '\\\\') + "test" + element[1].replace('\\', '\\\\') + "   ";
            if ((index % 4) === 3)
                msg_1 += '\\n';
        });
        msg_1 += '"';
        main_js_1.botcmdblock(bot, msg_1);
    }
    else {
        var prefixdatos = cargardatos();
        if (!prefixdatos.usuarios[username])
            prefixdatos.usuarios[username] = prefixpordefecto;
        if (!prefixdatos.estilos[estiloelegido]) {
            bot.chat(es_json_1.prefixlang.estiloinvalido);
            return;
        }
        prefixdatos.usuarios[username].lados.estilo = prefixdatos.estilos[estiloelegido];
        ponerprefix(bot, username);
        guardardatos(prefixdatos);
    }
}
function galeria(bot, username, elegir) {
    if (!elegir && elegir != 0) {
        var galeria_1 = cargardatos().galeria;
        var galeriaarray_1 = [], espacio_1 = '';
        galeria_1.forEach(function (element, index) {
            if (element.lados.espacios)
                espacio_1 = ' ';
            else
                espacio_1 = '';
            galeriaarray_1.push("{\"text\":\"" + index + ": \",\"color\":\"green\"},{\"text\":\"" + element.lados.estilo[0] + espacio_1 + "\",\"color\":\"" + element.lados.color + "\"},{\"text\":\"" + element.mensaje.texto + "\",\"color\":\"" + element.mensaje.color + "\"},{\"text\":\"" + espacio_1 + element.lados.estilo[1] + "   \",\"color\":\"" + element.lados.color + "\"}");
            if ((index % 4) === 3)
                galeriaarray_1.push('"\\n"');
        });
        var msg = "/tellraw @a [" + galeriaarray_1.join(',') + "]";
        main_js_1.botcmdblock(bot, msg);
    }
    else {
        var prefixdatos = cargardatos();
        if (!prefixdatos.usuarios[username])
            prefixdatos.usuarios[username] = prefixpordefecto;
        prefixdatos.usuarios[username] = prefixdatos.galeria[elegir];
        guardardatos(prefixdatos);
        ponerprefix(bot, username);
    }
}
function texto(bot, username, texto) {
    if (!texto)
        bot.chat(main_js_1.langformat(es_json_1.prefixlang.texto, [config_json_1.prefix]));
    else {
        texto = texto.replace(/\/e\//, ' ');
        texto = texto.replace(/\</, '');
        texto = texto.replace(/\>/g, '');
        if (texto.length > 12) {
            bot.chat(es_json_1.prefixlang.textomuylargo);
            return;
        }
        var prefixdatos = cargardatos();
        if (!prefixdatos.usuarios[username])
            prefixdatos.usuarios[username] = prefixpordefecto;
        prefixdatos.usuarios[username].mensaje.texto = texto;
        ponerprefix(bot, username);
        guardardatos(prefixdatos);
    }
}
function color(bot, username, colorelegido, cambiar) {
    if (!cambiar || !['texto', 'lados'].includes(cambiar)) {
        bot.chat(main_js_1.langformat(es_json_1.prefixlang.color, [config_json_1.prefix]));
        return;
    }
    else if (!colorelegido)
        colorelegido = main_js_1.RGBrandom();
    var prefixdatos = cargardatos();
    if (!prefixdatos.usuarios[username])
        prefixdatos.usuarios[username] = prefixpordefecto;
    if (cambiar === 'texto')
        prefixdatos.usuarios[username].mensaje.color = colorelegido;
    else if (cambiar === 'lados')
        prefixdatos.usuarios[username].lados.color = colorelegido;
    ponerprefix(bot, username);
    guardardatos(prefixdatos);
    try {
        bot.chat(main_js_1.botcmdblock(bot, "/tellraw @a [{\"text\":\"" + es_json_1.prefixlang.colorcambiado + "\"},{\"text\":\"\u2589 (" + colorelegido + ")\",\"color\":\"" + colorelegido + "\"}]"));
    }
    catch (e) {
        bot.chat('Casi me crasheo');
        console.log(e);
    }
}
function clear(bot, username) {
    bot.chat("/team modify " + username + config_json_1.subfixteams + " prefix \"\"");
    bot.chat(es_json_1.prefixlang.prefixremovido);
}
function espaciado(bot, username) {
    var prefixdatos = cargardatos();
    if (!prefixdatos.usuarios[username])
        prefixdatos.usuarios[username] = prefixpordefecto;
    prefixdatos.usuarios[username].lados.espacios = !prefixdatos.usuarios[username].lados.espacios;
    ponerprefix(bot, username);
    guardardatos(prefixdatos);
    bot.chat(main_js_1.langformat(es_json_1.prefixlang.espaciosestado, [prefixdatos.usuarios[username].lados.espacios.toString()]));
}
function ponerprefix(bot, username) {
    var datos = cargardatos().usuarios[username];
    if (!datos)
        return;
    var execute = "/execute if entity @a[name=\"" + username + "\",team=!" + username + config_json_1.subfixteams + "] run team ";
    bot.chat(execute + " leave " + username);
    bot.chat(execute + " add " + username + config_json_1.subfixteams);
    bot.chat(execute + " join " + username + config_json_1.subfixteams + " " + username);
    var espacio = '';
    if (datos.lados.espacios)
        espacio = ' ';
    main_js_1.botcmdblock(bot, "/team modify " + username + config_json_1.subfixteams + " prefix [{\"text\":\"" + datos.lados.estilo[0] + espacio + "\",\"color\":\"" + datos.lados.color + "\"},{\"text\":\"" + datos.mensaje.texto + "\",\"color\":\"" + datos.mensaje.color + "\"},{\"text\":\"" + espacio + datos.lados.estilo[1] + " \",\"color\":\"" + datos.lados.color + "\"}]");
    bot.chat(es_json_1.prefixlang.cambiado);
}
function addgaleria(bot, username) {
    var datosprefix = cargardatos();
    if (!datosprefix.usuarios[username])
        return;
    else
        datosprefix.galeria.push(datosprefix.usuarios[username]);
    guardardatos(datosprefix);
    bot.chat(es_json_1.prefixlang.addgaleria);
}
exports.prefixcmd = {
    estilos: estilos,
    texto: texto,
    color: color,
    clear: clear,
    espaciado: espaciado,
    galeria: galeria,
    ponerprefix: ponerprefix,
    addgaleria: addgaleria
};
var datosprefixdirectorio = path_1.default.join(__dirname, '../datos/prefixdatos.json');
function cargardatos() {
    var datosprefix = require(datosprefixdirectorio);
    return datosprefix;
}
function guardardatos(datos) {
    var i = JSON.stringify(datos, null, 2);
    fs_1.default.writeFileSync(datosprefixdirectorio, i, 'utf-8');
}
