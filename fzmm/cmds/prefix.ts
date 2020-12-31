import { langformat, botcmdblock, RGBrandom } from '../utils/main.js';
import fs from 'fs';
import path from 'path';
import { prefix, subfixteams } from '../datos/config.json'
import { prefixlang } from '../lang/es.json';

const prefixpordefecto: PrefixDatos = {
    lados: {
        estilo: ['[', ']'],
        color: 'dark_aqua',
        espacios: false
    },
    mensaje: {
        texto: 'FZMM',
        color: 'blue'
    }
}

function estilos(bot: any, username: string, estiloelegido: number | undefined) {
    if (!estiloelegido && estiloelegido != 0) {
        bot.chat(langformat(prefixlang.estilos, [prefix]))
        let estilos: Array<Array<string>> = cargardatos().estilos;
        let msg: string = '/tellraw @a "';

        estilos.forEach((element: Array<string>, index: number) => {
            msg += `\\u00a7a${index}: \\u00a72${element[0].replace('\\', '\\\\')}test${element[1].replace('\\', '\\\\')}   `;
            if ((index % 4) === 3) msg += '\\n';
        })

        msg += '"';
        botcmdblock(bot, msg);
    } else {
        let prefixdatos = cargardatos();
        if (!prefixdatos.usuarios[username]) prefixdatos.usuarios[username] = prefixpordefecto;
        if (!prefixdatos.estilos[estiloelegido]) {
            bot.chat(prefixlang.estiloinvalido)
            return;
        }
        prefixdatos.usuarios[username].lados.estilo = prefixdatos.estilos[estiloelegido];
        ponerprefix(bot, username);
        guardardatos(prefixdatos);
    }
}

function galeria(bot: any, username: string, elegir: number | undefined) {
    if (!elegir && elegir != 0) {
        let galeria: Array<PrefixDatos> = cargardatos().galeria;
        let galeriaarray: Array<string> = [],
            espacio: string = '';

        galeria.forEach((element: PrefixDatos, index: number) => {
            if (element.lados.espacios) espacio = ' ';
            else espacio = '';
            galeriaarray.push(`{"text":"${index}: ","color":"green"},{"text":"${element.lados.estilo[0]}${espacio}","color":"${element.lados.color}"},{"text":"${element.mensaje.texto}","color":"${element.mensaje.color}"},{"text":"${espacio}${element.lados.estilo[1]}   ","color":"${element.lados.color}"}`);
            if ((index % 4) === 3) galeriaarray.push('"\\n"');
        })

        let msg: string = `/tellraw @a [${galeriaarray.join(',')}]`;
        botcmdblock(bot, msg);
    } else {
        let prefixdatos = cargardatos();
        if (!prefixdatos.usuarios[username]) prefixdatos.usuarios[username] = prefixpordefecto;
        prefixdatos.usuarios[username] = prefixdatos.galeria[elegir];
        guardardatos(prefixdatos);
        ponerprefix(bot, username);
    }
}

function texto(bot: any, username: string, texto: string | undefined) {
    if (!texto) bot.chat(langformat(prefixlang.texto, [prefix]));
    else {
        texto = texto.replace(/\/e\//, ' ');
        texto = texto.replace(/\</, '');
        texto = texto.replace(/\>/g, '');
        if (texto.length > 12) {
            bot.chat(prefixlang.textomuylargo);
            return;
        }
        let prefixdatos = cargardatos();
        if (!prefixdatos.usuarios[username]) prefixdatos.usuarios[username] = prefixpordefecto;
        prefixdatos.usuarios[username].mensaje.texto = texto;

        ponerprefix(bot, username);
        guardardatos(prefixdatos);
    }
}

function color(bot: any, username: string, colorelegido: string | undefined, cambiar: string | undefined) {
    if (!cambiar || !['texto','lados'].includes(cambiar)) {
        bot.chat(langformat(prefixlang.color, [prefix]));
        return;
    } else if (!colorelegido) colorelegido = RGBrandom();
    let prefixdatos = cargardatos();
    
    if (!prefixdatos.usuarios[username]) prefixdatos.usuarios[username] = prefixpordefecto;

    if (cambiar === 'texto') prefixdatos.usuarios[username].mensaje.color = colorelegido;
    else if (cambiar === 'lados') prefixdatos.usuarios[username].lados.color = colorelegido;

    ponerprefix(bot, username);
    guardardatos(prefixdatos);

    try {
    bot.chat(botcmdblock(bot, `/tellraw @a [{"text":"${prefixlang.colorcambiado}"},{"text":"▉ (${colorelegido})","color":"${colorelegido}"}]`));
    } catch (e) {
        console.log(e);
    }
}

function clear(bot: any, username: string) {
    bot.chat(`/team modify ${username}${subfixteams} prefix ""`);
    bot.chat(prefixlang.prefixremovido)
}

function espaciado(bot: any, username: string) {
    let prefixdatos = cargardatos();
    if (!prefixdatos.usuarios[username]) prefixdatos.usuarios[username] = prefixpordefecto;
    prefixdatos.usuarios[username].lados.espacios = !prefixdatos.usuarios[username].lados.espacios;

    ponerprefix(bot, username);
    guardardatos(prefixdatos);

    bot.chat(langformat(prefixlang.espaciosestado, [prefixdatos.usuarios[username].lados.espacios.toString()]))
}

function ponerprefix(bot: any, username: string) {
    let datos: PrefixDatos = cargardatos().usuarios[username];
    if (!datos) return;

    const execute = `/execute if entity @a[name="${username}",team=!${username}${subfixteams}] run team `;
    bot.chat(`${execute} leave ${username}`);
    bot.chat(`${execute} add ${username}${subfixteams}`);
    bot.chat(`${execute} join ${username}${subfixteams} ${username}`);

    let espacio: string = '';
    if (datos.lados.espacios) espacio = ' ';

    botcmdblock(bot, `/team modify ${username}${subfixteams} prefix [{"text":"${datos.lados.estilo[0]}${espacio}","color":"${datos.lados.color}"},{"text":"${datos.mensaje.texto}","color":"${datos.mensaje.color}"},{"text":"${espacio}${datos.lados.estilo[1]} ","color":"${datos.lados.color}"}]`);
    bot.chat(prefixlang.cambiado)
}

function addgaleria(bot: any, username: string) {
    let datosprefix: prefixinterface = cargardatos();

    if (!datosprefix.usuarios[username]) return;
    else datosprefix.galeria.push(datosprefix.usuarios[username]);
    guardardatos(datosprefix);

    bot.chat(prefixlang.addgaleria)
}

export const prefixcmd = {
    estilos,
    texto,
    color,
    clear,
    espaciado,
    galeria,
    ponerprefix,
    addgaleria
}

const datosprefixdirectorio = path.join(__dirname, '../datos/prefixdatos.json');

function cargardatos() {
    let datosprefix: prefixinterface = require(datosprefixdirectorio);
    return datosprefix;
}

function guardardatos(datos: prefixinterface) {
    const i = JSON.stringify(datos, null, 2);
    fs.writeFileSync(datosprefixdirectorio, i, 'utf-8');
}

interface prefixinterface {
    estilos: Array<Array<string>>;
    galeria: Array<PrefixDatos>;
    usuarios: { [key: string]: PrefixDatos };
}

type PrefixDatos = {
    lados: {
        estilo: Array<string>;
        color: string;
        espacios: boolean;
    }
    mensaje: {
        texto: string;
        color: string;
    }
}