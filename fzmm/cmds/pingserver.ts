import { langformat} from '../utils/main.js'
import axios from 'axios';
import { pingserver } from '../lang/es.json';

export function pingservercmd (bot: any, ip: string) {
    axios.get('https://api.mcsrvstat.us/2/' + ip)
      .then(serverdatos => {
        console.log(langformat(pingserver.motd, [serverdatos.data.motd.clean]));
        bot.chat(langformat(pingserver.motd, [serverdatos.data.motd.clean]));
        console.log(langformat(pingserver.jugadores, [serverdatos.data.players.online, serverdatos.data.players.max]));
        bot.chat(langformat(pingserver.jugadores, [serverdatos.data.players.online, serverdatos.data.players.max]));
      })
      .catch(error => {
        bot.chat(pingserver.error)
      });
}