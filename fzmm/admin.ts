module.exports = inject;

import mineflayer from 'mineflayer';
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
import { pathfinder, Movements } from 'mineflayer-pathfinder'
import { goals } from 'mineflayer-pathfinder';
import fs from 'fs';
import { langformat } from './utils/main.js';
import { restartpsecret } from './cmds/tp.js';
import { admin } from './lang/es.json';
import { botadmin, prefix, seguir, langelegido, subfixteams } from './datos/config.json';

function uuid() {
  var uuid: string = '',
    i: number,
    random: number;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += '-'
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

function inject(bot: any) {

  const Item = require('prismarine-item')(bot.version);
  const mcData = require('minecraft-data')(bot.version);

  let target,
    token: string | null,
    admintemporal: Array<string> = [],
    spameado: number = 0,
    seguirestado: boolean = seguir;

  admintemporal.push(botadmin)

  bot.loadPlugin(pathfinder);

  bot.on('comando', function (username: string, message: string) {
    if (message.toLowerCase() === 'admin') {
      token = uuid();
      console.log(langformat(admin.admin.eltoken, [token]));
      bot.chat(admin.admin.introducetoken)
    } else if (message.toLowerCase().startsWith('admin ')) {
      const admincmd = message.split(' ');
      if (!token) {
        bot.chat(langformat(admin.admin.nohaytoken, [prefix]));
      } else if (admincmd[1] === token) {
        admintemporal.push(username);
        bot.chat(admin.admin.eresadmin);
        token = null;
      } else {
        bot.chat(admin.admin.tokeninvalido);
      }
    }
    if (!admintemporal.includes(username)) return;
    switch (message.toLowerCase()) {
      case 'tp2':
        bot.chat('/tp ' + username);
        break;
      case 'gmc':
        bot.chat(admin.gamemode + admin.gmc);
        console.log(admin.gamemode + admin.gmc);
        break;
      case 'gms':
        bot.chat(admin.gamemode + admin.gms);
        console.log(admin.gamemode + admin.gms);
        break;
      case 'gmsp':
        bot.chat(admin.gamemode + admin.gmsp);
        console.log(admin.gamemode + admin.gmsp);
        break;
      case 'nukereal':
        bot.chat('/playsound entity.generic.explode master @a ~ ~ ~');
        console.log(admin.nukereal);
        break;
      case 'load pvp':
        require('./pvp.js')(bot, require('./lang/' + langelegido + '.json').pvp, prefix, botadmin);
        bot.chat(admin.plugincargado)
        break;
      case 'load minero':
        require('./minero.js')(bot, require('./lang/' + langelegido + '.json').minero, prefix, botadmin);
        bot.chat(admin.plugincargado)
        break;
    }

    const cmd = message.split(' ');
    if (cmd[0].toLowerCase() === 'setup') {
      let color: string = '#',
        prefix: string = '[Bot]',
        nick: string = bot.username;

      for (var i = 0; i != 6; i++) color += Math.floor(Math.random() * 16).toString(16);
      if (cmd[1]) nick = cmd[1];
      if (cmd[2]) prefix = cmd[2];
      if (cmd[3]) color = cmd[3];

      bot.chat(`/execute if entity @a[name="${nick}",team=!${nick}${subfixteams}] run team leave ${nick}`);
      bot.chat(`/team add ${nick}${subfixteams}`);
      bot.chat(`/team join ${nick}${subfixteams} ${nick}`);
      bot.chat(`/team modify ${nick}${subfixteams} prefix {"text":"${prefix} ","color":"${color}"}`);

      bot.chat(langformat(admin.setup, [nick, color]));
      console.log(langformat(admin.setup, [nick, color]));
    } else if (cmd[0].toLowerCase() === 'restartp') {
      restartpsecret(bot, username, cmd[1]);
    }
  })

  bot.on('guardarcoord', function (username: string, x: string, y: string, z: string, lugar: string) {
    if (username != botadmin) return;
    const path = require('path');
    const coordsdirectorio = path.join(__dirname, 'datos/coords.json');
    const json_coords = fs.readFileSync(coordsdirectorio, 'utf-8');

    let coordenada: Array<coordenadainterface> = JSON.parse(json_coords);
    let xnumber = parseInt(x),
      ynumber = parseInt(y),
      znumber = parseInt(z);
    const d: Date = new Date()
    const fecha: string = d.getHours().toString() + 'hs ' + d.getDate().toString() + '/' + (d.getMonth() + 1).toString() + '/' + d.getFullYear().toString();
    const server: string = bot.host;
    var newCoord: coordenadainterface = {
      id: uuid(),
      fecha,
      server,
      lugar,
      x: xnumber,
      y: ynumber,
      z: znumber
    };

    coordenada.push(newCoord);
    fs.writeFileSync(coordsdirectorio, JSON.stringify(coordenada, null, 2), 'utf-8');

    bot.chat(admin.guardarcoords)
    console.log(admin.guardarcoords);
  })

  navigatePlugin(bot);

  bot.on('whisper', function (username: string, message: string) {
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
            bot.pathfinder.setGoal(new goals.GoalFollow(target, 2), true);
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

      const cmd: Array<string> = message.split(' ');
      if (cmd.length === 1) return;

      switch (cmd[0].toLowerCase()) {
        case 'di':
          if (username != botadmin) return;
          cmd.shift();
          const dicmd: string = cmd.join(' ');
          bot.chat(dicmd);
          console.log('Dije: ' + dicmd);
          break;
        case 'hat':
          try {
            const bloque: { [key: string]: string } = mcData.blocksByName[cmd[1]];
            console.log(bloque);
            bot.creative.setInventorySlot(5, new Item(bloque.drops[0], 1));
          } catch (e) {
            bot.creative.setInventorySlot(5, new Item(cmd[1], 1));
          }
          break;
        case 'spam':
          if (cmd.length <= 3) return; // !spam <cantidad / texto> <delay> <mensaje (admite %s)>
          let cantidadspam: number = 0,
            estexto: boolean = false,
            texto: Array<string> = [];

          const regexnumero: RegExp = /^[0-9]{1,3}$/g;
          if (regexnumero.test(cmd[1]))
            cantidadspam = parseInt(cmd[1]);
          else {
            cantidadspam = cmd[1].length;
            estexto = true;
            texto = cmd[1].split('');
          }

          const delayspam: number = parseInt(cmd[2]);
          cmd.shift();
          cmd.shift();
          cmd.shift();
          const messagespam: string = cmd.join(' ');
          spameado = 0;

          const spam: NodeJS.Timeout = setInterval(() => {

            if (estexto) bot.chat(messagespam.replace(/%s/, texto[spameado]))
            else bot.chat(messagespam.replace(/%s/, (spameado + 1).toString()));
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

interface coordenadainterface {
  id: string;
  fecha: string;
  server: string;
  lugar: string;
  x: number;
  y: number;
  z: number;
}