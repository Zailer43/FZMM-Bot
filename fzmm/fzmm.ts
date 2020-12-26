module.exports = inject;

import mineflayer from 'mineflayer';
const tpsPlugin = require('mineflayer-tps')(mineflayer)
import { sleep, langformat } from './utils/main.js';

import { colorcmd } from './cmds/color.js';
import { calccmd } from './cmds/calc.js';
import { xpcmd } from './cmds/xp.js';
import { tradeoscmd } from './cmds/tradeos.js';
import { tpscmd } from './cmds/tps.js';
import { base64cmd } from './cmds/base64.js';
import { pingservercmd } from './cmds/pingserver.js';
import { pingcmd } from './cmds/pingms.js';
import { jokescmd } from './cmds/jokes.js';
import { uuidcmd } from './cmds/uuid.js';
import { entidadescmd } from './cmds/entidades.js';
import { armorstandcmd } from './cmds/armorstand.js';
import { stackcmd } from './cmds/stack.js';
import { cantidadcmd } from './cmds/cantidad.js';
import { calavera, perdoname, caraocruz } from './cmds/random.js';
import { helpcmd, helpcomando } from './cmds/help.js';
import { volumencmd, sonidocmd, tageo } from './cmds/tag.js';
import { encuestascmd, votecmd } from './cmds/encuestas.js';
import { tpcmd, deudacmd, pagartpcmd, tptogglecmd } from './cmds/tp.js';

import { fzmm } from './lang/es.json';
import { prefix, antiafk, subfixteams, spamearsplash } from './datos/config.json'

