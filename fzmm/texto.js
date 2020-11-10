module.exports = inject;

const fzmm = require('./../fzmm.js');
const colors = require('colors');
const util = require('util');

function inject(bot, lang, prefix, help) {
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
          bot.chat(util.format(lang.help.help, prefix, prefix));
          break;
        case 'help text':
          bot.chat(lang.help.textinfo)
          fzmm.sleep(150);
          bot.chat(`${prefix}test ${prefix}nuke ${prefix}ak-47 ${prefix}?? ${prefix}shrug ${prefix}tableflip ${prefix}tableflipx2 ${prefix}f <texto> ${prefix}hi ${prefix}wtf ${prefix}wtfgrupal ${prefix}magic ${prefix}calmate ${prefix}patas ${prefix}zzz ${prefix}r1p ${prefix}conteo ${prefix}bruh ${prefix}colores`);
          break;
        case 'help tp':
          bot.chat(lang.help.tpinfo)
          fzmm.sleep(150);
          bot.chat(`${prefix}tp <nick> - ${prefix}pagartp <nick> - ${prefix}deuda <nick>`);
          break;
        case 'itemframe':
          bot.chat(lang.help.itemframeinfo);
          break;
        case 'tag':
          bot.chat(util.format(lang.help.tag, prefix));
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
          bot.chat('/tellraw @a {"text":"' + lang.simbolosmsg + '","clickEvent":{"action":"copy_to_clipboard","value":"' + lang.simbolos + '"}}');
          break;
        case lang.bruh:
          bot.chat(lang.bruh);
          console.log(lang.bruh);
          break;
      }
      const cmd = message.split(' ');

      switch (cmd[0]) {
        case 'f':
          if (cmd.length === 1) return
          if (cmd[1].length > 8) {
            bot.chat(lang.errorf);
          } else efe(cmd[1])
          break;
        case 'help':
          if (cmd[1] === 'page') {
            const pagina = parseInt(cmd[2]);
            if ((pagina) > (help).length || pagina <= 0) {
              bot.chat(util.format(lang.help.noexiste, (help).length));
              return;
            }
            bot.chat('« Help [' + cmd[2] + '/' + (help).length + '] »')
            help[pagina - 1].forEach(element => {
              bot.chat(prefix + element);
              fzmm.sleep(250)
            })
          }
      }
    }
  });

  bot.on('join', function (player) {
    console.log('+ '.green + util.format(lang.entro, player));
  })

  bot.on('leave', function (player) {
    console.log('- ' + util.format(lang.salio, player))
  })

  bot.on('connect', function () {
    console.info((lang.conectado).green);
    //console.log(mcData.blocksByName.tnt)
  });

  bot.on('kicked', (reason) => {
    console.log(util.format(lang.kick, reason).red);
  })

  bot.on('whisper', function (username, message) {
    if (username === bot.username) return;
    console.log(util.format(lang.tell, username, message));
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