module.exports = inject;

const fs = require('fs');
const path = require('path');
const langformat = require('./utils/main.js').langformat;

const deudasdirectorio = path.join(__dirname, 'datos/deudas.json');
let deudas = require(deudasdirectorio);

function inject(bot, lang, prefix, admin, tpmaterial) {
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

        } else {
          aumentardeuda(username.toLowerCase(), nick)
        }
        break;
      case 'restartp':
        if (username != admin) return;
        if (!cmd[1]) return;

        deudas[cmd[1]].deuda--;

        bot.chat(langformat(lang.ladeudade, [cmd[1], deudas[cmd[1]].deuda]));
        console.log(langformat(lang.ladeudade, [cmd[1], deudas[cmd[1]].deuda]));

        if (deudas[cmd[1]].deuda === 0 && !deudas[cmd[1]].toggle) delete deudas[cmd[1]]
        guardar();
        break;
      case 'deuda':
        if (!cmd[1]) decirdeuda(username.toLowerCase())
        else decirdeuda(cmd[1].toLowerCase());
        break;
      case 'pagartp':
        if (!cmd[1]) pagardeuda(username, username)
        else pagardeuda(cmd[1], username);
      case 'tptoggle':
        username = username.toLowerCase();
        if (!deudas[username]) deudas[username] = {
          deuda: 0,
          toggle: false
        }

        if (cmd[1] === 'on') deudas[username].toggle = true;
        else if (cmd[1] === 'off') deudas[username].toggle = false;
        else deudas[username.toLowerCase()].toggle = !deudas[username].toggle;

        let msg;
        if (deudas[username].toggle) msg = lang.activado;
        else msg = lang.desactivado;
        bot.chat(langformat(lang.toggleado, [msg]));

        if (deudas[username].deuda === 0 && !deudas[username].toggle) delete deudas[username]
        guardar()
    }
  })

  function aumentardeuda(username, nick) {
    let estaonline = false;
    Object.keys(bot.players).forEach(element => {
      if (element.toLowerCase() === nick) {
        estaonline = true;
      }
    })
    if (!deudas[username]) deudas[username] = {
      deuda: 0,
      toggle: false
    }
    if (deudas[username].deuda >= 5) {
      bot.chat(langformat(lang.deudaalmax, [prefix]));

    } else if (!estaonline) {
      bot.chat(lang.noestaonline);
    } else if (deudas[nick] && deudas[nick].toggle) {
      bot.chat(lang.tienetoggle)
    } else {

      deudas[username].deuda++;
      bot.chat(`/tp ${username} ${nick}`);

      bot.chat(langformat(lang.tudeuda, [deudas[username].deuda]));

      guardar();
    }
  }

  function pagardeuda(username, jugadorquepaga) {
    if (!deudas[username.toLowerCase()] || deudas[username.toLowerCase().deuda <= 0]) {
      bot.chat(lang.notienesdeuda);

    } else {
      bot.chat(`/execute unless entity @a[name="${jugadorquepaga}",nbt={SelectedItem:{id:"${tpmaterial}",Count:64b}}] run tellraw @a "${lang.notienescuarzo}"`);
      bot.chat(`/execute if entity @a[name="${jugadorquepaga}",nbt={SelectedItem:{id:"${tpmaterial}",Count:64b}}] run tellraw ${bot.username} "<${admin}> ${prefix}restartp ${username.toLowerCase()}"`);
      bot.chat(`/execute if entity @a[name="${jugadorquepaga}",nbt={SelectedItem:{id:"${tpmaterial}",Count:64b}}] run clear ${jugadorquepaga} ${tpmaterial} 64`);
    }
  }

  function decirdeuda(username) {
    if (!deudas[username]) bot.chat(langformatt(lang.ladeudade, [username, 0]));
    else bot.chat(langformat(lang.ladeudade, [username, deudas[username.deuda]]));
  }

  function guardar() {
    const json_deudas = JSON.stringify(deudas, null, 2);
    fs.writeFileSync(deudasdirectorio, json_deudas, 'utf-8');
  }
}