function inject(bot: any) {

  bot.loadPlugin(tpsPlugin)

  let afk: Array<{ nick: string, tiempo: number }> = [];


  bot.on('chat2', function (username: string, message: string) {
    if (username === bot.username) return;

    let afkesta = afk.find(({
      nick
    }) => nick === username);
    if (afkesta) {
      let segundos = Math.ceil((Date.now() - afkesta.tiempo) / 1000);
      let minutos = Math.ceil(segundos / 60);
      segundos = segundos % 60;
      bot.chat(langformat(fzmm.afk.fin, [afkesta.nick, minutos.toString(), segundos.toString()]));
      bot.chat(`/team modify ${username}${subfixteams} prefix ""`);
    }
    tageo(bot, username, message);
  })

  bot.on('comando', function (username: string, message: string) {
    if (username === bot.username) return;
    switch (message.toLowerCase()) {
      case 'ping':
        pingcmd(bot, username);
        break;
      case 'tps':
        tpscmd(bot);
        bot.chat('/tellraw ' + bot.username + ' [{"text":"' + prefix + 'entidadescount "},{"selector":"@e"}]');
        break;
      case 'entidades':
        bot.chat('/tellraw ' + bot.username + ' [{"text":"' + prefix + 'entidadescount "},{"selector":"@e"}]');
        break;
      case 'uuid':
        uuidcmd(bot, username);
        break;
      case 'mimir':
        goToSleep();
        break;
      case 'bot ram':
        bot.chat('Tengo un total de ' + (Math.ceil((require('os').freemem() / 1024) / 1024)).toString() + 'MB libres')
        break;
      case 'montar':
        const vehiculo = bot.nearestEntity((entity: { [key: string]: string }) => {
          return entity.type === 'object'
        })
        if (vehiculo) bot.mount(vehiculo)
        break;
      case 'jokes':
        jokescmd(bot);
        break;
      case 'inv':
        console.log(bot.inventory)
        break;
      case 'afk':
        afk.push({
          nick: username,
          tiempo: Date.now()
        });
        bot.chat(fzmm.afk.nuevo);
        bot.chat(`/team modify ${username}${subfixteams} prefix {"text":"${fzmm.afk.prefix}","color":"#aeee00"}`);
        break;
      case 'tradeos':
        tradeoscmd(bot)
        break;
      case 'calavera':
        calavera(bot);
        break;
      case 'perdoname':
        perdoname(bot);
        break;
      case 'caraocruz':
        caraocruz(bot);
        break;
      case 'pagartp':
        pagartpcmd(bot, username, username);
        break;
      case 'deuda':
        deudacmd(bot, username);
        break;
      case 'tptoggle':
        tptogglecmd(bot, username, false);
        break;
    }

    const cmd = message.split(' ');

    switch (cmd[0].toLowerCase()) {
      case 'server':
        if (!cmd[1]) helpcomando(bot, 'server');
        else pingservercmd(bot, cmd[1]);
        break;
      case 'uuid':
        if (!cmd[1]) return;
        uuidcmd(bot, cmd[1]);
        break;
      case 'coords':
        if (!cmd[3]) helpcomando(bot, 'coords');
        else {
          const x = parseInt(cmd[2], 10);
          const z = parseInt(cmd[3], 10);
          switch (cmd[1]) {
            case 'overworld':
              bot.chat(langformat(fzmm.coords.mensaje, ['nether', Math.round(x / 8).toString(), Math.round(z / 8).toString()]));
              break;
            case 'nether':
              bot.chat(langformat(fzmm.coords.mensaje, ['overworld', (x * 8).toString(), (z * 8).toString()]));
              break;
            case 'end':
              bot.chat(fzmm.coords.end);
              break;
          }
        }
        break;
      case 'color':
        if (!cmd[1]) helpcomando(bot, 'color');
        else colorcmd(bot, username, cmd[1], cmd[2])
        break;
      case 'stack':
        if (!cmd[1]) helpcomando(bot, 'stack');
        else stackcmd(bot, parseInt(cmd[1]), parseInt(cmd[2]));
        break;
      case 'cantidad':
        if (!cmd[1]) helpcomando(bot, 'cantidad');
        else cantidadcmd(bot, parseInt(cmd[1]), parseInt(cmd[2]), parseInt(cmd[3]));
        break;
      case 'itemframe':
        if (!cmd[1]) helpcomando(bot, 'itemframe');
        else {
          const cmditemframe = '/execute %0$ entity @a[name="%1$",nbt={SelectedItem:{id:"minecraft:item_frame",Count:%2$b}}] run ';
          bot.chat(langformat(cmditemframe, ['unless', username, cmd[1]]) + `tellraw @a "${fzmm.itemframe.notienes}"`);
          bot.chat(langformat(cmditemframe, ['if', username, cmd[1]]) + `tellraw @a "${fzmm.itemframe.funciono}"`);
          bot.chat(langformat(cmditemframe, ['if', username, cmd[1]]) + `give ${username} item_frame{display:{Name:'{"text":"${fzmm.itemframe.nombre}","color":"#36CC57"}'},EntityTag:{Invisible:1b}} ${cmd[1]}`);
          sleep(150);
          bot.chat(langformat(cmditemframe, ['if', username, cmd[1]]) + `replaceitem entity ${username} weapon.mainhand air`);
        }
        break;
      case 'ping':
        if (!cmd[1]) return;
        pingcmd(bot, cmd[1])
        break;
      case 'length':
        if (!cmd[1]) helpcomando(bot, 'length');
        else {
          let longitudcmd = cmd;
          longitudcmd.shift();
          let longitudcmdstring: string = longitudcmd.join(' ');
          let longitudcmdlength: number = longitudcmdstring.length;
          bot.chat(langformat(fzmm.longitud, [longitudcmdlength.toString()]));
        }
        break;
      case 'reverse':
        if (!cmd[1]) helpcomando(bot, 'reverse');
        else {
          var reverse = cmd;
          reverse.shift();
          let reversestring = reverse.join(' ').split('').reverse().join('');
          bot.chat(reversestring);
          console.log(reversestring);
        }
        break;
      case 'base64':
        if (!cmd[2]) helpcomando(bot, 'base64');
        else {
          const elegido = cmd[1];
          cmd.shift();
          cmd.shift();
          base64cmd(bot, elegido, cmd.join(' '));
        }
        break;
      case 'armorstand':
        if (!cmd[1]) helpcomando(bot, 'armorstand');
        else armorstandcmd(bot, username, cmd[1]);
        break;
      case 'calc':
        if (!cmd[3]) helpcomando(bot, 'calc');
        else calccmd(bot, +cmd[1], cmd[2], +cmd[3], cmd[4])
        break;
      case 'xp':
        if (!cmd[2]) helpcomando(bot, 'xp');
        else xpcmd(bot, +cmd[1], +cmd[2], cmd[3]);
        break;
      case 'help':
        helpcmd(bot, cmd[1], cmd[2]);
        break;
      case 'tag':
        if (!cmd[1]) helpcomando(bot, 'tag');
        else switch (cmd[1].toLowerCase()) {
          case 'volumen':
            volumencmd(bot, username, parseInt(cmd[2]));
            break;
          case 'sonido':
            sonidocmd(bot, username, cmd[2]);
        }
        break;
      case 'vote':
        if (!cmd[2]) helpcomando(bot, 'vote');
        else votecmd(bot, username, cmd[1], cmd[2]);
        break;
      case 'encuestas':
        encuestascmd(bot, parseInt(cmd[1]));
        break;
      case 'tp':
        if (!cmd[1]) helpcomando(bot, 'tp')
        else tpcmd(bot, username, cmd[1]);
        break;
      case 'pagartp':
        pagartpcmd(bot, cmd[1], username);
        break;
      case 'deuda':
        deudacmd(bot, cmd[1]);
        break;
      case 'tptoggle':
        if (cmd[1]) tptogglecmd(bot, username, cmd[1].toLowerCase())
        break;
    }
  });

  bot.on('entidadescount', function (message: string) {
    entidadescmd(bot, message)
  })

  let jugadormovistar: string, movistardetect: number = 0;

  bot.on('join', function (username: string) {
    if (jugadormovistar === username) {
      movistardetect++;

      if (movistardetect === 5) {
        bot.chat(fzmm.movistardetect);
        movistardetect = 0;

      } else bot.chat(fzmm.hi);

    } else {
      jugadormovistar = username;
      movistardetect = 0;
      bot.chat(fzmm.hi)
    }
  });

  bot.on('leave', function (username: string) {
    if (afk.find(({
      nick
    }) => nick === username)) bot.chat(`/team modify ${username}${subfixteams} prefix ""`)
  });

  if (antiafk) {
    setInterval(() => {
      bot.chat(`/tell ${bot.username} ${fzmm.antiafk}`)
    }, 180000)
  }

  if (spamearsplash) {
    setInterval(() => {
      const splash: Array<string> = require('./datos/splash.json');
      bot.chat(splash[Math.floor(Math.random() * splash.length)])
    }, (25 * 1000) * 60)
  }

  function goToSleep() {
    const bed = bot.findBlock({
      matching: (block: string) => bot.isABed(block)
    })
    if (bed) {
      bot.sleep(bed, (err: { [key: string]: string }) => {
        if (err) {
          bot.chat(fzmm.mimir.error + err.message)
        } else {
          bot.chat(fzmm.mimir.zzz)
          console.log(fzmm.mimir.zzz)
        }
      })
    } else {
      bot.chat(fzmm.mimir.nocamas)
    }
  }



  /*bot.on('death', () => {
    bot.chat('/tp @r[name=!' + bot.username + ']');
  });*/
}