import { langformat } from '../utils/main.js'
import { xp } from '../lang/es.json';

export function xpcmd(bot: any, nivelactual: number, niveldeseado: number, ejemplo: string) {
    let falta: number;

    if (nivelactual > niveldeseado) { //intercambia los valores por si confunden la sintaxis del comando así no tira error
        let niveldeseado2 = niveldeseado;
        niveldeseado = nivelactual;
        nivelactual = niveldeseado2;
        bot.chat(xp.alreves)
    }

    let niveldeseadototal = totalxpporlevel(niveldeseado),
        nivelactualtotal = totalxpporlevel(nivelactual);

    falta = niveldeseadototal - nivelactualtotal;

    if (ejemplo) {
        let ejemplofaltan: number,
            ejemplocantidadxp: number = 0;
        const entidadesdeejemplo: Array<entidadesinfo> = [{
            entidades: ['creeper', 'enderman', 'pillager', 'zombi'],
            xp: 5
        },
        {
            entidades: ['blaze', 'guardian'],
            xp: 10
        },
        {
            entidades: ['witherboss'],
            xp: 50
        }
        ];

        entidadesdeejemplo.forEach((element) => {
            if (element.entidades.includes(ejemplo)) ejemplocantidadxp = element.xp;
        });
        if (!ejemplocantidadxp) {
            let entidadeslista: Array<string> = [];

            entidadesdeejemplo.forEach(element => {
                element.entidades.forEach(element2 => {
                    entidadeslista.push(element2);
                })
            });

            bot.chat(langformat(xp.errorejemplo, [entidadeslista.join(', ')]));
            return;
        }

        ejemplofaltan = Math.round(falta / ejemplocantidadxp);
        bot.chat(langformat(xp.msgconejemplo, [ejemplofaltan.toString(), ejemplo.toLowerCase(), niveldeseado.toString()]))
    } else {
        bot.chat(langformat(xp.msg, [falta.toString(), nivelactual.toString(), niveldeseado.toString()]));
    }
}

interface entidadesinfo {
    entidades: Array<string>;
    xp: number;
};

function totalxpporlevel(level: number) {
    let resultado: number = 0;
    if (level >= 0 && level <= 16) resultado = level ** 2 + 6 * level;
    else if (level >= 17 && level <= 31) resultado = 2.5 * level ** 2 - 40.5 * level + 360;
    else if (level >= 32) resultado = 4.5 * level ** 2 - 162.5 * level + 2220
    return resultado;
}