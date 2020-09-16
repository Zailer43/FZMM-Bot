module.exports = inject;

function inject(bot, lang, prefix) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    if (message.startsWith(prefix)) {
      switch (message) {
        case (prefix + 'calavera'):
          bot.chat(lang.whiter + Math.floor((Math.random() * 20) + 1) + lang.whiter2);
          break;
        case (prefix + 'perdoname diosito'):
          perdonado = (Math.floor(Math.random() * 2));
          if (perdonado) bot.chat(lang.perdonado)
          else if (!perdonado) bot.chat(lang.noperdono);
          break;
        case (prefix + 'caraocruz'):
          caraocruz = (Math.floor(Math.random() * 2));
          if (caraocruz) bot.chat(lang.cara)
          else if (!caraocruz) bot.chat(lang.cruz);
          break;
      }
    }
  })
}