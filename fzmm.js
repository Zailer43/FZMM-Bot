const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const vec3 = require('vec3');
const axios = require('axios').default;

const config = require('./fzmm/datos/config.json');
const credenciales = require('./fzmm/credenciales.json');
const lang = require('./fzmm/lang/' + config.lang + '.json').fzmm;

let nick, contra, puerto;
if (config.premium) {
  nick = credenciales.username;
  contra = credenciales.password;
} else {
  nick = 'FraZaMaMe';
  contra = null;
}

if (config.port) {
  puerto = config.port;
}

const bot = mineflayer.createBot({
  host: process.argv[2], // mf.a68agaming.net explosivo116.aternos.me kaboom.pw 64.42.182.186 projectkingdoom.mc.gg
  port: puerto,
  username: nick,
  password: contra,
  version: config.version,
  chatLengthLimit: config.longitudchat,
  viewDistance: config.chunkrender,
  checkTimeoutInterval: (60 * 1000)
});

bot.loadPlugin(tpsPlugin)

//comandos públicos
bot.on('chat2', function (username, message) {
  if (username === bot.username) return;

  if (message.toLowerCase().startsWith(config.prefix)) {

    message = message.slice(config.prefix.length);
    switch (message.toLowerCase()) {
      case 'ping':
        pingms(username);
        break;
      case 'tps':
        obtenertps();
        bot.chat('/tellraw ' + bot.username + ' [{"text":"fz!entidadescount "},{"selector":"@e"}]');
        break;
      case 'uuid':
        obteneruuidynicks(username);
        break;
      case 'mimir':
        goToSleep();
        break;
      case 'armorstand arms':
        bot.chat(lang.armorstand.execute + username + lang.armorstand.execute2 + 'ShowArms:1b}')
        break;
      case 'armorstand base':
        bot.chat(lang.armorstand.execute + username + lang.armorstand.execute2 + 'NoBasePlate:1b}')
        break;
      case 'armorstand small':
        bot.chat(lang.armorstand.execute + username + lang.armorstand.execute2 + 'Small:1b}')
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
        jokes();
        break;
      case 'inv':
        console.log(bot.inventory)
    }

    const cmd = message.split(' ');
    if (cmd.length === 1) return;

    switch (cmd[0]) {
      case 'server':
        pingsv(cmd[1]);
        break;
      case 'uuid':
        obteneruuidynicks(cmd[1]);
        break;
      case 'coords':
        if (cmd.length === 4) {
          const x = parseInt(cmd[2], 10);
          const z = parseInt(cmd[3], 10);
          switch (cmd[1]) {
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
        } else {
          bot.chat(lang.coords.error + config.prefix + 'coords <dimension actual> <x> <z>')
        }
        break;
      case 'color':
        if (cmd.length === 2) {
          switch (cmd[1]) {
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
              bot.chat('/team modify ' + username + lang.color.subfixteam + ' color ' + cmd[1]);
              bot.chat(lang.color.nuevocolor)
              break;
            default:
              bot.chat(lang.color.desconocido + config.prefix + lang.color.desconocido2);
              break;
          }
        } else {
          bot.chat(lang.color.error + config.prefix + 'colores')
        }
        break;
      case 'stack':
        // fz!stack 64 <cantidad> -> Son ?? stacks y sobra ??
        if (cmd.length === 3) {
          const tipo = parseInt(cmd[1]);
          const cantidad = parseInt(cmd[2]);
          if (cantidad > 250000) {
            bot.chat(lang.conversor.error + lang.conversor.muygrande);
            return;

          } else if (cantidad < 0) {
            bot.chat(lang.conversor.error + lang.conversor.negativo);
            return;
          }

          if (tipo === 64 || tipo === 16) {
            bot.chat(lang.conversor.son + Math.trunc(cantidad / tipo) + lang.conversor.stack1 + tipo + lang.conversor.stack2 + cantidad % tipo)
            break;
          } else {
            bot.chat(lang.conversor.error + lang.conversor.sintaxis1 + config.prefix + lang.conversor.sintaxisstack);
          }
        } else {
          bot.chat(lang.conversor.error + lang.conversor.falta);
        }
        break;
      case 'cantidad':
        // fz!cantidad 64 <cantidad (stacks)> <sobra> -> Son ?? Items
        if (cmd.length === 4) {
          const tipo = parseInt(cmd[1]);
          const cantidadStacks = parseInt(cmd[2]);
          const sobra = parseInt(cmd[3]);
          if (cantidadStacks > 25000 || sobra > 64) {
            bot.chat(lang.conversor.error + lang.conversor.muygrande);
            return;
          } else if (cantidadStacks < 0 || sobra < 0) {
            bot.chat(lang.conversor.error + lang.conversor.negativo);
            return;
          }
          if (tipo === 64 || tipo === 16) {
            bot.chat(lang.conversor.son + ((cantidadStacks * tipo) + sobra) + lang.conversor.cantidad1);
          } else {
            bot.chat(lang.conversor.error + lang.conversor.sintaxis1 + config.prefix + lang.conversor.sintaxiscantidad);
          }
        } else {
          bot.chat(lang.conversor.error + lang.conversor.falta);
        }
        break;
      case 'itemframe':
        bot.chat('/execute if entity @a[name="' + username + '",nbt={SelectedItem:{id:"minecraft:item_frame",Count:' + cmd[1] + 'b}}] run give ' + username + ' item_frame{display:{Name:\'{"text":"' + lang.itemframe + '","color":"#36CC57"}\'},EntityTag:{Invisible:1b}} ' + cmd[1]);
        sleep(150);
        bot.chat('/execute if entity @a[name="' + username + '",nbt={SelectedItem:{id:"minecraft:item_frame",Count:' + cmd[1] + 'b}}] run replaceitem entity  ' + username + ' weapon.mainhand air');
        break;
      case 'ping':
        pingms(cmd[1])
        break;
      case 'length':
        console.log(cmd)
        var longitudcmd = cmd;
        longitudcmd.shift();
        longitudcmd = longitudcmd.join(' ');
        longitudcmd = longitudcmd.length;
        bot.chat(lang.longitud + longitudcmd.toString());
        break;
    }
  }
});

bot.on('entidadescount', function (message) {
  const entidades = (message.split(', ')).length;
  bot.chat(lang.entidadescount + entidades + lang.entidadescount2);
  console.log(lang.entidadescount + entidades + lang.entidadescount2);
})

let jugadormovistar, movistardetect = 0;

bot.on('join', function (username) {
  if (jugadormovistar === username) {
    movistardetect++;
    if (movistardetect >= 5) bot.chat(lang.movistardetect);
    
  } else {
    jugadormovistar = username;
    movistardetect = 0;
    bot.chat(lang.hi)
  }
});

function pingms(username) {
  try {
    //console.log(bot.players);
    Object.keys(bot.players).forEach(element => {
      if (element.toLowerCase() === username.toLowerCase()) {
        let pingms = bot.players[element].ping;
        bot.chat(lang.ping.ping + element + lang.ping.ping2 + pingms + ' ms');
        console.log(lang.ping.ping + element + lang.ping.ping2 + pingms + ' ms');
      };
    })

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
      bot.chat(lang.pingserver.error)
    });
}

