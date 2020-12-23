import { langformat } from '../utils/main.js'
import { prefix } from '../datos/config.json'
import { cantidad } from '../lang/es.json';

export function cantidadcmd(bot: any, stacks: number, sobra: number, tipo: number) {
    // fz!cantidad 64 <cantidad (stacks)> <sobra> -> Son ?? Items
    if (!sobra) sobra = 0;
    if (!tipo) tipo = 64;
    if (stacks > 25000 || sobra > tipo) {
        bot.chat(cantidad.muygrande);
    } else if (stacks < 0 || sobra < 0) {
        bot.chat(cantidad.negativo);
    } else if (tipo === 64 || tipo === 16) {
        bot.chat(langformat(cantidad.msg, [(stacks * tipo + sobra).toString()]));
    } else {
        bot.chat(langformat(cantidad.sintaxis, [prefix]));
    }
}