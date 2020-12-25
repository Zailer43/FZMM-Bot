module.exports = inject;

const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
//const vec3 = require('vec3');
const axios = require('axios').default;
const sleep = require('./utils/main.js').sleep;
const langformat = require('./utils/main.js').langformat;

const color = require('./cmds/color.js').colorcmd;
const calc = require('./cmds/calc.js').calccmd;
const xp = require('./cmds/xp.js').xpcmd;
const tradeos = require('./cmds/tradeos.js').tradeoscmd;
const tps = require('./cmds/tps.js').tpscmd;
const base64 = require('./cmds/base64.js').base64cmd;
const pingserver = require('./cmds/pingserver.js').pingservercmd;
const pingms = require('./cmds/pingms.js').pingcmd;
const jokes = require('./cmds/jokes.js').jokescmd;
const uuid = require('./cmds/uuid.js').uuidcmd;
const entidades = require('./cmds/entidades.js').entidadescmd;
const armorstand = require('./cmds/armorstand.js').armorstandcmd;
const stack = require('./cmds/stack.js').stackcmd;
const cantidad = require('./cmds/cantidad.js').cantidadcmd;
const { calavera, perdoanme, caraocruz } = require('./cmds/random.js');
const { helpcmd, helpcomando } = require('./cmds/help.js');
const { volumencmd, sonidocmd, tageo } = require('./cmds/tag.js');
const { encuestascmd, votecmd } = require('./cmds/encuestas.js');
const { tpcmd, deudacmd, pagartpcmd, tptogglecmd } = require('./cmds/tp.js')

