module.exports = inject;
const mineflayer = require('mineflayer');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow } = require('mineflayer-pathfinder').goals
const Item = require("prismarine-item")('1.16.1');
const fs = require("fs");
const fzmm = require('./../fzmm');

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

  function inject(bot, lang, admin, prefix, saltar, seguir) {

  const mcData = require('minecraft-data')(bot.version);

  let saltoestado = saltar;
  let seguirestado = seguir;
  let target;
  bot.loadPlugin(pathfinder);
  bot.on('chat2', function (username, message) {
    if (username != admin) return;
    if (message.startsWith(prefix)) {
      message = message.slice(prefix.length)
      switch (message) {
        case 'tp':
          bot.chat('/tp ' + admin);
          console.log(lang.tepeado + admin);
          break;
        case 'gmc':
          bot.chat( lang.gamemode + lang.gmc);
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
        case 'saltar':
          saltoestado = !saltoestado;
          bot.setControlState('jump', saltoestado);
          console.log(lang.saltar + saltoestado)
          break;
        case 'nukereal':
          bot.chat('/playsound entity.generic.explode master @a ~ ~ ~');
          console.log(lang.nukereal);
      }
    }
  }
  )
  bot.on('guardarcoord', function (username, x, y, z, lugar) {
    if (username != admin) return;
    const path = require('path');
    const coordsdirectorio = path.join(__dirname,'datos/coords.json');
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

  bot.on('whisper', function (username, message, rawMessage) {
    if (username === bot.username) return;
    console.log(username + lang.tell + message);
    if (username != admin) return;
    if (message.startsWith(prefix)) {
      message = message.slice(prefix.length)
      switch (message) {
        case 'tpa':
          bot.chat('/tpa ' + username);
          console.log('/tpa ' + username);
          break;
        case 'tpaccept':
          bot.chat('/tpaccept');
          break;
        case 'ven':
          target = bot.players[admin] ? bot.players[admin].entity : null;
          if (!target) return;
          bot.navigate.to(target.position);
          break;
        case 'seguir':
          target = bot.players[admin].entity;
          seguirestado = !seguirestado
          if (seguirestado) {
            const defaultmove = new Movements(bot, mcData);
            bot.pathfinder.setMovements(defaultmove);
            bot.pathfinder.setGoal(new GoalFollow(target, 2), true);
          } else  if (!seguirestado) {
            bot.pathfinder.setGoal(null)
          }
          break;
        case 'coords':
          console.log(bot.entity.position.toString());
          break;
      }
      function tossNext() {
        if (bot.inventory.items().length === 0) return
        const item = bot.inventory.items()[0]
        bot.tossStack(item, tossNext)
      }
      if (message.startsWith('di ')) {
        bot.chat(message.slice(3));
        console.log('Dije: ' + message.slice(3));

      } else if (message.startsWith('hat ')) {
        bot.creative.setInventorySlot(5, new Item(message.slice(4), 1));
        
      } else if (message.startsWith('drop ')) {
        bot.creative.setInventorySlot(36, new Item(message.slice(5), 64));
        tossNext();
      }
    }
  }
  )
}