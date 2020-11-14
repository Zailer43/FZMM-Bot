module.exports = inject;
const util = require('util');

function inject(bot, lang, prefix, spamearsplash) {
  bot.on('comando', function (username, message) {
    if (username === bot.username) return;
    switch (message) {
      case 'calavera':
        bot.chat(util.format(lang.wither, Math.floor((Math.random() * 20) + 1).toString()));
        break;
      case 'perdoname diosito':
        perdonado = Math.floor(Math.random() * 2).toString();
        if (perdonado) bot.chat(lang.perdonado)
        else if (!perdonado) bot.chat(lang.noperdono);
        break;
      case 'caraocruz':
        caraocruz = Math.floor(Math.random() * 2)
        if (caraocruz <= 0.5) bot.chat(lang.cara)
        else if (caraocruz >= 0.51) bot.chat(lang.cruz);
        break;
    }
  })

  if (spamearsplash) {
    setInterval(() => {
      const splash = require('./datos/splash.json');
      bot.chat(splash[parseInt(Math.random() * splash.length)])
    }, (25 * 1000) * 60)
  }
}