import { langformat, sleep } from '../utils/main.js';
import fs from 'fs';
import path from 'path';
import { prefix, encuestasporpagina } from '../datos/config.json';
import { encuestas } from '../lang/es.json';

export function votecmd(bot: any, username: string, idvoto: string, voto: string) {

    let lasencuestas: Array<encuestasinterface> = cargardatos();
    let encuestaelegida = lasencuestas.find(({
        id
    }) => id === idvoto);

    if (encuestaelegida) {
        if (encuestaelegida.votantes.includes(username)) {
            bot.chat(encuestas.yavotaste);
            return;
        } else if (Object.keys(encuestaelegida.votos).includes(voto)) {
            encuestaelegida.votos[voto]++;
            encuestaelegida.votantes.push(username);
            bot.chat(encuestas.gracias)
            guardardatos(lasencuestas);
        } else {
            bot.chat(langformat(encuestas.respuestainvalida, [Object.keys(encuestaelegida.votos).join(' / ')]));
        }
    } else {
        bot.chat(encuestas.idincorrecta);
    }
}

export function encuestascmd(bot: any, pagina: number) {
    if (!pagina) pagina = 1;

    let lasencuestas: Array<encuestasinterface> = cargardatos();
    const maximopaginas = Math.round(lasencuestas.length / encuestasporpagina);
    const regexnumero = /^[0-9]{1,3}$/g;

    if (pagina > maximopaginas || pagina <= 0 || !regexnumero.test(pagina.toString())) {
        bot.chat(langformat(encuestas.noexiste, [maximopaginas.toString()]));
        return;
    }

    bot.chat(langformat(encuestas.top, [pagina.toString(), maximopaginas.toString(), prefix]));

    for (let i = encuestasporpagina * (pagina - 1); i != encuestasporpagina * (pagina - 1) + encuestasporpagina; i++) {
        if (!lasencuestas[i]) return;

        bot.chat(langformat(encuestas.encuestascmd, [lasencuestas[i].id, lasencuestas[i].texto, Object.keys(lasencuestas[i].votos).join(', ')]));
        sleep(250)
    }
}

let encuestaciclo: number = 0;
export function spamencuestas(bot: any) {

    setInterval(() => {
        let lasencuestas = cargardatos()
        if (encuestaciclo === lasencuestas.length) encuestaciclo = 0;
        let mensajeencuesta = lasencuestas[encuestaciclo].texto + ' ' + prefix + 'vote ' + lasencuestas[encuestaciclo].id + ' [ ';
        mensajeencuesta += (Object.keys(lasencuestas[encuestaciclo].votos).join(' / ')) + ' ]';
        encuestaciclo++;
        console.log(mensajeencuesta)
        bot.chat(mensajeencuesta)
    }, (40 * 1000) * 60);

}

const encuestasdirectorio = path.join(__dirname, '../datos/encuestas.json');

function guardardatos(datos: Array<encuestasinterface>) {
    let encuestas = JSON.stringify(datos, null, 2);
    fs.writeFileSync(encuestasdirectorio, encuestas, 'utf-8');
}

function cargardatos() {
    let datosencuestas: Array<encuestasinterface> = require(encuestasdirectorio);
    return datosencuestas;
}

interface encuestasinterface {
    id: string;
    texto: string;
    votos: { [key: string]: number };
    votantes: Array<string>;
}