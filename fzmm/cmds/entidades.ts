import { langformat} from '../utils/main.js'
import { entidadescount } from '../lang/es.json';

export function entidadescmd(bot: any, message: string) {
    const entidades: Array<string> = message.split(', ');
    let listaentidades: Array<string> = Array.from(new Set(entidades));
    let cantidadentidades: { [key: string]: number } = {},
      mayor: number = 1,
      mayormob: string = '',
      i = 0;

    listaentidades.forEach((element: string) => {
      cantidadentidades[element] = 0;
    });

    entidades.forEach(element => {
      cantidadentidades[element]++;
    });

    console.log(cantidadentidades)

    for (var x in cantidadentidades) {
      if (cantidadentidades[x] >= mayor) {
        mayor = cantidadentidades[x];
        mayormob = listaentidades[i];
      }
      i++;
    };
    bot.chat(langformat(entidadescount.msg, [entidades.length.toString(), mayormob, mayor.toString()]));
    console.log(langformat(entidadescount.msg, [entidades.length.toString(), mayormob, mayor.toString()]));
}