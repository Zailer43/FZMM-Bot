import { langformat, sleep } from '../utils/main.js'
import { prefix, paginasporhelp } from '../datos/config.json'
import help from '../lang/help/es.json';
import { helpmsg } from '../lang/es.json';

export function helpcmd(bot: any, comandoelegido: string, pagina: string) {
    if (comandoelegido === '*') {
        let comandos: Array<string> = help.map(element => element.cmd);

        bot.chat(comandos.join(', '));
        console.log(comandos);
        return;
    }

    helpcomando(bot, comandoelegido);
    if (pagina) {
        if (comandoelegido.toLowerCase() === 'page') {

            let paginanumero = parseInt(pagina);
            const maximopaginas = Math.ceil((help).length / paginasporhelp);
            const regexnumero = /^[0-9]{1,3}$/g;

            if (paginanumero > maximopaginas || paginanumero <= 0 || !regexnumero.test(pagina)) {
                bot.chat(langformat(helpmsg.noexiste, [maximopaginas.toString()]));
                return;
            }

            bot.chat(langformat(helpmsg.top, [pagina, maximopaginas.toString()]));

            for (let i = paginasporhelp * (paginanumero - 1); i != paginasporhelp * (paginanumero - 1) + paginasporhelp; i++) {
                if (!help[i]) return;

                if (help[i].args) bot.chat(langformat(helpmsg.cmd, [prefix, help[i].cmd, help[i].args!, help[i].msg]));
                else bot.chat(langformat(helpmsg.cmdsinargs, [prefix, help[i].cmd, help[i].msg]));
                sleep(250)
            }
        }
    } else bot.chat(helpmsg.comandoinexistente);
}

export function helpcomando(bot: any, comandoelegido: string) {
    const helpbuscado: helpinterface | undefined = help.find(comando => comando.cmd === comandoelegido.toLowerCase());

    if (helpbuscado) {
        if (helpbuscado.args) bot.chat(langformat(helpmsg.cmd, [prefix, helpbuscado.cmd, helpbuscado.args, helpbuscado.msg]));
        else return bot.chat(langformat(helpmsg.cmdsinargs, [prefix, helpbuscado.cmd, helpbuscado.msg]));

    }
}

interface helpinterface {
    cmd: string,
    args?: string,
    msg: string
}

