module.exports = inject;

const fs = require('fs');
const path = require('path');
const util = require('util');

const deudasdirectorio = path.join(__dirname, 'datos/deudas.json');
let deudas = require(deudasdirectorio);

function inject(bot, lang, prefix, admin, tpmaterial) {
  const jugadoreswhitelist = ['frazamame', 'zailer43', 'kkrii', 'choriso', 'dirtopi', 'fzaidm', 'antondv', 'pakitoh', 'imaguss_', 'gamerexde']
  bot.on('comando', function (username, message) {
    if (username === bot.username) return;

    const cmd = message.split(' ');

    switch (cmd[0].toLowerCase()) {
      case 'tp':
        if (!cmd[1]) return;
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
        break;
      case 'restartp':
        if (username != admin) return;

        bajarledeuda = deudas.find(({
          nick
        }) => nick === cmd[1].toLowerCase());

        bot.chat(`/clear ${cmd[1]} ${tpmaterial} 64`);
        bajarledeuda.deudatotal--;

        bot.chat(util.format(lang.tudeuda, bajarledeuda.deudatotal));
        console.log(util.format(lang.ladeudade, username, bajarledeuda.deudatotal));

        const json_deudas = JSON.stringify(deudas, null, 2);
        fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');
        break;
      case 'deuda':
        if (!cmd[1]) decirdeuda(username)
        else decirdeuda(cmd[1]);
        break;
      case 'pagartp':
        if (!cmd[1]) pagardeuda(username)
        else pagardeuda(cmd[1]);
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
      bot.chat(`/execute if entity @a[name="${username}",nbt={SelectedItem:{id:"${tpmaterial}",Count:64b}}] run tellraw ${bot.username} "<${admin}> ${prefix}restartp ${username}"`);
      bot.chat(`/execute unless entity @a[name="${username}",nbt={SelectedItem:{id:"${tpmaterial}",Count:64b}}] run tellraw @a "${lang.notienescuarzo}"`);
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