"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calccmd = void 0;
var es_json_1 = require("../lang/es.json");
function calccmd(bot, a, op, b, arg) {
    if (!b) {
        bot.chat(es_json_1.calc.faltanargumentos);
        return;
    }
    var resultado = 0;
    if (a === 2 && b === 2 && op === '+') {
        bot.chat('pez');
        return;
    }
    switch (op) {
        case '+':
            resultado = a + b;
            break;
        case '-':
            resultado = a - b;
            break;
        case '/':
            resultado = a / b;
            break;
        case '%':
            resultado = a % b;
            break;
        case '*':
            resultado = a * b;
            break;
        case '^':
        case '**':
            resultado = Math.pow(a, b);
            break;
        default:
            bot.chat(es_json_1.calc.operadores);
            return;
    }
    if (arg !== '-coma')
        bot.chat(resultado.toString());
    else
        bot.chat(resultado.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
    console.log(resultado);
}
exports.calccmd = calccmd;
