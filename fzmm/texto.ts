module.exports = inject;

import { sleep, langformat } from './utils/main.js';
import { emotes, texto } from './lang/es.json';
import { prefix } from './datos/config.json'

function inject(bot: any) {
  bot.on('chat2', function (username: string, message: string) {
    if (username === bot.username) return;
    console.log(username + ': ' + message);
  })

  bot.on('comando', function (username: string, message: string) {
    switch (message.toLowerCase()) {
      case 'test':
        bot.chat(texto.test);
        console.log(texto.test);
        break;
        //startwith help
      case 'help':
        bot.chat(langformat(texto.help.help, [prefix, prefix]));
        break;
      case 'help text':
        bot.chat(texto.help.textinfo)
        sleep(150);
        bot.chat(`${prefix}test ${prefix}nuke ${prefix}ak-47 ${prefix}?? ${prefix}shrug ${prefix}tableflip ${prefix}tableflipx2 ${prefix}f <texto> ${prefix}hi ${prefix}wtf ${prefix}wtfgrupal ${prefix}magic ${prefix}calmate ${prefix}patas ${prefix}zzz ${prefix}r1p ${prefix}conteo ${prefix}bruh ${prefix}colores`);
        break;
      case 'help tp':
        bot.chat(texto.help.tpinfo)
        sleep(150);
        bot.chat(`${prefix}tp <nick> - ${prefix}pagartp <nick> - ${prefix}deuda <nick>`);
        break;
      case 'bot':
        bot.chat(texto.bot)
        break;
      case 'colores':
        bot.chat(texto.colores);
        break;
      case 'nuke':
        bot.chat(emotes.nuke);
        console.log(emotes.nuke);
        break;
      case 'ak-47':
        bot.chat(emotes.ak47);
        console.log(emotes.ak47);
        break;
      case '??':
        bot.chat(emotes.que);
        console.log(emotes.que);
        break;
      case 'shrug':
        bot.chat(emotes.shrug);
        console.log(emotes.shrug);
        break;
      case 'tableflip':
        bot.chat(emotes.tableflip);
        console.log(emotes.tableflip);
        break;
      case 'tableflipx2':
        bot.chat(emotes.tableflipx2);
        console.log(emotes.tableflipx2);
        break;
      case 'hi':
        bot.chat(emotes.hi);
        console.log(emotes.hi);
        break;
      case 'wtf':
        bot.chat(emotes.wtf);
        console.log(emotes.wtf);
        break;
      case 'wtfgrupal':
        bot.chat(emotes.wtfx3);
        console.log(emotes.wtfx3);
        break;
      case 'magic':
        bot.chat(emotes.magic);
        console.log(emotes.magic);
        break;
      case 'calmate':
        bot.chat(emotes.calmate);
        console.log(emotes.calmate);
        break;
      case 'patas':
        bot.chat(emotes.patas);
        break;
      case 'zzz':
        bot.chat(emotes.zzz);
        console.log(emotes.zzz);
        break;
      case 'f':
        efe(texto.defaultf);
        break;
      case 'r1p':
        r1p();
        break;
      case 'conteo':
        bot.chat(texto.conteoinicio);
        sleep(4000);
        bot.chat('3');
        sleep(1000);
        bot.chat('2');
        sleep(1000);
        bot.chat('1');
        sleep(1000)
        bot.chat(texto.conteofinal);
        break;
      case 'simbolos':
        bot.chat('/tellraw @a {"text":"' + texto.simbolosmsg + '","clickEvent":{"action":"copy_to_clipboard","value":"' + texto.simbolos + '"}}');
        break;
      case texto.bruh:
        bot.chat(texto.bruh);
        console.log(texto.bruh);
        break;
    }
    const cmd = message.split(' ');

    if (cmd[0].toLowerCase() === 'f') {
      if (cmd.length === 1) return
      if (cmd[1].length > 8) {
        bot.chat(texto.errorf);
      } else efe(cmd[1])
    }
  });

  bot.on('join', function (player: string) {
    console.log('+ ' + langformat(texto.entro, [player]));
  })

  bot.on('leave', function (player: string) {
    console.log('- ' + langformat(texto.salio, [player]))
  })

  bot.on('connect', function () {
    console.info((texto.conectado));
    //console.log(mcData.blocksByName.tnt)
  });

  bot.on('kicked', (reason: string) => {
    console.log(langformat(texto.kick, [reason]));
  })

  bot.on('whisper', function (username: string, message: string) {
    if (username === bot.username) return;
    console.log(langformat(texto.tell, [username, message]));
  })

  function efe(f: string) {
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
    texto.r1p.forEach((element: string) => {
      bot.chat(element);
      sleep(150);
    })
  }
}
/*
█▄████─█▄████─█▄████
▀▀─▄█▀─▀▀─▄█▀─▀▀─▄█▀
──▄██────▄██────▄██
─▄██▀───▄██▀───▄██▀
─███────███────███
*/