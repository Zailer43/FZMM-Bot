import { langformat } from '../utils/main.js'
import { ping } from '../lang/es.json';

export function pingcmd(bot: any, username: string) {
    try {
        //console.log(bot.players);
        Object.keys(bot.players).forEach(element => {
          if (element.toLowerCase() === username.toLowerCase()) {
            let pingms = bot.players[element].ping;
            if (pingms === 0) {
              bot.chat(ping.recienconectado);
            } else {
              bot.chat(langformat(ping.msg, [element, pingms]));
              console.log(langformat(ping.msg, [element, pingms]));
            }
            return;
          };
        })
  
      } catch (e) {
        bot.chat(ping.error);
      }
}