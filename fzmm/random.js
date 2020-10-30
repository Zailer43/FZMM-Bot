module.exports = inject;

function inject(bot, lang, prefix, spamearsplash) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    if (message.startsWith(prefix)) {
      message = message.slice(prefix.length)
      switch (message) {
        case 'calavera':
          bot.chat(lang.wither + Math.floor((Math.random() * 20) + 1).toString() + lang.wither2);
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
    }
  })

  if (spamearsplash) {
    setInterval(() => {
      const splash = require('./datos/splash.json');
      bot.chat(splash[parseInt(Math.random() * splash.length)])
    }, (25 * 1000) * 60)
  }
}