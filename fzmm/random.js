module.exports = inject;

function inject(bot, lang, prefix) {
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
          caraocruz = (Math.floor(Math.random() * 2) - 1).toString();
          if (caraocruz) bot.chat(lang.cara)
          else if (!caraocruz) bot.chat(lang.cruz);
          break;
      }
    }
  })
}