function inject(bot, lang, prefix, antiafk, subfixteams, spamearsplash) {

  bot.loadPlugin(tpsPlugin)

  let afk = [];


  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;

    let afkesta = afk.find(({
      nick
    }) => nick === username);
    if (afkesta) {
      let segundos = parseInt((Date.now() - afkesta.tiempo) / 1000);
      let minutos = parseInt(segundos / 60);
      segundos = segundos % 60;
      bot.chat(langformat(lang.afk.fin, [afkesta.nick, minutos, segundos]));
      bot.chat(`/team modify ${username}${subfixteams} prefix ""`);

      delete afkesta.nick, afkesta.tiempo;
    }
    tageo(bot, username, message);
  })

  bot.on('comando', function (username, message) {
    if (username === bot.username) return;
    switch (message.toLowerCase()) {
      case 'ping':
        pingms(bot, username);
        break;
      case 'tps':
        tps(bot);
        bot.chat('/tellraw ' + bot.username + ' [{"text":"' + prefix + 'entidadescount "},{"selector":"@e"}]');
        break;
      case 'entidades':
        bot.chat('/tellraw ' + bot.username + ' [{"text":"' + prefix + 'entidadescount "},{"selector":"@e"}]');
        break;
      case 'uuid':
        uuid(bot, username);
        break;
      case 'mimir':
        goToSleep();
        break;
      case 'bot ram':
        bot.chat('Tengo un total de ' + (parseInt((require('os').freemem() / 1024) / 1024)).toString() + 'MB libres')
        break;
      case 'montar':
        const vehiculo = bot.nearestEntity((entity) => {
          return entity.type === 'object'
        })
        if (vehiculo) bot.mount(vehiculo)
        break;
      case 'jokes':
        jokes(bot);
        break;
      case 'inv':
        console.log(bot.inventory)
        break;
      case 'afk':
        afk.push({
          nick: username,
          tiempo: Date.now()
        });
        bot.chat(lang.afk.nuevo);
        bot.chat(`/team modify ${username}${subfixteams} prefix {"text":"${lang.afk.prefix}","color":"#aeee00"}`);
        break;
      case 'tradeos':
        tradeos(bot)
        break;
      case 'calavera':
        calavera(bot);
        break;
      case 'perdoname':
        perdoanme(bot);
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
        else pingserver(bot, cmd[1]);
        break;
      case 'uuid':
        if (!cmd[1]) return;
        uuid(bot, cmd[1]);
        break;
      case 'coords':
        if (!cmd[3]) helpcomando(bot, 'coords');
        else {
          const x = parseInt(cmd[2], 10);
          const z = parseInt(cmd[3], 10);
          switch (cmd[1]) {
            case 'overworld':
              bot.chat(langformat(lang.coords.mensaje, ['nether', Math.round(x / 8), Math.round(z / 8)]));
              break;
            case 'nether':
              bot.chat(langformat(lang.coords.mensaje, ['overworld', x * 8, z * 8]));
              break;
            case 'end':
              bot.chat(lang.coords.end);
              break;
          }
        }
        break;
      case 'color':
        if (!cmd[1]) helpcomando(bot, 'color');
        else color(bot, username, cmd[1], cmd[2])
        break;
      case 'stack':
        if (!cmd[1]) helpcomando(bot, 'stack');
        else stack(bot, Math.round(cmd[1]), Math.round(cmd[2]));
        break;
      case 'cantidad':
        if (!cmd[1]) helpcomando(bot, 'cantidad');
        else cantidad(bot, Math.round(cmd[1]), Math.round(cmd[2]), Math.round(cmd[3]));
        break;
      case 'itemframe':
        if (!cmd[1]) helpcomando(bot, 'itemframe');
        else {
          const cmditemframe = '/execute %0$ entity @a[name="%1$",nbt={SelectedItem:{id:"minecraft:item_frame",Count:%2$b}}] run ';
          bot.chat(langformat(cmditemframe, ['unless', username, cmd[1]]) + `tellraw @a "${lang.itemframe.notienes}"`);
          bot.chat(langformat(cmditemframe, ['if', username, cmd[1]]) + `tellraw @a "${lang.itemframe.funciono}"`);
          bot.chat(langformat(cmditemframe, ['if', username, cmd[1]]) + `give ${username} item_frame{display:{Name:'{"text":"${lang.itemframe.nombre}","color":"#36CC57"}'},EntityTag:{Invisible:1b}} ${cmd[1]}`);
          sleep(150);
          bot.chat(langformat(cmditemframe, ['if', username, cmd[1]]) + `replaceitem entity ${username} weapon.mainhand air`);
        }
        break;
      case 'ping':
        if (!cmd[1]) return;
        pingms(bot, cmd[1])
        break;
      case 'length':
        if (!cmd[1]) helpcomando(bot, 'length');
        else {
          var longitudcmd = cmd;
          longitudcmd.shift();
          longitudcmd = longitudcmd.join(' ');
          longitudcmd = longitudcmd.length;
          bot.chat(langformat(lang.longitud, [longitudcmd]));
        }
        break;
      case 'reverse':
        if (!cmd[1]) helpcomando(bot, 'reverse');
        else {
          var reverse = cmd;
          reverse.shift();
          reverse = reverse.join(' ').split('').reverse().join('');
          bot.chat(reverse);
          console.log(reverse);
        }
        break;
      case 'base64':
        if (!cmd[2]) helpcomando(bot, 'base64');
        else {
          const elegido = cmd[1];
          cmd.shift();
          cmd.shift();
          base64(bot, elegido, cmd.join(' '));
        }
        break;
      case 'armorstand':
        if (!cmd[1]) helpcomando(bot, 'armorstand');
        else armorstand(bot, username, cmd[1]);
        break;
      case 'calc':
        if (!cmd[3]) helpcomando(bot, 'calc');
        else calc(bot, +cmd[1], cmd[2], +cmd[3], cmd[4])
        break;
      case 'xp':
        if (!cmd[2]) helpcomando(bot, 'xp');
        else xp(bot, +cmd[1], +cmd[2], cmd[3]);
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
        if (!cmd[1]) helpcomando(bot, tp)
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

  bot.on('entidadescount', function (message) {
    entidades(bot, message)
  })

  let jugadormovistar, movistardetect = 0;

  bot.on('join', function (username) {
    if (jugadormovistar === username) {
      movistardetect++;

      if (movistardetect === 5) {
        bot.chat(lang.movistardetect);
        movistardetect = 0;

      } else bot.chat(lang.hi);

    } else {
      jugadormovistar = username;
      movistardetect = 0;
      bot.chat(lang.hi)
    }
  });

  bot.on('leave', function (username) {
    if (afk.find(({
        nick
      }) => nick === username)) bot.chat(`/team modify ${username}${subfixteams} prefix ""`)
  });

  if (antiafk) {
    setInterval(() => {
      bot.chat(`/tell ${bot.username} ${lang.antiafk}`)
    }, 180000)
  }

  if (spamearsplash) {
    setInterval(() => {
      const splash = require('./datos/splash.json');
      bot.chat(splash[parseInt(Math.random() * splash.length)])
    }, (25 * 1000) * 60)
  }

  function goToSleep() {
    const bed = bot.findBlock({
      matching: block => bot.isABed(block)
    })
    if (bed) {
      bot.sleep(bed, (err) => {
        if (err) {
          bot.chat(lang.mimir.error + err.message)
        } else {
          bot.chat(lang.mimir.zzz)
          console.log(lang.mimir.zzz)
        }
      })
    } else {
      bot.chat(lang.mimir.nocamas)
    }
  }



  bot.on('death', () => {
    bot.chat('/tp @r[name=!' + bot.username + ']');
  });
}