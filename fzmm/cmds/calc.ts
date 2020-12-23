import { calc } from '../lang/es.json';

    export function calccmd(bot: any, a: number, op: string, b: number, arg: string) {
    if (!b) {
        bot.chat(calc.faltanargumentos);
        return;
    }
    let resultado: number = 0;

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
            resultado = a ** b;
            break;
        default:
            bot.chat(calc.operadores);
            return;
    }
    if (arg !== '-coma') bot.chat(resultado.toString())
    else bot.chat(resultado.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
    console.log(resultado);
}