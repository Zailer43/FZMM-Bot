module.exports = inject;

const fzmm = require('./../fzmm.js');

function inject(bot, prefix, prefixlongi) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    if (message.toLowerCase().startsWith(prefix)) {
      switch (message.toLowerCase()) {
        case (prefix + 'test'):
          bot.chat('01110100 01100101 01110011 01110100');
          console.log('Test');
          break;
        //startwith help
        case (prefix + 'help'):
          bot.chat(prefix + 'help [text / random / survi / tp / cosmeticos]');
          fzmm.sleep(150);
          bot.chat('Si el comando tiene un * significa que requiere /op')
          break;
        case (prefix + 'help text'):
          bot.chat('Estos son comandos que únicamente muestran un texto')
          fzmm.sleep(150);
          bot.chat(prefix + 'test - ' + prefix + 'nuke - ' + prefix + 'ak-47 - ' + prefix + '?? - ' + prefix + 'shrug - ' + prefix + 'tableflip - ' + prefix + 'tableflipx2 - ' + prefix + 'f <texto>- ' + prefix + 'hi - ' + prefix + 'wtf - ' + prefix + 'wtfgrupal - ' + prefix + 'magic -  ' + prefix + 'calmate - ' + prefix + 'patas - ' + prefix + 'zzz - ' + prefix + 'r1p - ' + prefix + 'conteo - ' + prefix + 'bruh - '+prefix + 'colores');
          break;
        case (prefix + 'help random'):
          bot.chat('Aquí todo los comandos son aleatorios')
          fzmm.sleep(150);
          bot.chat(prefix + 'calavera - ' + prefix + 'perdoname diosito - ' + prefix + 'caraocruz');
          break;
        case (prefix + 'help survi'):
          bot.chat('Comandos que quizás puedan ser útiles en un survival o probablemente no')
          fzmm.sleep(150);
          bot.chat(prefix + 'coords [overworld / nether] <x> <z> - ' + prefix + 'ping - ' + prefix + 'tps - ' + prefix + 'uuid <nick>');
          break;
        case (prefix + 'help tp'):
          bot.chat('En "survi" es legal hacerse tp a otro jugador aunque no es "legit", para compensar esto se cobra un stack de cuarzo por tp')
          fzmm.sleep(150);
          bot.chat('*' + prefix + 'tp <nick> - *' + prefix + 'pagartp  - ' + prefix + 'deuda');
          break;
        case (prefix + 'help cosmeticos'):
          bot.chat('Por el momento los únicos comandos que hay requieren que tenga /op')
          fzmm.sleep(150);
          bot.chat('*' + prefix + 'color <color> - *' + prefix + 'simbolos');
          break;
        case (prefix + 'colores'):
          bot.chat('aqua, black, blue, dark_aqua, dark_blue, dark_gray, dark_green, dark_purple, dark_red, gold, gray, green, light_purple, red, white, yellow');
          break;
        case (prefix + 'nuke'):
          bot.chat('Ｂ Ｏ Ｏ Ｏ Ｍ ！ ＼（〇_ｏ）／');
          console.log('BOOOM!');
          break;
        case (prefix + 'ak-47'):
          bot.chat('(ﾒ￣▽￣)︻┳═一');
          console.log('Ak-47');
          break;
        case (prefix + '??'):
          bot.chat('(⊙_⊙)？');
          console.log('??');
          break;
        case (prefix + 'shrug'):
          bot.chat('¯\\_(ツ)_/¯');
          console.log('Shrug');
          break;
        case (prefix + 'tableflip'):
          bot.chat('(╯°□°）╯︵ ┻━┻');
          console.log('Tableflip');
          break;
        case (prefix + 'tableflipx2'):
          bot.chat('┻━┻ ︵ ＼( °□° )／ ︵ ┻━┻');
          console.log('Tableflip doble');
          break;
        case (prefix + 'hi'):
          bot.chat('(^Ｕ^)ノ ~Hi');
          console.log('hi');
          break;
        case (prefix + 'wtf'):
          bot.chat('(⊙﹏⊙)');
          console.log('watafak');
          break;
        case (prefix + 'wtfgrupal'):
          bot.chat('(⊙_(ㆆ_ㆆ)_⊙)');
          console.log('watafak x3');
          break;
        case (prefix + 'magic'):
          bot.chat('(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧');
          console.log('maaaagia :D');
          break;
        case (prefix + 'calmate'):
          bot.chat('┳━┳ ノ( ゜-゜ノ)');
          console.log('calmao');
          break;
        case (prefix + 'patas'):
          bot.chat('( ͡° ͜ʖ ͡°) hmm');
          break;
        case (prefix + 'zzz'):
          bot.chat('(￣o￣) . z Z');
          console.log('zzz');
          break;
        case (prefix + 'f'):
          efe('▉');
          break;
        case (prefix + 'r1p'):
          r1p();
          break;
        case (prefix + 'conteo'):
          bot.chat('Preparados...');
          fzmm.sleep(4000);
          bot.chat('3');
          fzmm.sleep(1000);
          bot.chat('2');
          fzmm.sleep(1000);
          bot.chat('1');
          fzmm.sleep(1000)
          bot.chat('YA');
          break;
        case (prefix + 'simbolos'):
          bot.chat('/tellraw @a {"text":"Click acá y luego ctrl+v en el chat","clickEvent":{"action":"copy_to_clipboard","value":"™ ★ ✪ √ ✜ ❤ ♀ ♂ ⚥ ۩ ∆ ♪ ∞ ⌂ ♯ ✸ ✿ ✮ ❁ ❀ • ☘ ✺ ♫ ♬ ☠ ☢ ☣ ✖ ✔ ✘ ✌ ➤ ⚠ ❂ ✠ ✦ ⓵ ⓶ ⓷ ﴾ ﴿ ◇ 【 】 ☯ 《 》 ☬ ¹ ² ³ 卐 ⚙ ✉ ✂ ✎ ♻ ⟲ ⚔ ⋯ ☰ ✙ ❃『 』"}}');
          break;
        case (prefix + 'bruh'):
          bot.chat('bruh');
          console.log('bruh');
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
    bot.chat('──▄────▄▄▄▄▄▄▄────▄───');
    fzmm.sleep(150);
    bot.chat('─▀▀▄─▄█████████▄─▄▀▀──');
    fzmm.sleep(150);
    bot.chat('─────██─▀███▀─██──────');
    fzmm.sleep(150);
    bot.chat('───▄─▀████▀████▀─▄────');
    fzmm.sleep(150);
    bot.chat('─▀█────██▀█▀██────█▀──');
  }
}
/*
█▄████─█▄████─█▄████
▀▀─▄█▀─▀▀─▄█▀─▀▀─▄█▀
──▄██────▄██────▄██
─▄██▀───▄██▀───▄██▀
─███────███────███
*/