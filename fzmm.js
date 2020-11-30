const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const vec3 = require('vec3');
const axios = require('axios').default;
const util = require('util');

const config = require('./fzmm/datos/config.json');
const credenciales = require('./fzmm/datos/credenciales.json');
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
  host: process.argv[2],
  port: puerto,
  username: nick,
  password: contra,
  version: config.version,
  chatLengthLimit: config.longitudchat,
  viewDistance: config.chunkrender,
  checkTimeoutInterval: (60 * 1000)
});

delete credenciales, nick, contra, puerto

bot.loadPlugin(tpsPlugin)

let afk = [];


bot.on('chat2', function (username) {
  if (username === bot.username) return;

  let afkesta = afk.find(({
    nick
  }) => nick === username);
  if (afkesta) {
    let segundos = parseInt((Date.now() - afkesta.tiempo) / 1000);
    let minutos = parseInt(segundos / 60);
    segundos = segundos % 60;
    bot.chat(util.format(lang.afk.fin, afkesta.nick, minutos, segundos));
    bot.chat(`/team modify ${username}${lang.color.subfixteam} prefix ""`);

    delete afkesta.nick, afkesta.tiempo;
  }
})

bot.on('comando', function (username, message) {
  if (username === bot.username) return;
  switch (message.toLowerCase()) {
    case 'ping':
      pingms(username);
      break;
    case 'tps':
      obtenertps();
      bot.chat('/tellraw ' + bot.username + ' [{"text":"' + config.prefix + 'entidadescount "},{"selector":"@e"}]');
      break;
    case 'entidades':
      bot.chat('/tellraw ' + bot.username + ' [{"text":"' + config.prefix + 'entidadescount "},{"selector":"@e"}]');
      break;
    case 'uuid':
      obteneruuidynicks(username);
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
      jokes();
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
      bot.chat(`/team modify ${username}${lang.color.subfixteam} prefix {"text":"${lang.afk.prefix}","color":"#aeee00"}`);
      break;
    case 'tradeos':
      const tiempo = bot.time.timeOfDay,
        ticksporsegundo = 20,
        tradeo1 = 2000,
        tradeo2 = 3000,
        tradeo3 = 5000,
        tradeo4 = 6000;
      let faltaminuto = 0,
        faltasegundo;
      if (tiempo < tradeo1) {
        faltasegundo = (tradeo1 - tiempo) / ticksporsegundo;

      } else if (tiempo < tradeo2) {
        faltasegundo = (tradeo2 - tiempo) / ticksporsegundo;

      } else if (tiempo < tradeo3) {
        faltasegundo = (tradeo3 - tiempo) / ticksporsegundo;

      } else if (tiempo < tradeo4) {
        faltasegundo = (tradeo4 - tiempo) / ticksporsegundo;

      } else if (tiempo > tradeo1) {
        bot.chat(lang.nomastradeos);
        return;
      }

      if (faltasegundo > 60) {
        faltaminuto = parseInt(faltasegundo / 60)
        faltasegundo = faltasegundo % 60;
      }

      bot.chat(util.format(lang.tradeos, faltaminuto, parseInt(faltasegundo)));
  }

  const cmd = message.split(' ');
  if (cmd.length === 1) return;

  switch (cmd[0]) {
    case 'server':
      pingsv(cmd[1]);
      break;
    case 'uuid':
      const regexnick = /^(\w+)$/
      if (!regexnick.test(cmd[1])) {
        bot.chat(lang.uuid.alfanumerico);

      } else if (cmd[1].length > 16 || cmd[1].length < 3) {
        bot.chat(lang.uuid.longitud);

      } else obteneruuidynicks(cmd[1]);
      break;
    case 'coords':
      if (cmd.length === 4) {
        const x = parseInt(cmd[2], 10);
        const z = parseInt(cmd[3], 10);
        switch (cmd[1]) {
          case 'overworld':
            bot.chat(util.format(lang.coords.mensaje, 'nether', Math.round(x / 8), Math.round(z / 8)));
            break;
          case 'nether':
            bot.chat(util.format(lang.coords.mensaje, 'overworld', x * 8, z * 8));
            break;
          case 'end':
            bot.chat(lang.coords.end);
            break;
        }
      } else {
        bot.chat(util.format(lang.coords.error, config.prefix));
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
            bot.chat(util.format(lang.color.execute, username, username, 'leave ', username));
            sleep(450);
            bot.chat(util.format(lang.color.execute, username, username, 'add ', username) + lang.color.subfixteam);
            sleep(450);
            bot.chat(util.format(lang.color.execute, username, username, 'join ', username) + lang.color.subfixteam + ' ' + username);
            sleep(450);
            bot.chat('/team modify ' + username + lang.color.subfixteam + ' color ' + cmd[1]);
            bot.chat(lang.color.nuevocolor)
            break;
          default:
            bot.chat(util.format(lang.color.desconocido, config.prefix));
            break;
        }
      } else {
        bot.chat(util.format(lang.color.error, config.prefix))
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
          bot.chat(util.format(lang.conversor.stack, Math.trunc(cantidad / tipo), tipo, cantidad % tipo))
        } else {
          bot.chat(lang.conversor.error + util.format(lang.conversor.sintaxisstack, config.prefix));
        }
      }
      break;
    case 'cantidad':
      // fz!cantidad 64 <cantidad (stacks)> <sobra> -> Son ?? Items
      if (!cmd[3]) cmd[3] = 0;
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
          bot.chat(util.format(lang.conversor.cantidad, (cantidadStacks * tipo) + sobra))
        } else {
          bot.chat(lang.conversor.error + util.format(lang.conversor.sintaxis1, config.prefix));
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
      var longitudcmd = cmd;
      longitudcmd.shift();
      longitudcmd = longitudcmd.join(' ');
      longitudcmd = longitudcmd.length;
      bot.chat(util.format(lang.longitud, longitudcmd));
      break;
    case 'reverse':
      var reverse = cmd;
      reverse.shift();
      reverse = reverse.join(' ').split('').reverse().join('');
      bot.chat(reverse);
      console.log(reverse);
      break;
    case 'base64':
      if (!cmd[2]) return;

      const elegido = cmd[1];
      cmd.shift();
      cmd.shift();
      const texto = cmd.join(' ');

      if (elegido === 'decode') {
        const decode = Buffer.from(texto, 'base64').toString('binary');

        const asciiregex = /^[\x00-\x7FáéíóúýÁÉÍÓÚçÇ·¨´ºª¿¡]*$/;
        if (!asciiregex.test(decode)) {
          bot.chat(lang.illegalcharacter);
          return;
        }

        bot.chat(decode);
        console.log(decode);

      } else if (elegido === 'encode') {
        const encode = Buffer.from(texto, 'binary').toString('base64');

        bot.chat(encode);
        console.log(encode);
      }
      break;
    case 'armorstand':
      if (!cmd[1]) return;
      const cmdarmorstand = '/execute at %s run data merge entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] {%s:1b}',
        funciono = '/execute at %s if entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] run tellraw @a "%s"',
        error = '/execute at %s unless entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] run tellraw @a "%s"';
      switch (cmd[1].toLowerCase()) {
        case 'arms':
          bot.chat(util.format(cmdarmorstand, username, 'ShowArms'));
          bot.chat(util.format(funciono, username, lang.armorstand.funciono));
          bot.chat(util.format(error, username, lang.armorstand.error));
          break;
        case 'base':
          bot.chat(util.format(cmdarmorstand, username, 'NoBasePlate'));
          bot.chat(util.format(funciono, username, lang.armorstand.funciono));
          bot.chat(util.format(error, username, lang.armorstand.error));
          break;
        case 'small':
          bot.chat(util.format(cmdarmorstand, username, 'Small'));
          bot.chat(util.format(funciono, username, lang.armorstand.funciono));
          bot.chat(util.format(error, username, lang.armorstand.error));
          break;
      }
  }
});

