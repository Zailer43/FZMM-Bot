module.exports = inject;

const fs = require('fs');
const path = require('path');
const util = require('util');

const deudasdirectorio = path.join(__dirname, 'datos/deudas.json');
let deudas = require(deudasdirectorio);

function inject(bot, lang, prefix, admin) {
    const jugadoreswhitelist = ['frazamame', 'zailer43', 'kkrii', 'choriso', 'dirtopi', 'fzaidm', 'antondv', 'pakitoh', 'imaguss_', 'gamerexde']
    bot.on('comando', function (username, message) {
        if (username === bot.username) return;

        if (message.startsWith('tp ')) {
            const cmd = message.split(' ');
            const nick = cmd[1].toLowerCase();

            if (username.toLowerCase() === nick) {
                bot.chat(lang.asimismo);
                return;

            } else if (nick === 'frazamame') {
                bot.chat(lang.albot);
                return;

            } else if (jugadoreswhitelist.includes(nick)) {
                let jugadorencontrado = deudas.find(({
                    nick
                }) => nick === username.toLowerCase());
                aumentardeuda(username, nick, jugadorencontrado)

            } else {
                bot.chat(lang.noesta);
                return;
            }
        } else if (message.startsWith('restartp ')) {
            if (username != admin) return;

            const cmd = message.split(' ');

            bajarledeuda = deudas.find(({
                nick
            }) => nick === cmd[1].toLowerCase());

            bot.chat('/clear ' + cmd[1] + ' minecraft:quartz_block 64')
            bajarledeuda.deudatotal--;

            bot.chat(util.format(lang.tudeuda, bajarledeuda.deudatotal));
            console.log(util.format(lang.ladeudade, username, bajarledeuda.deudatotal));

            const json_deudas = JSON.stringify(deudas, null, 2);
            fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');

        } else if (message === 'deuda') {
            decirdeuda(username);

        } else if (message.startsWith('deuda ')) {
            const deudacmd = message.split(' ');
            decirdeuda(deudacmd[1]);

        } else if (message === 'pagartp') {
            pagardeuda(username);

        } else if (message.startsWith('pagartp ')) {
            const pagartpcmd = message.split(' ');
            pagardeuda(pagartpcmd[1]);
        }
    })

    function aumentardeuda(username, nick, jugadorelegido) {
        let estaonline = 0;
        Object.keys(bot.players).forEach(element => {
            if (element.toLowerCase() === nick) {
                estaonline++;
            }
        })
        if (jugadorelegido.deudatotal >= 5) {
            bot.chat(util.format(lang.deudaalmax, prefix));

        } else if (!estaonline) {
            bot.chat(lang.noestaonline);
        } else {

            jugadorelegido.deudatotal++;
            bot.chat('/tp ' + username + ' ' + nick);

            bot.chat(util.format(lang.tudeuda, jugadorelegido.deudatotal));

            const json_deudas = JSON.stringify(deudas, null, 2);
            fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');
        }
    }

    function pagardeuda(username) {
        const pagardeudadatos = deudas.find(({
            nick
        }) => nick === username.toLowerCase());

        if (!pagardeudadatos) {
            bot.chat(lang.noesta)
            return;
        } else if (pagardeudadatos.deudatotal <= 0) {
            bot.chat(lang.notienesdeuda);
        } else {
            bot.chat(`/execute if entity @a[name="${username}",nbt={SelectedItem:{id:"minecraft:quartz_block",Count:64b}}] run tellraw FraZaMaMe "<${admin}> ${prefix}restartp ${username}"`);
            bot.chat(`/execute unless entity @a[name="${username}",nbt={SelectedItem:{id:"minecraft:quartz_block",Count:64b}}] run tellraw @a "${lang.notienescuarzo}"`);
        }
    }

    function decirdeuda(username) {
        const jugadordatos = deudas.find(({
            nick
        }) => nick === username.toLowerCase());
        if (!jugadordatos) {
            bot.chat(lang.noesta)
            return;
        }
        bot.chat(util.format(lang.ladeudade, username, jugadordatos.deudatotal));
    }
}