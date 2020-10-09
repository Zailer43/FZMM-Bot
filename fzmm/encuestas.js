module.exports = inject;

const fs = require('fs')
const path = require('path')

function inject(bot, lang, prefix, spamearencuesta) {
    const encuestasdirectorio = path.join(__dirname, 'datos/encuestas.json');
    let encuestas;;

    bot.on('chat2', function (username, message) {
        if (username === bot.username) return;
        if (message.startsWith(prefix)) {
            message = message.slice(prefix.length);
            if (message.startsWith('vote ')) {
                encuestas = require(encuestasdirectorio);
                const voto = message.split(' ');
                try {
                    let encuestaelegida = encuestas.find(({
                        id
                    }) => id === voto[1]);
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

    function spamencuesta() {
        encuestas = require(encuestasdirectorio);
        const numerorandom = Math.floor(Math.random() * Math.floor(encuestas.length));
        let mensajeencuesta = encuestas[numerorandom].texto + ' ' + prefix + 'vote ' + encuestas[numerorandom].id + ' [ ';
        mensajeencuesta += (Object.keys(encuestas[numerorandom].votos).join(' / ')) + ' ]';
        console.log(mensajeencuesta)
        bot.chat(mensajeencuesta)
    }
    
    exports.spamencuesta = spamencuesta();

    if (spamearencuesta) {
        setInterval(() => {
            spamencuesta();
        }, (60*1000)*1000);
    }
}