bot.on('entidadescount', function (message) {
  const entidades = (message.split(', '));
  let listaentidades = Array.from(new Set(entidades));
  let cantidadentidades = {},
    mayor = 1,
    mayormob,
    i = 0;

  listaentidades.forEach(element => {
    cantidadentidades[element] = 0;
  });

  entidades.forEach(element => {
    cantidadentidades[element]++;
  });

  console.log(cantidadentidades)

  for (x in cantidadentidades) {
    if (cantidadentidades[x] > mayor) {
      mayor = cantidadentidades[x];
      mayormob = listaentidades[i];
    }
    i++;
  };
  bot.chat(util.format(lang.entidadescount, entidades.length, mayormob, mayor));
  console.log(util.format(lang.entidadescount, entidades.length, mayormob, mayor));
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
    }) => nick === username)) bot.chat(`/team modify ${username}${lang.color.subfixteam} prefix ""`)
});

bot.once('login', function () {
  if (config.autologin) bot.chat('/login ' + config.serverpassword);
  setTimeout(() => {
    bot.setControlState('jump', config.saltar);
    bot.setControlState('sneak', config.shift);
  }, 10000);
})


function pingms(username) {
  try {
    //console.log(bot.players);
    Object.keys(bot.players).forEach(element => {
      if (element.toLowerCase() === username.toLowerCase()) {
        let pingms = bot.players[element].ping;
        bot.chat(util.format(lang.ping.ping, element, pingms));
        console.log(util.format(lang.ping.ping, element, pingms));
      };
    })

  } catch (e) {
    bot.chat(lang.ping.error);
  }

}

