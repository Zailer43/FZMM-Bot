import { langformat } from '../utils/main.js';
import fs from 'fs';
import path from 'path';
import { tageosmax } from '../datos/config.json';
import { tageos } from '../lang/es.json';

const valoresdefault = {
    sonido: 'entity.player.levelup',
    volumen: 8
};

export function volumencmd(bot: any, username: string, volumen: number | undefined) {

    const regexnumero: RegExp = /^([0-9]{0,1})$/g;
    if (!volumen) {
        bot.chat(tageos.volumen);
        return;
    } else if (!regexnumero.test(volumen.toString())) {
        bot.chat(tageos.volumenesnumero);
        return;
    }

    let datostag: Array<tageosinterface> = cargardatos();
    let datostagelegido = datostag.find(({
        nick
    }) => nick === username);

    if (!datostagelegido) {
        datostag.push({
            nick: username,
            sonido: valoresdefault.sonido,
            volumen: volumen
        })
    } else {
        datostagelegido.volumen = volumen;
    }

    guardardatos(datostag);

    bot.chat(tageos.volumencambiado)
}

export function sonidocmd(bot: any, username: string, sonido: string | undefined) {

    let sonidosdisponibles: { [key: string]: string } = {
        levelup: 'entity.player.levelup',
        beacon: 'beacon.power',
        rayo: 'entity.lightning_bolt.impact',
        netherite: 'block.netherite_block.break',
        explosion: 'entity.generic.explode',
        firework: 'entity.firework_rocket.launch',
        campana: 'block.bell.use',
        aldeano: 'entity.villager.no'
    }

    if (!sonido) {
        bot.chat(langformat(tageos.sonidosdisponibles, [Object.keys(sonidosdisponibles).join(', ')]))
        return;
    }
    sonido = sonido.toLowerCase();

    if (sonidosdisponibles[sonido]) {

        let datostag = cargardatos();
        let datostagelegido2 = datostag.find(({
            nick
        }) => nick === username);

        if (!datostagelegido2) {
            datostag.push({
                nick: username,
                sonido: sonidosdisponibles[sonido],
                volumen: valoresdefault.volumen
            })
        } else {
            datostagelegido2.sonido = sonidosdisponibles[sonido];
        }

        guardardatos(datostag);

        bot.chat(tageos.sonidocambiado);
    } else {
        bot.chat(tageos.sonidoinexistente);
        return;
    }
}

export function tageo(bot: any, username: string, message: string) {
    const tagmessage: Array<string> = message.split(' ');
        let maxtageos: number = 0,
        cargado: boolean = false,
        datostag: Array<tageosinterface>;

        tagmessage.forEach((element: string) => {
            if (maxtageos === tageosmax) return;

            if (element.startsWith('@')) {
                maxtageos++;
                if (!cargado) {
                    datostag = cargardatos();
                    cargado = true;
                }

                let datostagelegido3 = datostag.find(({
                    nick
                }) => nick === username);

                if (!datostagelegido3) {
                    bot.chat(`/execute at ${element.slice(1)} run playsound ${valoresdefault.sonido} master ${element.slice(1)} ~ ~ ~ 0.${valoresdefault.volumen}`);
                } else {
                    bot.chat(`/execute at ${element.slice(1)} run playsound ${datostagelegido3.sonido} master ${element.slice(1)} ~ ~ ~ 0.${datostagelegido3.volumen}`);
                }
            }
        })
}

const datostagdirectorio = path.join(__dirname, '../datos/tageos.json');

function cargardatos() {
    let datostag: Array<tageosinterface> = require(datostagdirectorio);
    return datostag;
}

function guardardatos(datos: Array<tageosinterface>) {
    const i = JSON.stringify(datos, null, 2);
    fs.writeFileSync(datostagdirectorio, i, 'utf-8');
}

interface tageosinterface {
    nick: string;
    sonido: string;
    volumen: number;
}