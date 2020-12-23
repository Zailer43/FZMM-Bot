import axios from 'axios';

export function jokescmd(bot: any) {
    axios.get('https://icanhazdadjoke.com/slack')
    .then(jokesdatos => {
        console.log(jokesdatos.data.attachments[0].text);
        bot.chat(jokesdatos.data.attachments[0].text);
    })
    .catch(error => {
        console.log(error);
    });
}