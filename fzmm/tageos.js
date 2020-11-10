module.exports = inject;

const fs = require('fs');
const path = require('path');
const util = require('util');

const datostagdirectorio = path.join(__dirname, 'datos/tageos.json');
let datostag = require(datostagdirectorio);

function inject(bot, lang, prefix, tageosmax) {
    bot.on('chat2', function (username, message) {
        if (username === bot.username) return;
        const tag = message.split(' ');
        var maxtageos = 0;

        tag.forEach(element => {
            if (maxtageos === tageosmax) return;

            if (element.startsWith('@')) {
                maxtageos++;
                let datostagelegido3 = datostag.find(({
                    nick
                }) => nick === username);
                if (!datostagelegido3) {
                    bot.chat('/execute at ' + element.slice(1) + ' run playsound entity.player.levelup master ' + element.slice(1) + ' ~ ~ ~');
                } else {
                    bot.chat('/execute at ' + element.slice(1) + ' run playsound ' + datostagelegido3.sonido + ' master ' + element.slice(1) + ' ~ ~ ~ ' + datostagelegido3.volumen);
                }
            }
        })

        if (message.toLowerCase().startsWith(prefix)) {

            message = message.slice(prefix.length);

            const cmd = message.split(' ');
            if (cmd.length === 1) return;
            if (cmd[0] === 'tag') {
                switch (cmd[1]) {
                    case 'volumen':
                        if (!cmd[2]) {
                            bot.chat(lang.volumen)
                            return;
                        }
                        let datostagelegido = datostag.find(({
                            nick
                        }) => nick === username);
                        if (!datostagelegido) {
                            datostag.push({
                                nick: username,
                                sonido: 'entity.player.levelup',
                                volumen: cmd[2]
                            })
                        } else {
                            datostagelegido.volumen = cmd[2]
                        }
                        datostag = JSON.stringify(datostag, null, 2);
                        fs.writeFileSync(datostagdirectorio, datostag, 'utf-8');
                        datostag = require(datostagdirectorio);

                        bot.chat(lang.volumencambiado)
                        break;
                    case 'sonido':
                        if (!cmd[2]) {
                            bot.chat(lang.sonidosdisponibles + 'levelup / beacon / rayo / netherite / explosion / firework / campana / aldeano')
                            return;
                        }
                        let sonido;
                        switch (cmd[2]) {
                            case 'levelup':
                                sonido = 'entity.player.levelup';
                                break;
                            case 'beacon':
                                sonido = 'beacon.power';
                                break;
                            case 'rayo':
                                sonido = 'entity.lightning_bolt.impact';
                                break;
                            case 'netherite':
                                sonido = 'block.netherite_block.break';
                                break;
                            case 'explosion':
                                sonido = 'entity.generic.explode';
                                break;
                            case 'firework':
                                sonido = 'entity.firework_rocket.launch';
                                break;
                            case 'campana':
                                sonido = 'block.bell.use';
                                break;
                            case 'aldeano':
                                sonido = 'entity.villager.no';
                                break;
                            default:
                                bot.chat(lang.sonidoinexistente);
                                return;
                        }

                        let datostagelegido2 = datostag.find(({
                            nick
                        }) => nick === username);
                        if (!datostagelegido2) {
                            datostag.push({
                                nick: username,
                                sonido: sonido,
                                volumen: '1'
                            })
                        } else {
                            datostagelegido2.sonido = sonido
                        }
                        datostag = JSON.stringify(datostag, null, 2);
                        fs.writeFileSync(datostagdirectorio, datostag, 'utf-8');
                        datostag = require(datostagdirectorio);

                        bot.chat(lang.sonidocambiado);
                        break;
                    default:
                        bot.chat(util.format(lang.errorsintaxis, prefix));
                }
            }
        }
    })
}