function jokes() {
  axios.get('https://icanhazdadjoke.com/slack')
    .then(jokesdatos => {
      console.log(jokesdatos.data.attachments[0].text);
      bot.chat(jokesdatos.data.attachments[0].text);
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
exports.ip = process.argv[2];
/*
bot.on('message', function (message) {
  console.log(message)
})
*/
const langrequire = './fzmm/lang/' + config.lang + '.json';
require('./fzmm/texto.js')(bot, require(langrequire).texto, config.prefix, require(langrequire).help);
require('./fzmm/admin.js')(bot, require(langrequire).admin, config.admin, config.prefix, config.saltar, config.seguir, config.lang);
require('./fzmm/random.js')(bot, require(langrequire).random, config.prefix, config.spamearsplash);
require('./fzmm/estilosdechat.js')(bot);
require('./fzmm/encuestas.js')(bot, require(langrequire).encuestas, config.prefix, config.spamearencuesta)
require('./fzmm/tageos.js')(bot, require(langrequire).tageos, config.prefix, config.tageosmax)
if (config.administrartp) {
  require('./fzmm/tp.js')(bot, require(langrequire).tp, config.prefix, config.admin);
}
if (config.web) {
  require('./fzmm/web.js')(bot, config.prefix, config.admin, config.webport, config.serverpassword, config.repetir, config.mirar, config.saltar, config.seguir, config.shift);
}
delete config.saludar, config.saltar, config.seguir, config.lang, config.spamearsplash, config.spamearencuesta, config.tageosmax, config.webport, config.serverpassword, config.repetir, config.mirar, config.shift;

if (config.antiafk) {
  setInterval(() => {
    bot.chat(lang.antiafk)
  }, 180000)
}