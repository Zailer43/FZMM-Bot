const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const vec3 = require('vec3');
const axios = require('axios').default;

const config = require('./fzmm/datos/config.json');
const credenciales = require('./fzmm/credenciales.json');
const lang = require('./fzmm/lang/' + config.lang + '.json').fzmm;

const ip = process.argv[2];
// mf.a68agaming.net explosivo116.aternos.me kaboom.pw 64.42.182.186 projectkingdoom.mc.gg
let nick, contra, puerto;
if (config.premium) {
  nick = credenciales.username;
  contra = credenciales.password;
} else {
  nick = 'FraZaMaMe';
  contra = null;
}

if (config.usarport) {
  puerto = config.port;
} else {
  puerto = null;
}

const bot = mineflayer.createBot({
  host: ip,
  port: puerto,
  username: nick,
  password: contra,
  version: config.version,
  chatLengthLimit: config.longitudchat,
  viewDistance: config.chunkrender,
  checkTimeoutInterval: (60 * 1000)
});

const prefixlongi = config.prefix.length;

bot.loadPlugin(tpsPlugin)

//comandos públicos
bot.on('chat2', function (username, message) {
  if (username === bot.username) return;
  if (message.toLowerCase().startsWith(config.prefix)) {
    switch (message.toLowerCase()) {
      case (config.prefix + 'ping'):
        pingms(username);
        break;
      case (config.prefix + 'tps'):
        obtenertps();
        bot.chat('/tellraw ' + bot.username + ' [{"text":"fz!entidadescount "},{"selector":"@e"}]');
        break;
      case (config.prefix + 'uuid'):
        obteneruuidynicks(username);
        break;
      case (config.prefix + 'mimir'):
        goToSleep();
        break;
      case (config.prefix + 'armorstand arms'):
        bot.chat('/execute as @a[name="' + username + '"] run data merge entity @e[type=armor_stand,limit=1,sort=nearest] {ShowArms:1b}')
        break;
      case (config.prefix + 'armorstand base'):
        bot.chat('/execute as @a[name="' + username + '"] run data merge entity @e[type=armor_stand,limit=1,sort=nearest] {NoBasePlate:1b}')
        break;
        case (config.prefix + 'armorstand small'):
          bot.chat('/execute as @a[name="' + username + '"] run data merge entity @e[type=armor_stand,limit=1,sort=nearest] {Small:1b}')
          break;
    }
    if (message.toLowerCase().startsWith(config.prefix + 'server ')) {
      pingsv(message.slice((prefixlongi + 7)));

    } else if (message.toLowerCase().startsWith(config.prefix + 'uuid ')) {
      obteneruuidynicks(message.slice((prefixlongi + 5)));

    } else if (message.toLowerCase().startsWith(config.prefix + 'coords ')) {
      const cmd = message.split(' ');
      if (cmd.length === 4) {
        const dimension = cmd[1];
        const x = parseInt(cmd[2], 10);
        const z = parseInt(cmd[3], 10);
        switch (dimension) {
          case 'overworld':
            bot.chat(lang.coords.overworld + (x / 8) + ' ' + (z / 8));
            break;
          case 'nether':
            bot.chat(lang.coords.nether + (x * 8) + ' ' + (z * 8));
            break;
          case 'end':
            bot.chat(lang.coords.end);
            break;
        }
      }
    } else if (message.toLowerCase().startsWith(config.prefix + 'color ')) {
      const elegircolor = message.split(' ');
      if (elegircolor.length === 2) {
        switch (elegircolor[1]) {
          case 'aqua':
          case 'black':
          case 'blue':
          case 'dark_aqua':
          case 'dark_blue':
          case 'dark_gray':
          case 'dark_green':
          case 'dark_purple':
          case 'dark_red':
          case 'gold':
          case 'gray':
          case 'green':
          case 'light_purple':
          case 'red':
          case 'white':
          case 'yellow':
            bot.chat(lang.color.executeif + username + lang.color.executeteam + username + lang.color.subfixteam + lang.color.executerun + 'leave ' + username);
            sleep(450);
            bot.chat(lang.color.executeif + username + lang.color.executeteam + username + lang.color.subfixteam + lang.color.executerun + 'add ' + username + lang.color.subfixteam);
            sleep(450);
            bot.chat(lang.color.executeif + username + lang.color.executeteam + username + lang.color.subfixteam + lang.color.executerun + 'join ' + username + lang.color.subfixteam + ' ' + username);
            sleep(450);
            bot.chat('/team modify ' + username + lang.color.subfixteam + ' color ' + elegircolor[1]);
            bot.chat(lang.color.nuevocolor)
            break;
          default:
            bot.chat(lang.color.desconocido + config.prefix + lang.color.desconocido2);
            break;

        }
      }
    } else if (message.toLowerCase().startsWith(config.prefix + 'stack ')) {
      // fz!stack 64 ?? -> Son ?? stacks y sobra ??
      const stacks = message.split(' ');
      if (stacks.length === 3) {
        if (parseInt(stacks[2]) > 250000) {
          bot.chat(lang.conversor.error + lang.conversor.muygrande);
          return;
        } else if (parseInt(stacks[2]) < 0) {
          bot.chat(lang.conversor.error + lang.conversor.negativo);
          return;
        }
        switch (parseInt(stacks[1])) {
          case 64:
          case 16:
            bot.chat(lang.conversor.son + Math.trunc(parseInt(stacks[2]) / parseInt(stacks[1])) + lang.conversor.stack1 + parseInt(stacks[1]) + lang.conversor.stack2 + parseInt(stacks[2]) % parseInt(stacks[1]))
            break;
          default:
            bot.chat(lang.conversor.error + lang.conversor.sintaxis1 + config.prefix + lang.conversor.sintaxisstack);
        }
      } else {
        bot.chat(lang.conversor.error + lang.conversor.falta);
      }
    } else if (message.toLowerCase().startsWith(config.prefix + 'cantidad ')) {
      // fz!cantidad 64 ?? ?? -> Son ?? Items
      const cantidad = message.split(' ');
      if (cantidad.length === 4) {
        if (parseInt(cantidad[2]) > 25000 || parseInt(cantidad[3]) > 64) {
          bot.chat(lang.conversor.error + lang.conversor.muygrande);
          return;
        } else if (parseInt(cantidad[2]) < 0 || parseInt(cantidad[3]) < 0) {
          bot.chat(lang.conversor.error + lang.conversor.negativo);
          return;
        }
        switch (parseInt(cantidad[1])) {
          case 64:
          case 16:
            bot.chat(lang.conversor.son + ((parseInt(cantidad[2]) * parseInt(cantidad[1])) + parseInt(cantidad[3])) + lang.conversor.cantidad1);
            break;
          default:
            bot.chat(lang.conversor.error + lang.conversor.sintaxis1 + config.prefix + lang.conversor.sintaxiscantidad);
        }
      } else {
        bot.chat(lang.conversor.error + lang.conversor.falta + lang.conversor.falta2);
      }
    } else if (message.toLowerCase().startsWith(config.prefix + 'itemframe ')) {
      const itemframes = message.split(' ');
      bot.chat('/execute if entity @a[name="' + username + '",nbt={SelectedItem:{id:"minecraft:item_frame",Count:' + itemframes[1] + 'b}}] run give ' + username + ' item_frame{display:{Name:\'{"text":"' + lang.itemframe + '","color":"#36CC57"}\'},EntityTag:{Invisible:1b}} ' + itemframes[1]);
      sleep(150);
      bot.chat('/execute if entity @a[name="' + username + '",nbt={SelectedItem:{id:"minecraft:item_frame",Count:' + itemframes[1] + 'b}}] run replaceitem entity  ' + username + ' weapon.mainhand air');
    } else if (message.toLowerCase().startsWith(config.prefix + 'ping ')) {
      const pingmessage = message.split(' ');
      pingms(pingmessage[1]);
    }
  }
});

