import { base64 } from '../lang/es.json';

export function base64cmd (bot: any, modoelegido: string, message: string) {

    if (modoelegido === 'decode') {
        const decode = Buffer.from(message, 'base64').toString('binary');

        const asciiregex = /^[\x00-\x7FáéíóúýÁÉÍÓÚçÇ·¨´ºª¿¡]*$/;
        if (!asciiregex.test(decode)) {
            bot.chat(base64.illegalcharacter);
            return;
        }

        bot.chat(decode);
        console.log(decode);

    } else if (modoelegido === 'encode') {
        const encode = Buffer.from(message, 'binary').toString('base64');

        bot.chat(encode);
        console.log(encode);
    }
}