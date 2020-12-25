module.exports = inject;
const mineflayer = require('mineflayer');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const {
  pathfinder,
  Movements
} = require('mineflayer-pathfinder')
const {
  GoalFollow
} = require('mineflayer-pathfinder').goals
const fs = require('fs');
const langformat = require('./utils/main.js').langformat;
const { restartpsecret } = require('./cmds/tp.js')

function uuid() {
  var uuid = "",
    i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

function inject(bot, lang, admin, prefix, seguir, lang2, subfixteams) {

  const Item = require('prismarine-item')(bot.version);
  const mcData = require('minecraft-data')(bot.version);

  let seguirestado = seguir;
  let target, token;
  let admintemporal = [];
  let spameado = 0;
  admintemporal.push(admin)

  bot.loadPlugin(pathfinder);

  bot.on('comando', function (username, message) {
    if (message.toLowerCase() === 'admin') {
      token = uuid();
      console.log(langformat(lang.admin.eltoken, [token]));
      bot.chat(lang.admin.introducetoken)
    } else if (message.toLowerCase().startsWith('admin ')) {
      const admincmd = message.split(' ');
      if (!token) {
        bot.chat(langformat(lang.admin.nohaytoken, [prefix]));
      } else if (admincmd[1] === token) {
        admintemporal.push(username);
        bot.chat(lang.admin.eresadmin);
        token = null;
      } else {
        bot.chat(lang.admin.tokeninvalido);
      }
    }
    if (!admintemporal.includes(username)) return;
    switch (message.toLowerCase()) {
      case 'tp':
        bot.chat('/tp ' + username);
        break;
      case 'gmc':
        bot.chat(lang.gamemode + lang.gmc);
        console.log(lang.gamemode + lang.gmc);
        break;
      case 'gms':
        bot.chat(lang.gamemode + lang.gms);
        console.log(lang.gamemode + lang.gms);
        break;
      case 'gmsp':
        bot.chat(lang.gamemode + lang.gmsp);
        console.log(lang.gamemode + lang.gmsp);
        break;
      case 'heal':
        bot.chat('/heal');
        break;
      case 'nukereal':
        bot.chat('/playsound entity.generic.explode master @a ~ ~ ~');
        console.log(lang.nukereal);
        break;
      case 'load pvp':
        require('./pvp.js')(bot, require('./lang/' + lang2 + '.json').pvp, prefix, admin);
        bot.chat(lang.plugincargado)
        break;
      case 'load minero':
        require('./minero.js')(bot, require('./lang/' + lang2 + '.json').minero, prefix, admin);
        bot.chat(lang.plugincargado)
        break;
    }

    const cmd = message.split(' ');
    if (cmd[0].toLowerCase() === 'setup') {
      let colorprefix = '#',
        prefix = '[Bot]',
        nick = bot.username;

      for (var i = 0; i != 6; i++) colorprefix += Math.floor(Math.random() * 16).toString(16);
      if (cmd[1]) nick = cmd[1];
      if (cmd[2]) prefix = cmd[2];
      if (cmd[3]) colorprefix = cmd[3];

      bot.chat(`/execute if entity @a[name="${nick}",team=!${nick}${subfixteams}] run team leave ${nick}`);
      bot.chat(`/team add ${nick}${subfixteams}`);
      bot.chat(`/team join ${nick}${subfixteams} ${nick}`);
      bot.chat(`/team modify ${nick}${subfixteams} prefix {"text":"${prefix} ","color":"${colorprefix}"}`);

      bot.chat(langformat(lang.setup, [nick, colorprefix]));
      console.log(langformat(lang.setup, [nick, colorprefix]));
    } else if (cmd[0].toLowerCase() === 'restartp') {
        restartpsecret(bot, username, cmd[1]);
    }
  })

  bot.on('guardarcoord', function (username, x, y, z, lugar) {
    if (username != admin) return;
    const path = require('path');
    const coordsdirectorio = path.join(__dirname, 'datos/coords.json');
    const json_coords = fs.readFileSync(coordsdirectorio, 'utf-8');

    let coordenada = JSON.parse(json_coords);

    const d = new Date()
    const fecha = d.getHours().toString() + 'hs ' + d.getDate().toString() + '/' + (d.getMonth() + 1).toString() + '/' + d.getFullYear().toString();
    const server = bot.host;
    var newCoord = {
      id: uuid(),
      fecha,
      server,
      lugar,
      x,
      y,
      z
    };

    coordenada.push(newCoord);
    fs.writeFileSync(coordsdirectorio, JSON.stringify(coordenada, null, 2), 'utf-8');

    bot.chat(lang.guardarcoords)
    console.log(lang.guardarcoords);
  })

  navigatePlugin(bot);

  bot.on('whisper', function (username, message) {
    if (username === bot.username) return;

    if (!admintemporal.includes(username)) return;
    if (message.startsWith(prefix)) {
      message = message.slice(prefix.length)

      switch (message.toLowerCase()) {
        case 'tpa':
          bot.chat('/tpa ' + username);
          console.log('/tpa ' + username);
          break;
        case 'tpaccept':
          bot.chat('/tpaccept');
          break;
        case 'ven':
          target = bot.players[username] ? bot.players[username].entity : null;
          if (!target) return;
          bot.navigate.to(target.position);
          break;
        case 'seguir':
          target = bot.players[username].entity;
          seguirestado = !seguirestado
          if (seguirestado) {
            const defaultmove = new Movements(bot, mcData);
            bot.pathfinder.setMovements(defaultmove);
            bot.pathfinder.setGoal(new GoalFollow(target, 2), true);
          } else if (!seguirestado) {
            bot.pathfinder.setGoal(null)
          }
          break;
        case 'coords':
          console.log(bot.entity.position.toString());
          break;
        case 'drop':
          bot.creative.setInventorySlot(36, new Item(message.slice(5), 64));
          tossNext();
          break;
      }

      const cmd = message.split(' ');
      if (cmd.length === 1) return;

      switch (cmd[0].toLowerCase()) {
        case 'di':
          if (username != admin) return;
          cmd.shift();
          const dicmd = cmd.join(' ');
          bot.chat(dicmd);
          console.log('Dije: ' + dicmd);
          break;
        case 'hat':
          try {
            const bloque = mcData.blocksByName[cmd[1]];
            console.log(bloque);
            bot.creative.setInventorySlot(5, new Item(bloque.drops[0], 1));
          } catch (e) {
            bot.creative.setInventorySlot(5, new Item(cmd[1], 1));
          }
          break;
        case 'spam':
          if (cmd.length <= 3) return; // !spam <cantidad / texto> <delay> <mensaje (admite %s)>
          let cantidadspam, estexto = false,
            texto;

          const regexnumero = /^[0-9]{1,3}$/g;
          if (regexnumero.test(cmd[1]))
            cantidadspam = parseInt(cmd[1]);
          else {
            cantidadspam = cmd[1].length;
            estexto = true;
            texto = cmd[1].split('');
          }

          const delayspam = parseInt(cmd[2]);
          cmd.shift();
          cmd.shift();
          cmd.shift();
          const messagespam = cmd.join(' ');
          spameado = 0;

          const spam = setInterval(() => {

            if (estexto) bot.chat(messagespam.replace(/%s/, texto[spameado]))
            else bot.chat(messagespam.replace(/%s/, spameado + 1));
            spameado++;
            if (spameado >= cantidadspam) clearInterval(spam)
          }, delayspam);

          spam;
          break;
      }
    }
  })

  function tossNext() {
    if (bot.inventory.items().length === 0) return
    const item = bot.inventory.items()[0]
    bot.tossStack(item, tossNext)
  }
}