bot.on('entidadescount', function (message) {
  const entidades = (message.split(', ')).length;
  bot.chat(lang.entidadescount + entidades + lang.entidadescount2);
  console.log(lang.entidadescount + entidades + lang.entidadescount2);
})

function pingms(username) {
  try {
      let pingms = bot.players[username].ping;
      bot.chat(lang.ping.ping + username + lang.ping.ping2 + pingms + ' ms');
      console.log(lang.ping.ping + username + lang.ping.ping2 + pingms + ' ms');
  } catch (e) {
    bot.chat(lang.ping.error);
  }
  
}

function pingsv(ip) {
  axios.get('https://api.mcsrvstat.us/2/' + ip)
    .then(serverdatos => {
      console.log(lang.pingserver.motd + serverdatos.data.motd.clean);
      bot.chat(lang.pingserver.motd + serverdatos.data.motd.clean);
      console.log(lang.pingserver.jugadores + serverdatos.data.players.online + '/' + serverdatos.data.players.max);
      bot.chat(lang.pingserver.jugadores + serverdatos.data.players.online + '/' + serverdatos.data.players.max);
    })
    .catch(error => {
      console.log(error);
    });
}

function obtenertps() {
  let tps = bot.getTps();
  let tpsmessage = lang.tps.actual + tps + lang.tps.prefix;
  if (tps === 20) {
    tpsmessage += lang.tps.perfecto
  } else if (tps === 19) {
    tpsmessage += lang.tps.casisinlag
  } else if (tps >= 16 && tps <= 18) {
    tpsmessage += lang.tps.unpocolag
  } else if (tps >= 14 && tps <= 15) {
    tpsmessage += lang.tps.lag
  } else if (tps >= 11 && tps <= 13) {
    tpsmessage += lang.tps.lageado
  } else if (tps >= 6 && tps <= 10) {
    tpsmessage += lang.tps.muylageado
  } else if (tps >= 2 && tps <= 5) {
    tpsmessage += lang.tps.injugable
  } else if (tps >= 0 && tps <= 1) {
    tpsmessage += lang.tps.terrible
  }
  tpsmessage += lang.tps.subfix;
  bot.chat(tpsmessage)
  console.log(tpsmessage)
}

