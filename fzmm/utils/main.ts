import { usarcommandblock } from '../datos/config.json';
import { Vec3 } from 'vec3';

export function sleep(ms: number) {
  var r: number = Date.now() + ms;
  while (Date.now() < r) { }
}

export function langformat(message: string, arr: Array<string>) {
  arr.forEach((element: string, index: number) => {
    message = message.replace(`%${index}$`, element);
  });
  return message;
}

export function botcmdblock(bot: any, message: string) {

  if (message.length > 255 && usarcommandblock) {
    if (!message.startsWith('/')) message = `/tellraw @a "<[Bot] ${bot.username}> ${message}"`;

    bot.chat('/setblock 0 0 0 command_block destroy');
    sleep(500 + bot.entity.ping * 20);

    try {
      bot.setCommandBlock(new Vec3(0, 0, 0), message, {
        mode: 2,
        trackOutput: true,
        conditional: false,
        alwaysActive: true
      });
    } catch (e) {
      console.log(e);
      bot.chat('Ocurrió un error al escribir el command bock')
    }
  } else {
    bot.chat(message);
  }
}

export function RGBrandom() {
  let color: string = '#';
  for (var i = 0; i != 6; i++) color += Math.floor(Math.random() * 16).toString(16);
  return color;
}