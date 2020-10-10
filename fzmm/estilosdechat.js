module.exports = inject;

function inject(bot) {
  function chatAddPattern(bot) {
    try {
      bot.chatAddPattern(/^<(.[^ ]+)> (.+)$/, 'chat2', '<username> message');
      bot.chatAddPattern(/^(.[^ ]+): (.+)$/, 'chat2', 'username: message');
      //bot.chatAddPattern(/^(.[^ ]+)\* (.+)$/, 'chat', 'username* message');
      bot.chatAddPattern(/^(.[^ ]+) joined the game$/, 'join', 'username joined the game');
      bot.chatAddPattern(/^(.[^ ]+) left the game$/, 'leave', 'username left the game');
      bot.chatAddPattern(/^\[(.[^ ]+)-> me\] (.+)$/, 'whisper', '[username -> me] message');
      bot.chatAddPattern(/^(.[^ ]+) whispers: (.*)$/, 'whisper', 'username whispers: message');
      //bot.chatAddPattern(/^<(.+)>\ fz!coords\ (.+)\ (.[0-9]*)\ (.[0-9]*)$/, 'coords', '<username> fz!coords dimension x z');
      //bot.chatAddPattern(/^<(.+)>\ fz!ir\ (.[0-9]*)\ (.[0-9]*)\ (.[0-9]*)$/, 'ir', '<username> fz!ir x y z');
      bot.chatAddPattern(/^<(.+)>\ fz!gcoord\ (.[0-9]*)\ (.[0-9]*)\ (.[0-9]*)\ (.+)$/, 'guardarcoord', '<username> fz!gcoord x y z message');
      //bot.chatAddPattern(/^<(.+)> fz!color (.+)$/, 'color', '<username> fz!color color');
      bot.chatAddPattern(/^fz!entidadescount (.+)$/, 'entidadescount', 'fz!entidades asd, asd2, asd3, etc');
      bot.chatAddPattern(/^(.+)$/, 'messagesinjson', 'message');

      //bot.chatAddPattern(/^\[Usuario\]([^ :]*): (.*)$/, 'chat2', '[Usuario]username: message');
      //bot.chatAddPattern(/^\[Owner\]([^ :]*): (.*)$/, 'chat2', '[Owner]username: message');
    } catch (e) {
      console.log('[bot.error] ' + e);
    }
  }
  chatAddPattern(bot);
}