function obteneruuidynicks(nick) {
  axios.get('https://api.mojang.com/users/profiles/minecraft/' + nick)
    .then(function (uuid) {
      console.log(lang.uuid.es + uuid.data.name + lang.uuid.es2 + uuid.data.id);
      bot.chat(lang.uuid.es + uuid.data.name + lang.uuid.es2 + uuid.data.id);
      axios.get('https://api.mojang.com/user/profiles/' + uuid.data.id + '/names')
        .then(function (historial) {
          var longinicks = Object.keys(historial.data).length;
          var historialdenicks = '';
          for (var i = 0; i != longinicks; i++) {
            historialdenicks = historialdenicks + historial.data[i].name;
            if (i != (longinicks - 1))
              historialdenicks = historialdenicks + ', ';
          }
          console.log(lang.uuid.nicks + historialdenicks);
          bot.chat(lang.uuid.nicks + historialdenicks);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
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
/*function split(str, sep, n) {
  var out = [];

  while (n--) out.push(str.slice(sep.lastIndex, sep.exec(str).index));

  out.push(str.slice(sep.lastIndex));
  return out;
}*/

function sleep(ms) {
  var r = Date.now() + ms;
  while (Date.now() < r) {}
}

bot.on('death', () => {
  bot.chat('/tp @r[name=!' + bot.username + ']');
});

exports.sleep = sleep;
exports.ip = ip;
/*
bot.on('message', function (message) {
  console.log(message)
})
*/
const texto = require('./fzmm/texto.js')(bot, require('./fzmm/lang/' + config.lang + '.json').texto, config.prefix, config.saludar, prefixlongi);
const admin = require('./fzmm/admin.js')(bot, require('./fzmm/lang/' + config.lang + '.json').admin, prefixlongi, config.admin, config.serverpassword, config.prefix, config.saltar, config.seguir);
const random = require('./fzmm/random.js')(bot, require('./fzmm/lang/' + config.lang + '.json').random, config.prefix);
const estilosdechat = require('./fzmm/estilosdechat.js')(bot);
if (config.administrartp) {
  const tp = require('./fzmm/tp.js')(bot, require('./fzmm/lang/' + config.lang + '.json').tp, prefixlongi, config.prefix, config.admin);
}
if (config.web) {
  const web = require('./fzmm/web.js')(bot, config.admin, config.serverpassword, config.repetir, config.mirar, config.saltar, config.seguir, config.shift);
}

if (config.antiafk) {
  setInterval(() => {
      bot.chat(lang.antiafk)
  }, 180000)
}