function pingsv(ip) {
  axios.get('https://api.mcsrvstat.us/2/' + ip)
    .then(serverdatos => {
      console.log(util.format(lang.pingserver.motd, serverdatos.data.motd.clean));
      bot.chat(util.format(lang.pingserver.motd, serverdatos.data.motd.clean));
      console.log(util.format(lang.pingserver.jugadores, serverdatos.data.players.online, serverdatos.data.players.max));
      bot.chat(util.format(lang.pingserver.jugadores, serverdatos.data.players.online, serverdatos.data.players.max));
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
  let tps = bot.getTps(),
    estado;
  if (tps === 20) {
    estado = lang.tps.perfecto
  } else if (tps === 19) {
    estado = lang.tps.casisinlag
  } else if (tps >= 16 && tps <= 18) {
    estado = lang.tps.unpocolag
  } else if (tps >= 14 && tps <= 15) {
    estado = lang.tps.lag
  } else if (tps >= 11 && tps <= 13) {
    estado = lang.tps.lageado
  } else if (tps >= 6 && tps <= 10) {
    estado = lang.tps.muylageado
  } else if (tps >= 2 && tps <= 5) {
    estado = lang.tps.injugable
  } else if (tps >= 0 && tps <= 1) {
    estado = lang.tps.terrible
  }
  bot.chat(util.format(lang.tps.mensaje, tps, estado))
  console.log(util.format(lang.tps.mensaje, tps, estado))
}

function obteneruuidynicks(nick) {
  axios.get('https://api.mojang.com/users/profiles/minecraft/' + nick)
    .then(function (uuid) {
      if (!uuid.data.name) {
        bot.chat(lang.uuid.noespremium);
        return;
      }
      console.log(util.format(lang.uuid.es, uuid.data.name, uuid.data.id));
      bot.chat(util.format(lang.uuid.es, uuid.data.name, uuid.data.id));

      axios.get('https://api.mojang.com/user/profiles/' + uuid.data.id + '/names')
        .then(function (historial) {
          var longinicks = Object.keys(historial.data).length;
          var historialdenicks = '';

          for (var i = 0; i != longinicks; i++) {
            historialdenicks = historialdenicks + historial.data[i].name;
            if (i != (longinicks - 1))
              historialdenicks = historialdenicks + ', ';
          }

          bot.chat(util.format(lang.uuid.nicks, historialdenicks));
          console.log(util.format(lang.uuid.nicks, historialdenicks));
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
require('./fzmm/admin.js')(bot, require(langrequire).admin, config.admin, config.prefix, config.seguir, config.lang);
require('./fzmm/random.js')(bot, require(langrequire).random, config.prefix, config.spamearsplash);
require('./fzmm/estilosdechat.js')(bot, config.prefix);
require('./fzmm/encuestas.js')(bot, require(langrequire).encuestas, config.prefix, config.spamearencuesta)
require('./fzmm/tageos.js')(bot, require(langrequire).tageos, config.prefix, config.tageosmax)
if (config.administrartp) require('./fzmm/tp.js')(bot, require(langrequire).tp, config.prefix, config.admin);
if (config.web) require('./fzmm/web.js')(bot, config.prefix, config.admin, config.webport, config.serverpassword, config.repetir, config.mirar, config.saltar, config.seguir, config.shift);
if (config.discordrichpresence) require('./fzmm/discord.js')(config.discordappid, config.discordtiempo);

delete config.saludar, config.saltar, config.seguir, config.lang, config.spamearsplash, config.spamearencuesta, config.tageosmax, config.webport, config.serverpassword, config.repetir, config.mirar, config.shift, config.discordrichpresence, config.discordappid, config.discordtiempo;

if (config.antiafk) {
  setInterval(() => {
    bot.chat(lang.antiafk)
  }, 180000)
}