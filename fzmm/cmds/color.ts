import { langformat} from '../utils/main.js'
import { prefix, subfixteams } from '../datos/config.json'
import { color } from '../lang/es.json';

export function colorcmd(bot: any, username: string, colorelegido: string) {
    if (!colorelegido) {
        bot.chat(langformat(color.error, [prefix]))
        return;
    }
    const colores: Array<string> = ['aqua', 'black', 'blue', 'dark_aqua', 'dark_blue', 'dark_gray', 'dark_green', 'dark_purple', 'dark_red', 'gold', 'gray', 'green', 'light_purple', 'red', 'white', 'yellow'];
    if (colores.includes(colorelegido)) {
        const execute = `/execute if entity @a[name="${username}",team=!${username}${subfixteams}] run team `;
        bot.chat(`${execute} leave ${username}`);
        bot.chat(`${execute} add ${username}${subfixteams}`);
        bot.chat(`${execute} join ${username}${subfixteams} ${username}`);
        bot.chat(`/team modify ${username}${subfixteams} color ${colorelegido}`);

        bot.chat(color.nuevocolor);
    } else {
        bot.chat(langformat(color.desconocido, [prefix]));
    }
}