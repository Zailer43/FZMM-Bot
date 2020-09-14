module.exports = inject;

function inject(bot, config) {
  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    if (message.startsWith(config.prefix)) {
      switch (message) {
        case (config.prefix + 'calavera'):
          bot.chat('En tu proximo wither tienes ' + Math.floor((Math.random() * 20) + 1) + '% de probabilidades de obtener calavera');
          break;
        case (config.prefix + 'perdoname diosito'):
          perdonado = (Math.floor(Math.random() * 2));
          if (perdonado) bot.chat('teperd0no');
          if (!perdonado) bot.chat('pecador, no eres perdonado');
          break;
        case (config.prefix + 'caraocruz'):
          caraocruz = (Math.floor(Math.random() * 2));
          if (caraocruz) bot.chat('cara');
          if (!caraocruz) bot.chat('cruz');
          break;
      }
    }
  })
}