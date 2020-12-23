module.exports = inject;

const colors = require('colors');
const sleep = require('./utils/main.js').sleep;
const langformat = require('./utils/main.js').langformat;

function inject(bot, lang, prefix) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    console.log(username + ': ' + message);
  })

  bot.on('comando', function (username, message) {
    switch (message.toLowerCase()) {
      case 'test':
        bot.chat(lang.test);
        console.log(lang.test);
        break;
        //startwith help
      case 'help':
        bot.chat(langformat(lang.help.help, [prefix, prefix]));
        break;
      case 'help text':
        bot.chat(lang.help.textinfo)
        sleep(150);
        bot.chat(`${prefix}test ${prefix}nuke ${prefix}ak-47 ${prefix}?? ${prefix}shrug ${prefix}tableflip ${prefix}tableflipx2 ${prefix}f <texto> ${prefix}hi ${prefix}wtf ${prefix}wtfgrupal ${prefix}magic ${prefix}calmate ${prefix}patas ${prefix}zzz ${prefix}r1p ${prefix}conteo ${prefix}bruh ${prefix}colores`);
        break;
      case 'help tp':
        bot.chat(lang.help.tpinfo)
        sleep(150);
        bot.chat(`${prefix}tp <nick> - ${prefix}pagartp <nick> - ${prefix}deuda <nick>`);
        break;
      case 'itemframe':
        bot.chat(lang.help.itemframeinfo);
        break;
      case 'tag':
        bot.chat(langformat(lang.help.tag, [prefix]));
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
        sleep(4000);
        bot.chat('3');
        sleep(1000);
        bot.chat('2');
        sleep(1000);
        bot.chat('1');
        sleep(1000)
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

    if (cmd[0].toLowerCase() === 'f') {
      if (cmd.length === 1) return
      if (cmd[1].length > 8) {
        bot.chat(lang.errorf);
      } else efe(cmd[1])
    }
  });

  bot.on('join', function (player) {
    console.log('+ '.green + langformat(lang.entro, [player]));
  })

  bot.on('leave', function (player) {
    console.log('- ' + langformat(lang.salio, [player]))
  })

  bot.on('connect', function () {
    console.info((lang.conectado).green);
    //console.log(mcData.blocksByName.tnt)
  });

  bot.on('kicked', (reason) => {
    console.log(langformat(lang.kick, [reason]).red);
  })

  bot.on('whisper', function (username, message) {
    if (username === bot.username) return;
    console.log(langformat(lang.tell, [username, message]));
  })

  function efe(f) {
    bot.chat(f + f + f + f);
    sleep(150);
    bot.chat(f);
    sleep(150);
    bot.chat(f + f + f);
    sleep(150);
    bot.chat(f);
    bot.chat(f);
    console.log('F');
  }

  function r1p() {
    bot.chat(lang.r1p[0]);
    sleep(150);
    bot.chat(lang.r1p[1]);
    sleep(150);
    bot.chat(lang.r1p[2]);
    sleep(150);
    bot.chat(lang.r1p[3]);
    sleep(150);
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