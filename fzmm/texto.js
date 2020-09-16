module.exports = inject;

const fzmm = require('./../fzmm.js');

function inject(bot, lang, prefix, prefixlongi) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    if (message.toLowerCase().startsWith(prefix)) {
      switch (message.toLowerCase()) {
        case (prefix + 'test'):
          bot.chat(lang.test);
          console.log(lang.test);
          break;
        //startwith help
        case (prefix + 'help'):
          bot.chat(prefix + lang.help.help);
          fzmm.sleep(150);
          bot.chat(lang.help.helpinfo)
          break;
        case (prefix + 'help text'):
          bot.chat(lang.help.textinfo)
          fzmm.sleep(150);
          bot.chat(prefix + 'test - ' + prefix + 'nuke - ' + prefix + 'ak-47 - ' + prefix + '?? - ' + prefix + 'shrug - ' + prefix + 'tableflip - ' + prefix + 'tableflipx2 - ' + prefix + 'f <texto>- ' + prefix + 'hi - ' + prefix + 'wtf - ' + prefix + 'wtfgrupal - ' + prefix + 'magic -  ' + prefix + 'calmate - ' + prefix + 'patas - ' + prefix + 'zzz - ' + prefix + 'r1p - ' + prefix + 'conteo - ' + prefix + 'bruh - '+prefix + 'colores');
          break;
        case (prefix + 'help random'):
          bot.chat(lang.help.aleatorioinfo)
          fzmm.sleep(150);
          bot.chat(prefix + 'calavera - ' + prefix + 'perdoname diosito - ' + prefix + 'caraocruz');
          break;
        case (prefix + 'help survi'):
          bot.chat(lang.help.surviinfo)
          fzmm.sleep(150);
          bot.chat(prefix + 'coords [overworld / nether] <x> <z> - ' + prefix + 'ping - ' + prefix + 'tps - ' + prefix + 'uuid <nick>');
          break;
        case (prefix + 'help tp'):
          bot.chat(lang.help.tpinfo)
          fzmm.sleep(150);
          bot.chat('*' + prefix + 'tp <nick> - *' + prefix + 'pagartp  - ' + prefix + 'deuda');
          break;
        case (prefix + 'help cosmeticos'):
          bot.chat(lang.help.cosmeticosinfo)
          fzmm.sleep(150);
          bot.chat('*' + prefix + 'color <color> - *' + prefix + 'simbolos');
          break;
        case (prefix + 'bot'):
          bot.chat(lang.bot)
          break;
        case (prefix + 'colores'):
          bot.chat(lang.colores);
          break;
        case (prefix + 'nuke'):
          bot.chat(lang.nuke);
          console.log(lang.nuke);
          break;
        case (prefix + 'ak-47'):
          bot.chat(lang.ak47);
          console.log(lang.ak47);
          break;
        case (prefix + '??'):
          bot.chat(lang.que);
          console.log(lang.que);
          break;
        case (prefix + 'shrug'):
          bot.chat(lang.shrug);
          console.log(lang.shrug);
          break;
        case (prefix + 'tableflip'):
          bot.chat(lang.tableflip);
          console.log(lang.tableflip);
          break;
        case (prefix + 'tableflipx2'):
          bot.chat(lang.tableflipx2);
          console.log(lang.tableflipx2);
          break;
        case (prefix + 'hi'):
          bot.chat(lang.hi);
          console.log(lang.hi);
          break;
        case (prefix + 'wtf'):
          bot.chat(lang.wtf);
          console.log(lang.wtf);
          break;
        case (prefix + 'wtfgrupal'):
          bot.chat(lang.wtfx3);
          console.log(lang.wtfx3);
          break;
        case (prefix + 'magic'):
          bot.chat(lang.magic);
          console.log(lang.magic);
          break;
        case (prefix + 'calmate'):
          bot.chat(lang.calmate);
          console.log(lang.calmate);
          break;
        case (prefix + 'patas'):
          bot.chat(lang.patas);
          break;
        case (prefix + 'zzz'):
          bot.chat(lang.zzz);
          console.log(lang.zzz);
          break;
        case (prefix + 'f'):
          efe(lang.defaultf);
          break;
        case (prefix + 'r1p'):
          r1p();
          break;
        case (prefix + 'conteo'):
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
        case (prefix + 'simbolos'):
          bot.chat('/tellraw @a {"text":"Click acá y luego ctrl+v en el chat","clickEvent":{"action":"copy_to_clipboard","value":"'+lang.simbolos+'"}}');
          break;
        case (prefix + lang.bruh):
          bot.chat(lang.bruh);
          console.log(lang.bruh);
          break;
      }
      if (message.startsWith(prefix + 'f '))
      {
        efe(message.slice((prefixlongi + 2)));
      }
    }
  }
  );
  
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