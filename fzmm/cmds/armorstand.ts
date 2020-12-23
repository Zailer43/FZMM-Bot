import { langformat } from '../utils/main.js';
import { armorstand } from '../lang/es.json';

export function armorstandcmd(bot: any, username: string, elegido: string) {

    const cmdarmorstand: string = 
    `/execute at ${username} run data merge entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] {%0$:1b}`;
    switch (elegido.toLowerCase()) {
        case 'arms':
            bot.chat(langformat(cmdarmorstand, ['ShowArms']));
            break;
        case 'base':
            bot.chat(langformat(cmdarmorstand, ['NoBasePlate']));
            break;
        case 'small':
            bot.chat(langformat(cmdarmorstand, ['Small']));
            break;
        default:
            return;
    }
    bot.chat(`/execute at ${username} if entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] run tellraw @a "${armorstand.funciono}"`);
    bot.chat(`/execute at ${username} unless entity @e[type=armor_stand,limit=1,sort=nearest,distance=..5] run tellraw @a "${armorstand.error}"`);
}