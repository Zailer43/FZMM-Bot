module.exports = inject;

const fzmm = require('./../fzmm.js');
const fs = require("fs");
const path = require('path');

const deudasdirectorio = path.join(__dirname,'datos/deudas.json');
const json_deudas = fs.readFileSync(deudasdirectorio, 'utf-8');
let deudas = JSON.parse(json_deudas);

function inject(bot, lang, prefixlongi, prefix, admin) {
    const jugadoreswhitelist = ['frazamame', 'zailer43', 'kkrii', 'choriso', 'dirtopi', 'fzaidm', 'antondv', 'pakitoh', 'imaguss_']
    bot.on('chat2', function (username, message) {
        if (message.startsWith(prefix + 'tp ')) {
            const nick = message.slice(prefixlongi + 3).toLowerCase();

            if (username.toLowerCase() === nick) {
                bot.chat(lang.asimismo);
                return;

            } else if (message.slice(prefixlongi + 3).toLowerCase() === 'frazamame') {
                bot.chat(lang.albot);
                return;

            } else if (jugadoreswhitelist.includes(nick)) {
                aumentardeuda(username, nick, indice(username.toLowerCase()))

            } else {
                bot.chat(lang.noesta);
                return;
            }
        } else if (message === prefix + 'pagartp') {
            pagardeuda(username, indice(username.toLowerCase()));

        } else if (message.startsWith(prefix + 'restartp ')) {
            if (username != admin) return;

            bajarledeuda = indice(message.slice(prefixlongi + 9).toLowerCase());
            bot.chat('/clear ' + message.slice(prefixlongi + 9) + ' minecraft:quartz_block 64')
            deudas[bajarledeuda].deudatotal = deudas[bajarledeuda].deudatotal - 1;
            bot.chat(lang.tudeuda + (deudas[bajarledeuda].deudatotal));
            console.log(lang.ladeuda + message.slice(prefixlongi + 9).toLowerCase() + lang.es + (deudas[bajarledeuda].deudatotal))

            const json_deudas = JSON.stringify(deudas, null, 2);
            fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');

        } else if (message.startsWith(prefix + 'deuda')) {
            bot.chat(lang.tudeudaes + deudas[indice(username.toLowerCase())].deudatotal + lang.material);
        }
    })

    function aumentardeuda(username, nick, aumentarledeudaa) {
        if (deudas[aumentarledeudaa].deudatotal >= 5) {
            bot.chat(lang.deudaalmax + prefix + 'pagardeuda');
        } else {
            deudas[aumentarledeudaa].deudatotal = deudas[aumentarledeudaa].deudatotal + 1;
            bot.chat(lang.tudeuda + (deudas[aumentarledeudaa].deudatotal));
            bot.chat('/tp ' + username + ' ' + nick);
            console.log(lang.ladeuda + username + lang.es + (deudas[aumentarledeudaa].deudatotal));

            const json_deudas = JSON.stringify(deudas, null, 2);
            fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');
        }
    }

    function pagardeuda(username, comprobardeuda) {
        if (deudas[comprobardeuda].deudatotal <= 0) {
            bot.chat(lang.notienesdeuda);
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
            case 'imaguss_':
                return 8;
            case 'gamerexde':
                return 9;
        }
    }
}