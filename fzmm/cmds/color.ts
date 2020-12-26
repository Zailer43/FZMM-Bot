import { langformat} from '../utils/main.js'
import { prefix, subfixteams, botadmin } from '../datos/config.json'
import { color } from '../lang/es.json';

export function colorcmd(bot: any, username: string, colorelegido: string, username2: string | undefined) {
    if (username === botadmin && username2) username = username2

    const colores: Array<string> = ['aqua', 'black', 'blue', 'dark_aqua', 'dark_blue', 'dark_gray', 'dark_green', 'dark_purple', 'dark_red', 'gold', 'gray', 'green', 'light_purple', 'red', 'white', 'yellow'];
    if (colores.includes(colorelegido)) {
        const execute = `/execute if entity @a[name="${username}",team=!${username}${subfixteams}] run team `;
        bot.chat(`${execute} leave ${username}`);
        bot.chat(`${execute} add ${username}${subfixteams}`);
        bot.chat(`${execute} join ${username}${subfixteams} ${username}`);
        bot.chat(`/team modify ${username}${subfixteams} color ${colorelegido}`);

        bot.chat(color.nuevocolor);
    } else if (colorelegido === 'clear') {
        bot.chat(`/team modify ${username}${subfixteams} color reset`);
        bot.chat(color.reseteado);
    } else {
        bot.chat(langformat(color.desconocido, [prefix]));
    }
}