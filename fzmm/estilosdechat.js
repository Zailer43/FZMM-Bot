module.exports = inject;

function inject(bot) {
    try {
      bot.chatAddPattern(/^<(?:.* )?(\w+)+?> (.+)$/, 'chat2', '<* username> message');
      //bot.chatAddPattern(/^(.[^ ]+): (.+)$/, 'chat2', 'username: message');

      bot.chatAddPattern(/^(?:.\s*){0,3}?(\w+)+? joined the game$/, 'join', 'username joined the game');
      bot.chatAddPattern(/^(?:.\s*){0,3}?(\w+)+? left the game$/, 'leave', 'username left the game');

      bot.chatAddPattern(/^\[(.[^ ]+)-> me\] (.+)$/, 'whisper', '[username -> me] message');
      bot.chatAddPattern(/^(.[^ ]+) whispers: (.*)$/, 'whisper', 'username whispers: message');

      //bot.chatAddPattern(/^<(.+)>\ fz!coords\ (.+)\ (.[0-9]*)\ (.[0-9]*)$/, 'coords', '<username> fz!coords dimension x z');
      //bot.chatAddPattern(/^<(.+)>\ fz!ir\ (.[0-9]*)\ (.[0-9]*)\ (.[0-9]*)$/, 'ir', '<username> fz!ir x y z');
      
      bot.chatAddPattern(/^<(.+)> !gcoord (.[0-9]*) (.[0-9]*) (.[0-9]*) (.+)$/, 'guardarcoord', '<username> !gcoord x y z message');
      bot.chatAddPattern(/^!entidadescount (.+)$/, 'entidadescount', '!entidades asd, asd2, asd3, etc');
      
      bot.chatAddPattern(/^(.+)$/, 'messagesinjson', 'message');

      //bot.chatAddPattern(/^\[Usuario\]([^ :]*): (.*)$/, 'chat2', '[Usuario]username: message');
      //bot.chatAddPattern(/^\[Owner\]([^ :]*): (.*)$/, 'chat2', '[Owner]username: message');

      //bot.chatAddPattern(/^(.[^ ]+) » (.+)$/, 'chat2', 'username » message');
    } catch (e) {
      console.log('[bot.error] ' + e);
    }
}