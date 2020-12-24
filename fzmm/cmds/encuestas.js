"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spamencuestas = exports.encuestascmd = exports.votecmd = void 0;
var main_js_1 = require("../utils/main.js");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var config_json_1 = require("../datos/config.json");
var es_json_1 = require("../lang/es.json");
function votecmd(bot, username, idvoto, voto) {
    var lasencuestas = cargardatos();
    var encuestaelegida = lasencuestas.find(function (_a) {
        var id = _a.id;
        return id === idvoto;
    });
    if (encuestaelegida) {
        if (encuestaelegida.votantes.includes(username)) {
            bot.chat(es_json_1.encuestas.yavotaste);
            return;
        }
        else if (Object.keys(encuestaelegida.votos).includes(voto)) {
            encuestaelegida.votos[voto]++;
            encuestaelegida.votantes.push(username);
            bot.chat(es_json_1.encuestas.gracias);
            guardardatos(lasencuestas);
        }
        else {
            bot.chat(main_js_1.langformat(es_json_1.encuestas.respuestainvalida, [Object.keys(encuestaelegida.votos).join(' / ')]));
        }
    }
    else {
        bot.chat(es_json_1.encuestas.idincorrecta);
    }
}
exports.votecmd = votecmd;
function encuestascmd(bot, pagina) {
    if (!pagina)
        pagina = 1;
    var lasencuestas = cargardatos();
    var maximopaginas = Math.round(lasencuestas.length / config_json_1.encuestasporpagina);
    var regexnumero = /^[0-9]{1,3}$/g;
    if (pagina > maximopaginas || pagina <= 0 || !regexnumero.test(pagina.toString())) {
        bot.chat(main_js_1.langformat(es_json_1.encuestas.noexiste, [maximopaginas.toString()]));
        return;
    }
    bot.chat(main_js_1.langformat(es_json_1.encuestas.top, [pagina.toString(), maximopaginas.toString(), config_json_1.prefix]));
    for (var i = config_json_1.encuestasporpagina * (pagina - 1); i != config_json_1.encuestasporpagina * (pagina - 1) + config_json_1.encuestasporpagina; i++) {
        if (!lasencuestas[i])
            return;
        bot.chat(main_js_1.langformat(es_json_1.encuestas.encuestascmd, [lasencuestas[i].id, lasencuestas[i].texto, Object.keys(lasencuestas[i].votos).join(', ')]));
        main_js_1.sleep(250);
    }
}
exports.encuestascmd = encuestascmd;
var encuestaciclo = 0;
function spamencuestas(bot) {
    setInterval(function () {
        var lasencuestas = cargardatos();
        if (encuestaciclo === lasencuestas.length)
            encuestaciclo = 0;
        var mensajeencuesta = lasencuestas[encuestaciclo].texto + ' ' + config_json_1.prefix + 'vote ' + lasencuestas[encuestaciclo].id + ' [ ';
        mensajeencuesta += (Object.keys(lasencuestas[encuestaciclo].votos).join(' / ')) + ' ]';
        encuestaciclo++;
        console.log(mensajeencuesta);
        bot.chat(mensajeencuesta);
    }, (40 * 1000) * 60);
}
exports.spamencuestas = spamencuestas;
var encuestasdirectorio = path_1.default.join(__dirname, '../datos/encuestas.json');
function guardardatos(datos) {
    var encuestas = JSON.stringify(datos, null, 2);
    fs_1.default.writeFileSync(encuestasdirectorio, encuestas, 'utf-8');
}
function cargardatos() {
    var datosencuestas = require(encuestasdirectorio);
    return datosencuestas;
}
