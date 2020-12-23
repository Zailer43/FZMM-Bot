import { langformat } from '../utils/main.js'
import { random } from '../lang/es.json';

export function calavera(bot: any) {
    bot.chat(langformat(random.wither, [Math.floor((Math.random() * 20) + 1).toString()]));
}

export function perdoanme(bot: any) {
    let perdonado: number = Math.round(Math.random() * 2);
    if (perdonado) bot.chat(random.perdonado)
    else if (!perdonado) bot.chat(random.noperdono);
}

export function caraocruz(bot: any) {
    let caraocruz: number = Math.floor(Math.random() * 2)
    if (caraocruz <= 0.5) bot.chat(random.cara)
    else if (caraocruz > 0.5) bot.chat(random.cruz);
}

/*
exports function geitometro(bot: any, username: string) {
    let porcentaje:number = Math.floor(Math.random() * 101);
    bot.chat(langformat('%0$ es un %1$% gei D:', [username, porcentaje]));
}
*/