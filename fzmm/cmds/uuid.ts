import { langformat } from '../utils/main.js';
import axios from 'axios';
import { uuid } from '../lang/es.json';

export function uuidcmd(bot: any, nick: string) {

    const regexnick = /^(\w+)$/
    if (!regexnick.test(nick)) {
        bot.chat(uuid.alfanumerico);
        return;

    } else if (nick.length > 16 || nick.length < 3) {
        bot.chat(uuid.longitud);
        return;
    }

    const uuidresultado: string = '';
    let espremium: boolean = false;

    axios.get('https://api.mojang.com/users/profiles/minecraft/' + nick)
        .then(function (uuidres) {
            if (!uuidres.data.id) {
                bot.chat(langformat(uuid.noespremium, [nick]));
                return;
            }

            console.log(langformat(uuid.es, [uuidres.data.name, uuidres.data.id]));
            bot.chat(langformat(uuid.es, [uuidres.data.name, uuidres.data.id]));

            axios.get('https://api.mojang.com/user/profiles/' + uuidres.data.id + '/names')
                .then(function (historial) {
                    let longinicks = Object.keys(historial.data).length;
                    let historialdenicks: Array<string> = [];

                    historial.data.forEach((element: historialinterface) => {
                        historialdenicks.push(element.name)
                    })
                    const historialnicks: string = historialdenicks.join(', ')

                    bot.chat(langformat(uuid.nicks, [historialnicks]));
                    console.log(langformat(uuid.nicks, [historialnicks]));
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
}

interface historialinterface {
    name: string,
    changedToAt: Date
}