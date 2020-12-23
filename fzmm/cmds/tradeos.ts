import { langformat } from '../utils/main.js'
import { tradeos } from '../lang/es.json';

export function tradeoscmd(bot: any) {
    const tiempo: number = bot.time.timeOfDay,
          ticksporsegundo: number = 20,
          tradeo1: number = 2000,
          tradeo2: number = 3000,
          tradeo3: number = 5000,
          tradeo4: number = 6000;
        let faltaminuto: number = 0,
          faltasegundo: number = 0;
        if (tiempo < tradeo1) {
          faltasegundo = (tradeo1 - tiempo) / ticksporsegundo;

        } else if (tiempo < tradeo2) {
          faltasegundo = (tradeo2 - tiempo) / ticksporsegundo;

        } else if (tiempo < tradeo3) {
          faltasegundo = (tradeo3 - tiempo) / ticksporsegundo;

        } else if (tiempo < tradeo4) {
          faltasegundo = (tradeo4 - tiempo) / ticksporsegundo;

        } else if (tiempo > tradeo1) {
          bot.chat(tradeos.nomastradeos);
          return;
        }

        if (faltasegundo > 60) {
          faltaminuto = Math.round(faltasegundo / 60)
          faltasegundo = faltasegundo % 60;
        }
        faltasegundo = Math.round(faltasegundo);

        bot.chat(langformat(tradeos.msg, [faltaminuto.toString(), faltasegundo.toString()]));
}