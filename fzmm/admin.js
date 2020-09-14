module.exports = inject;
const mineflayer = require('mineflayer');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow } = require('mineflayer-pathfinder').goals
const Item = require("prismarine-item")('1.16.1');
const fs = require("fs");
const fzmm = require('./../fzmm');

const coordsdirectorio = 'C:\\fzmm\\datos\\coords.json';
const json_coords = fs.readFileSync(coordsdirectorio, 'utf-8');
let coordenada = JSON.parse(json_coords);

function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

function inject(bot, prefixlongi, admin, prefix, repetir, mirar, saltar, seguir) {

  const mcData = require('minecraft-data')(bot.version);

  var repetirestado = repetir;
  var mirarestado = mirar;
  var saltoestado = saltar;
  var seguirestado = seguir;
  let target;
  bot.loadPlugin(pathfinder);
  bot.on('chat2', function (username, message) {
    if (username != admin) return;
    if (message.startsWith(prefix)) {
      switch (message) {
        case (prefix + 'tp'):
          bot.chat('/tp ' + admin);
          console.log('Tepeado a ' + admin);
          break;
        case (prefix + 'gmc'):
          bot.chat('/gamemode creative');
          console.log('Gamemode creativo');
          break;
        case (prefix + 'gms'):
          bot.chat('/gamemode survival');
          console.log('Gamemode survival');
          break;
        case (prefix + 'gmsp'):
          bot.chat('/gamemode spectator');
          console.log('Gamemode spectator');
          break;
        case (prefix + 'heal'):
          bot.chat('/heal');
          break;
        case (prefix + 'repetir'):
          repetirestado = !repetirestado;
          console.log('Repetir: ' + repetirestado);
          break;
        case (prefix + 'mirar'):
          mirarestado = !mirarestado;
          console.log('Mirar: ' + mirarestado);
          break;
        case (prefix + 'saltar'):
          saltoestado = !saltoestado;
          bot.setControlState('jump', saltoestado);
          console.log('Saltar: ' + saltoestado)
          break;
        case (prefix + 'realnuke'):
          bot.chat('/playsound entity.generic.explode master @a ~ ~ ~');
          console.log('Kaboom real');
      }
    }
  }
  )
  bot.on('guardarcoord', function (username, x, y, z, lugar) {
    if (username != admin) return;
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
    const json_coords = JSON.stringify(coordenada, null, 2);
    fs.writeFileSync(coordsdirectorio, json_coords, 'utf-8');

    bot.chat('Se guardaron correctamente las coords')
    console.log('Se guardaron correctamente las coords');
  })
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    else if (repetirestado == true) bot.chat(message)
  }
  )


  function mirarJugadorCercano() {
    if (mirarestado) {
      const playerFilter = (entity) => entity.type === 'player';
      const playerEntity = bot.nearestEntity(playerFilter);
      if (!playerEntity) return;
      const pos = playerEntity.position.offset(0, playerEntity.height, 0);
      bot.lookAt(pos);
    }
  }

  bot.on('physicTick', mirarJugadorCercano);
  navigatePlugin(bot);

  bot.on('whisper', function (username, message, rawMessage) {
    if (username === bot.username) return;
    console.log(username + ' susurró: ' + message);
    if (username != admin) return;
    if (message.startsWith(prefix)) {
      switch (message) {
        case (prefix + 'login'):
          bot.chat('/login ' + config.serverpassword);
          console.log('Logeado exitosamente');
          break;
        case (prefix + 'register'):
          bot.chat('/register ' + config.serverpassword + config.serverpassword);
          console.log('Registrado exitosamente');
          break;
        case (prefix + 'tpa'):
          bot.chat('/tpa ' + username);
          console.log('/tpa ' + username);
          break;
        case (prefix + 'tpaccept'):
          bot.chat('/tpaccept');
          console.log('Tpa aceptado');
          break;
        case (prefix + 'ven'):
          target = bot.players[admin] ? bot.players[admin].entity : null;
          if (!target) return;
          bot.navigate.to(target.position);
          break;
        case (prefix + 'seguir'):
          target = bot.players[admin].entity;
          seguirestado = !seguirestado
          if (seguirestado) {
            const defaultmove = new Movements(bot, mcData);
            bot.pathfinder.setMovements(defaultmove);
            bot.pathfinder.setGoal(new GoalFollow(target, 2), true);
          } else {
            bot.pathfinder.setGoal(null)
          }
          break;
        case (prefix + 'coords'):
          console.log(bot.entity.position.toString());
          break;
      }
      function tossNext() {
        if (bot.inventory.items().length === 0) return
        const item = bot.inventory.items()[0]
        bot.tossStack(item, tossNext)
      }
      if (message.startsWith(prefix + 'di ')) {
        bot.chat(message.slice((prefixlongi + 3)));
        console.log('Dije: ' + message.slice((prefixlongi + 3)));

      } else if (message.startsWith(prefix + 'hat ')) {
        bot.creative.setInventorySlot(5, new Item(message.slice(prefixlongi + 4), 1));
        
      } else if (message.startsWith(prefix + 'drop ')) {
        bot.creative.setInventorySlot(36, new Item(message.slice(prefixlongi + 5), 64));
        tossNext();
      }
    }
  }
  )
}