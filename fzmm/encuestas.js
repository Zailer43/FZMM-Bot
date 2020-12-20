module.exports = inject;

const fs = require('fs')
const path = require('path')
const sleep = require('./utils/main.js').sleep;
const langformat = require('./utils/main.js').langformat;

function inject(bot, lang, prefix, spamearencuesta, encuestasporpagina) {
    const encuestasdirectorio = path.join(__dirname, 'datos/encuestas.json');
    let encuestas = require(encuestasdirectorio);;

    bot.on('comando', function (username, message) {
        if (username === bot.username) return;

        const cmd = message.split(' ');

        if (cmd[0] === 'vote') {
            encuestas = require(encuestasdirectorio);
            if (cmd.length === 1) return;

            try {
                let encuestaelegida = encuestas.find(({
                    id
                }) => id === cmd[1]);
                if (encuestaelegida.votantes.includes(username)) {
                    bot.chat(lang.yavotaste);
                    return;
                } else if (Object.keys(encuestaelegida.votos).includes(cmd[2])) {
                    encuestaelegida.votos[cmd[2]]++;
                    encuestaelegida.votantes.push(username);
                    bot.chat(lang.gracias)
                } else {
                    bot.chat(lang.respuestainvalida + (Object.keys(encuestaelegida.votos).join(' / ')));
                }
            } catch (e) {
                bot.chat(lang.idincorrecta)
                console.log(e)
            }
            encuestas = JSON.stringify(encuestas, null, 2);
            fs.writeFileSync(encuestasdirectorio, encuestas, 'utf-8');
        } else if (cmd[0] === 'encuestas') {

            if (!cmd[1]) cmd[1] = 1;

            const maximopaginas = Math.round((encuestas).length / encuestasporpagina);
            const regexnumero = /^[0-9]{1,3}$/g;
            const pagina = parseInt(cmd[1]);

            if (pagina > maximopaginas || pagina <= 0 || !regexnumero.test(cmd[1])) {
                bot.chat(langformat(lang.noexiste, [maximopaginas]));
                return;
            }

            bot.chat(langformat(lang.top, [cmd[1], maximopaginas, prefix]));

            for (let i = encuestasporpagina * (pagina - 1); i != encuestasporpagina * (pagina - 1) + encuestasporpagina; i++) {
                if (!encuestas[i]) return;

                bot.chat(langformat(lang.encuestascmd, [encuestas[i].id, encuestas[i].texto, Object.keys(encuestas[i].votos).join(', ')]));
                sleep(250)
            }
        }
    })

    let encuestaciclo = 0;

    function spamencuesta() {
        encuestas = require(encuestasdirectorio);
        if (encuestaciclo === encuestas.length) encuestaciclo = 0;
        let mensajeencuesta = encuestas[encuestaciclo].texto + ' ' + prefix + 'vote ' + encuestas[encuestaciclo].id + ' [ ';
        mensajeencuesta += (Object.keys(encuestas[encuestaciclo].votos).join(' / ')) + ' ]';
        encuestaciclo++;
        console.log(mensajeencuesta)
        bot.chat(mensajeencuesta)
    }

    //exports.spamencuesta = spamencuesta;

    if (spamearencuesta) {
        setInterval(() => {
            spamencuesta();
        }, (40 * 1000) * 60);
    }
}