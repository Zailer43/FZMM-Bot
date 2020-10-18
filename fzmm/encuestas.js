module.exports = inject;

const fs = require('fs')
const path = require('path')

function inject(bot, lang, prefix, spamearencuesta) {
    const encuestasdirectorio = path.join(__dirname, 'datos/encuestas.json');
    let encuestas;

    bot.on('chat2', function (username, message) {
        if (username === bot.username) return;
        if (message.startsWith(prefix)) {
            message = message.slice(prefix.length);
            if (message.startsWith('vote ')) {
                encuestas = require(encuestasdirectorio);
                const voto = message.split(' ');
                try {
                    let encuestaelegida = encuestas.find(({id}) => id === voto[1]);
                    if (encuestaelegida.votantes.includes(username)) {
                        bot.chat(lang.yavotaste);
                        return;
                    } else if (Object.keys(encuestaelegida.votos).includes(voto[2])) {
                        encuestaelegida.votos[voto[2]]++;
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
        }, (40*1000)*60);
    }
}