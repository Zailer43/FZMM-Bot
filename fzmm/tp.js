module.exports = inject;

const fzmm = require('./../fzmm.js');
const fs = require("fs");

const deudasdirectorio = 'C:\\Users\\minec\\Documents\\GitHub\\FZMM-Bot\\fzmm\\\datos\\deudas.json';
const json_deudas = fs.readFileSync(deudasdirectorio, 'utf-8');
let deudas = JSON.parse(json_deudas);

function inject(bot, prefixlongi, prefix, admin) {
    const jugadoreswhitelist = ['frazamame', 'zailer43', 'kkrii', 'choriso', 'dirtopi', 'fzaidm', 'antondv', 'pakitoh']
    bot.on('chat2', function (username, message) {
        if (message.startsWith(prefix + 'tp ')) {
            const nick = message.slice(prefixlongi + 3).toLowerCase();

            if (username.toLowerCase() === nick) {
                bot.chat('No puedes hacerte tp a ti mismo, sería inutil');
                return;

            } else if (message.slice(prefixlongi + 3).toLowerCase() === 'frazamame') {
                bot.chat('No puedes hacerte tp a mí');
                return;

            } else if (jugadoreswhitelist.includes(nick)) {
                aumentardeuda(username, nick, indice(username.toLowerCase()))

            } else {
                bot.chat('No se encontró el nombre del jugador en la whitelist');
                return;
            }
        } else if (message === prefix + 'pagartp') {
            pagardeuda(username, indice(username.toLowerCase()));

        } else if (message.startsWith(prefix + 'restartp ')) {
            if (username != admin) return;

            bajarledeuda = indice(message.slice(prefixlongi + 9).toLowerCase());
            bot.chat('/clear ' + message.slice(prefixlongi + 9) + ' minecraft:quartz_block 64')
            deudas[bajarledeuda].deudatotal = deudas[bajarledeuda].deudatotal - 1;
            bot.chat('Tu deuda ahora es ' + (deudas[bajarledeuda].deudatotal));
            console.log('Ahora la deuda de ' + message.slice(prefixlongi + 9).toLowerCase() + ' es ' + (deudas[bajarledeuda].deudatotal))

            const json_deudas = JSON.stringify(deudas, null, 2);
            fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');

        } else if (message.startsWith(prefix + 'deuda')) {
            bot.chat('Tu deuda es de ' + deudas[indice(username.toLowerCase())].deudatotal + ' stacks de cuarzo');
        }
    })

    function aumentardeuda(username, nick, aumentarledeudaa) {
        if (deudas[aumentarledeudaa].deudatotal >= 5) {
            bot.chat('Tu deuda está a su máximo (5), no puedes hacer tp, te recomiendo usar fz!pagartp');
        } else {
            deudas[aumentarledeudaa].deudatotal = deudas[aumentarledeudaa].deudatotal + 1;
            bot.chat('Tu deuda ahora es ' + (deudas[aumentarledeudaa].deudatotal));
            bot.chat('/tp ' + username + ' ' + nick);
            console.log('Ahora la deuda de ' + username + ' es ' + (deudas[aumentarledeudaa].deudatotal));

            const json_deudas = JSON.stringify(deudas, null, 2);
            fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');
        }
    }

    function pagardeuda(username, comprobardeuda) {
        if (deudas[comprobardeuda].deudatotal <= 0) {
            bot.chat('No tienes deuda pendiente');
        } else {
            bot.chat('/execute if entity @a[name="' + username + '",nbt={SelectedItem:{id:"minecraft:quartz_block",Count:64b}}] run tellraw FraZaMaMe "<Zailer43> ' + prefix + 'restartp ' + username + '"');
        }
    }
    function indice(nick) {
        switch (nick) {
            case 'frazamame':
                return 0;
            case 'zailer43':
                return 1;
            case 'kkrii':
                return 2;
            case 'choriso':
                return 3;
            case 'dirtopi':
                return 4;
            case 'fzaidm':
                return 5;
            case 'antondv':
                return 6;
            case 'pakitoh':
                return 7;
        }
    }
}