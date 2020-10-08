module.exports = inject;

const fzmm = require('./../fzmm.js');
const colors = require('colors');

function inject(bot, lang, prefix, saludar) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    console.log(username + ': ' + message);
    if (message.toLowerCase().startsWith(prefix)) {
      message = message.slice(prefix.length);
      switch (message.toLowerCase()) {
        case 'test':
          bot.chat(lang.test);
          console.log(lang.test);
          break;
        //startwith help
        case 'help':
          bot.chat(prefix + lang.help.help);
          fzmm.sleep(150);
          bot.chat(lang.help.helpinfo)
          break;
        case 'help text':
          bot.chat(lang.help.textinfo)
          fzmm.sleep(150);
          bot.chat(`${prefix}test ${prefix}nuke ${prefix}ak-47${prefix}?? ${prefix}shrug ${prefix}tableflip ${prefix}tableflipx2 ${prefix}f <texto> ${prefix}hi ${prefix}wtf ${prefix}wtfgrupal ${prefix}magic ${prefix}calmate ${prefix}patas ${prefix}zzz ${prefix}r1p ${prefix}conteo ${prefix}bruh ${prefix}colores`);
          break;
        case 'help random':
          bot.chat(lang.help.aleatorioinfo)
          fzmm.sleep(150);
          bot.chat(`${prefix}calavera ${prefix}perdoname diosito -  ${prefix} caraocruz`);
          break;
        case 'help survi':
          bot.chat(lang.help.surviinfo)
          fzmm.sleep(150);
          bot.chat(`${prefix}coords [overworld / nether] <x> <z> -  ${prefix}ping - ${prefix}tps -  ${prefix}uuid <nick>`);
          break;
        case 'help tp':
          bot.chat(lang.help.tpinfo)
          fzmm.sleep(150);
          bot.chat(`*${prefix}tp <nick> - *${prefix}pagartp <nick> - ${prefix}deuda`);
          break;
        case 'help cosmeticos':
          bot.chat(lang.help.cosmeticosinfo)
          fzmm.sleep(150);
          bot.chat(`*${prefix}color <color> - *${prefix}simbolos - *${prefix}itemframe <cantidad> - *${prefix}armorstand [arms / base / small]`);
          break;
        case 'help conversor':
          bot.chat(lang.help.stacksinfo);
          fzmm.sleep(150);
          bot.chat(prefix + 'stack [64 / 16] <cantidad>');
          fzmm.sleep(300);
          bot.chat(lang.help.cantidadinfo);
          fzmm.sleep(150);
          bot.chat(prefix + 'cantidad [64 / 16] <stacks> <sobra>');
          break;
        case 'itemframe':
          bot.chat(lang.help.itemframeinfo);
          break;
        case 'armorstand':
          bot.chat(lang.help.armorstandinfo + prefix + lang.help.armorstandinfo2 + prefix + lang.help.armorstandinfo3 + prefix + lang.help.armorstandinfo4);
          break;
        case 'coords':
          bot.chat(lang.help.coordsinfo);
          break;
        case 'bot':
          bot.chat(lang.bot)
          break;
        case 'colores':
          bot.chat(lang.colores);
          break;
        case 'nuke':
          bot.chat(lang.nuke);
          console.log(lang.nuke);
          break;
        case 'ak-47':
          bot.chat(lang.ak47);
          console.log(lang.ak47);
          break;
        case '??':
          bot.chat(lang.que);
          console.log(lang.que);
          break;
        case 'shrug':
          bot.chat(lang.shrug);
          console.log(lang.shrug);
          break;
        case 'tableflip':
          bot.chat(lang.tableflip);
          console.log(lang.tableflip);
          break;
        case 'tableflipx2':
          bot.chat(lang.tableflipx2);
          console.log(lang.tableflipx2);
          break;
        case 'hi':
          bot.chat(lang.hi);
          console.log(lang.hi);
          break;
        case 'wtf':
          bot.chat(lang.wtf);
          console.log(lang.wtf);
          break;
        case 'wtfgrupal':
          bot.chat(lang.wtfx3);
          console.log(lang.wtfx3);
          break;
        case 'magic':
          bot.chat(lang.magic);
          console.log(lang.magic);
          break;
        case 'calmate':
          bot.chat(lang.calmate);
          console.log(lang.calmate);
          break;
        case 'patas':
          bot.chat(lang.patas);
          break;
        case 'zzz':
          bot.chat(lang.zzz);
          console.log(lang.zzz);
          break;
        case 'f':
          efe(lang.defaultf);
          break;
        case 'r1p':
          r1p();
          break;
        case 'conteo':
          bot.chat(lang.conteoinicio);
          fzmm.sleep(4000);
          bot.chat('3');
          fzmm.sleep(1000);
          bot.chat('2');
          fzmm.sleep(1000);
          bot.chat('1');
          fzmm.sleep(1000)
          bot.chat(lang.conteofinal);
          break;
        case 'simbolos':
          bot.chat('/tellraw @a {"text":"Click acá y luego ctrl+v en el chat","clickEvent":{"action":"copy_to_clipboard","value":"'+lang.simbolos+'"}}');
          break;
        case lang.bruh:
          bot.chat(lang.bruh);
          console.log(lang.bruh);
          break;
      }
      if (message.startsWith('f '))
      {
        const f = message.split(' ');
        if (f[1].length > 8) {
          bot.chat(lang.errorf);
          return;
        }
        efe(f[1]);
      }
    }
  }
  );
  
  bot.on('join', function (player) {
    if (player === bot.username) return;
    if (saludar) {
      bot.chat(lang.hi)
    }
    console.log('+ '.green + player + ' se conectó')
  })
  
  bot.on('leave', function (player) {
    if (player.username === bot.username) return;
    console.log('- ' + player + ' se fue del servidor')
  })

  bot.on('connect', function () {
    console.info((lang.conectado).green);
    //console.log(mcData.blocksByName.tnt)
  });
  
  bot.on('kicked', (reason) => {
    console.log(lang.kick + reason.red)
  })

  function efe(f) {
    bot.chat(f + f + f + f);
    fzmm.sleep(150);
    bot.chat(f);
    fzmm.sleep(150);
    bot.chat(f + f + f);
    fzmm.sleep(150);
    bot.chat(f);
    bot.chat(f);
    console.log('F');
  }

  function r1p() {
    bot.chat(lang.r1p[0]);
    fzmm.sleep(150);
    bot.chat(lang.r1p[1]);
    fzmm.sleep(150);
    bot.chat(lang.r1p[2]);
    fzmm.sleep(150);
    bot.chat(lang.r1p[3]);
    fzmm.sleep(150);
    bot.chat(lang.r1p[4]);
  }
}
/*
█▄████─█▄████─█▄████
▀▀─▄█▀─▀▀─▄█▀─▀▀─▄█▀
──▄██────▄██────▄██
─▄██▀───▄██▀───▄██▀
─███────███────███
*/