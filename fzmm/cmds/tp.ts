import { langformat } from '../utils/main.js';
import { prefix, botadmin, tpmaterial, administrartp } from '../datos/config.json';
import fs from 'fs';
import path from 'path';
import { tp } from '../lang/es.json';

export function tpcmd(bot: any, username: string, jugadorobjetivo: string) {
    if (!administrartp) {
        bot.chat(tp.deshabilitados)
        return;
    } else if (!jugadorobjetivo) return;

    jugadorobjetivo = jugadorobjetivo.toLowerCase();

    if (username.toLowerCase() === jugadorobjetivo) {
        bot.chat(tp.asimismo);
        return;

    } else {
        let estaonline: boolean = false;
        let deudas: tpinterface = cargardatos();

        Object.keys(bot.players).forEach(element => {
            if (element.toLowerCase() === jugadorobjetivo) {
                estaonline = true;
            }
        })

        if (!deudas[username]) deudas[username] = {
            deuda: 0,
            toggle: false
        }
        if (deudas[username].deuda >= 5) {
            bot.chat(langformat(tp.deudaalmax, [prefix]));

        } else if (!estaonline) {
            bot.chat(tp.noestaonline);

        } else if (deudas[jugadorobjetivo] && deudas[jugadorobjetivo].toggle) {
            bot.chat(tp.tienetoggle)

        } else {
            deudas[username].deuda++;
            bot.chat(`/tp ${username} ${jugadorobjetivo}`);

            bot.chat(langformat(tp.tudeuda, [deudas[username].deuda.toString()]));

            guardardatos(deudas);
        }
    }
}

export function pagartpcmd(bot: any, username: string, jugadorquepaga: string) {
    if (!administrartp) {
        bot.chat(tp.deshabilitados)
        return;
    }

    let deudas: tpinterface = cargardatos();
    username = username.toLowerCase();

    if (!deudas[username] || deudas[username].deuda <= 0) {
        bot.chat(tp.notienesdeuda);

    } else {
        let select = `@a[name="${jugadorquepaga}",nbt={SelectedItem:{id:"${tpmaterial}",Count:64b}}]`
        bot.chat(`/execute unless entity ${select} run tellraw @a "${tp.notienescuarzo}"`);
        bot.chat(`/execute if entity ${select} run tellraw ${bot.username} "<${botadmin}> ${prefix}restartp ${username}"`);
        bot.chat(`/execute if entity ${select} run clear ${jugadorquepaga} ${tpmaterial} 64`);
    }
}

export function restartpsecret(bot: any, username: string, restarletp: string) {
    if (!administrartp) {
        bot.chat(tp.deshabilitados)
        return;
    } else if (username != botadmin && !restarletp) return;

    let deudas: tpinterface = cargardatos();
    deudas[restarletp].deuda--;

    bot.chat(langformat(tp.ladeudade, [restarletp, deudas[restarletp].deuda.toString()]));

    if (deudas[restarletp].deuda === 0 && !deudas[restarletp].toggle) delete deudas[restarletp];
    guardardatos(deudas);
}

export function deudacmd(bot: any, username: string) {
    if (!administrartp) {
        bot.chat(tp.deshabilitados)
        return;
    }
    username = username.toLowerCase();
    let deudas: tpinterface = cargardatos();
    let deuda: number = 0;
    if (deudas[username]) deuda = deudas[username].deuda;
    bot.chat(langformat(tp.ladeudade, [username, deuda.toString()]));
}

export function tptogglecmd(bot: any, username: string, estado: string | boolean) {
    if (!administrartp) {
        bot.chat(tp.deshabilitados)
        return;
    }
    let deudas: tpinterface = cargardatos();
    username = username.toLowerCase();

    if (!deudas[username]) deudas[username] = {
        deuda: 0,
        toggle: false
    }

    if (estado === 'on') deudas[username].toggle = true;
    else if (estado === 'off') deudas[username].toggle = false;
    else deudas[username.toLowerCase()].toggle = !deudas[username].toggle;

    let msg: string;
    if (!deudas[username].toggle) msg = tp.activado;
    else msg = tp.desactivado;
    bot.chat(langformat(tp.toggleado, [msg]));

    if (deudas[username].deuda === 0 && !deudas[username].toggle) delete deudas[username]
    guardardatos(deudas);
}

const deudasdirectorio = path.join(__dirname, '../datos/deudas.json');

function cargardatos() {
    let deudas: tpinterface = require(deudasdirectorio);
    return deudas;
}

function guardardatos(datos: tpinterface) {
    let datostp = JSON.stringify(datos, null, 2);
    fs.writeFileSync(deudasdirectorio, datostp, 'utf-8');
}

interface tpinterface {
    [key: string]: {
        deuda: number;
        toggle: boolean;
    }
}