import { langformat } from '../utils/main.js'
import { tps } from '../lang/es.json';

export function tpscmd(bot: any) {
    let tpscantidad: number = bot.getTps(),
      estado: string = '';
    if (tpscantidad === 20) {
      estado = tps.perfecto
    } else if (tpscantidad === 19) {
      estado = tps.casisinlag
    } else if (tpscantidad >= 16 && tpscantidad <= 18) {
      estado = tps.unpocolag
    } else if (tpscantidad >= 14 && tpscantidad <= 15) {
      estado = tps.lag
    } else if (tpscantidad >= 11 && tpscantidad <= 13) {
      estado = tps.lageado
    } else if (tpscantidad >= 6 && tpscantidad <= 10) {
      estado = tps.muylageado
    } else if (tpscantidad >= 2 && tpscantidad <= 5) {
      estado = tps.injugable
    } else if (tpscantidad >= 0 && tpscantidad <= 1) {
      estado = tps.terrible
    }
    bot.chat(langformat(tps.mensaje, [tpscantidad.toString(), estado]))
    console.log(langformat(tps.mensaje, [tpscantidad.toString(), estado]))
}