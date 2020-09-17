const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const vec3 = require('vec3');
const colors = require('colors');
const axios = require('axios').default;

const config = require('./fzmm/datos/config.json');
const credenciales = require('C:\\bot\\credenciales.json');
const lang = require('./fzmm/lang/' + config.lang + '.json').fzmm;

const mcData = require('minecraft-data')(config.version);
const {
  on
} = require('process');

const ip = process.argv[2];
// mf.a68agaming.net explosivo116.aternos.me kaboom.pw 64.42.182.186 projectkingdoom.mc.gg
var nick, contra, puerto;
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
var perdonado = false;
bot.on('chat2', function (username, message) {
  if (username === bot.username) return;
  console.log(username + ': ' + message);

  /*if (message.startsWith('@')) {
      if (message.includes(' ')) {
        const tag = split(message, / /g, 1);
        console.log('Tag a ' + tag[0].slice(1));
        bot.chat('/playsound entity.player.levelup master ' + tag[0].slice(1) + ' ~ ~ ~');
      } else {
        console.log('Tag a ' + message.slice(1));
        bot.chat('/playsound entity.player.levelup master ' + message.slice(1) + ' ~ ~ ~');
      }
    }*/
  if (message.toLowerCase().startsWith(config.prefix)) {
    switch (message.toLowerCase()) {
      case (config.prefix + 'ping'):
        pingms(username);
        break;
      case (config.prefix + 'tps'):
        obtenertps();
        break;
      case (config.prefix + 'uuid'):
        obteneruuidynicks(username);
        break;
      case (config.prefix + 'mimir'):
        goToSleep();
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
            bot.chat(lang.color.executeif + username + lang.color.executeteam + username + lang.color.subfixteam + lang.color.executerun + 'join ' + username + lang.color.subfixteam + username);
            sleep(450);
            bot.chat('/team modify ' + username + lang.color.subfixteam + ' color ' + elegircolor[1]);
            bot.chat(lang.color.nuevocolor)
            break;
          default:
            bot.chat(lang.color.desconocido + config.prefix + lang.color.desconocido2);
            break;

        }
      }
    }
  }
});

function pingms(username) {
  let pingms = bot.players[username].ping;
  bot.chat(lang.tuping + pingms + ' ms');
  console.log('El ping de ' + username + ' es ' + pingms);
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
  switch (tps) {
    case 0:
    case 1:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.terrible + lang.tps.subfixestado);
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.injugable + lang.tps.subfixestado);
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.muylageado + lang.tps.subfixestado);
      break;
    case 11:
    case 12:
    case 13:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.lageado + lang.tps.subfixestado);
      break;
    case 14:
    case 15:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.lag + lang.tps.subfixestado);
      break;
    case 16:
    case 17:
    case 18:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.unpocolag + lang.tps.subfixestado);
      break;
    case 19:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.casisinlag + lang.tps.subfixestado);
      break;
    case 20:
      bot.chat(lang.tps.actual + tps + lang.tps.prefixestado + lang.tps.perfecto + lang.tps.subfixestado);
      break;
  }
  console.log(lang.tps.actual + tps)
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

bot.on('connect', function () {
  console.info((lang.conectado).green);
  //console.log(mcData.blocksByName.tnt)
});
//log de kick
bot.on('kicked', (reason) => {
  console.log(lang.kick + reason.red)
})

bot.on('join', function (player) {
  if (player.username === bot.username) return;
  if (config.saludar) {
    bot.chat(lang.hi)
  }
  console.log('+ '.green + player + ' entró al servidor')
})

bot.on('leave', function (player) {
  if (player.username === bot.username) return;
  console.log('- '.red + player + ' se fue del servidor')
})

//sleep
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
const texto = require('./fzmm/texto.js')(bot, require('./fzmm/lang/' + config.lang + '.json').texto, config.prefix, prefixlongi);
const admin = require('./fzmm/admin.js')(bot, prefixlongi, config.admin, config.serverpassword, config.prefix, config.repetir, config.mirar, config.saltar, config.seguir);
const random = require('./fzmm/random.js')(bot, require('./fzmm/lang/' + config.lang + '.json').random, config.prefix);
const estilosdechat = require('./fzmm/estilosdechat.js')(bot);
if (config.administrartp) {
  const tp = require('./fzmm/tp.js')(bot, prefixlongi, config.prefix, config.admin);
}
if (config.web) {
  const web = require('./fzmm/web.js')(bot);
}

setInterval(() => {
  if (config.antiafk) {
    bot.chat(lang.antiafk)
  }
}, 180000)