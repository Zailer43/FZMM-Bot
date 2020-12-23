import { langformat } from '../utils/main.js'
import { prefix } from '../datos/config.json'
import { stack } from '../lang/es.json';

export function stackcmd(bot: any, cantidad: number, tipo: number) {
    // fz!stack <cantidad> [64 / 16]-> Son ?? stacks y sobra ??
    if (!tipo) tipo = 64;
    if (cantidad > 250000) {
        bot.chat(stack.muygrande);
        return;

    } else if (cantidad < 0) {
        bot.chat(stack.negativo);
        return;
    }

    if (tipo === 64 || tipo === 16) {
        bot.chat(langformat(stack.msg, [Math.trunc(cantidad / tipo).toString(), tipo.toString(), (cantidad % tipo).toString()]))
    } else {
        bot.chat(langformat(stack.sintaxis, [prefix]));
    }
}