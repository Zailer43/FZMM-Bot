import mineflayer from 'mineflayer';
import config from './fzmm/datos/config.json';
import credenciales from './fzmm/datos/credenciales.json';

let nick: string,
    contra: string | undefined,
    puerto: number = 25565;

if (config.premium) {
    nick = credenciales.username;
    contra = credenciales.password;
} else {
    nick = config.botnick;
    contra = undefined;
}

if (config.port) {
    puerto = config.port;
}

const bot = mineflayer.createBot({
    host: process.argv[2],
    port: puerto,
    username: nick,
    password: contra,
    version: config.version,
    chatLengthLimit: config.longitudchat,
    checkTimeoutInterval: (60 * 1000),
    hideErrors: false
});

bot.once('login', function () {
    if (config.autologin) bot.chat('/login ' + config.serverpassword);
    setTimeout(() => {
        bot.setControlState('jump', config.saltar);
        bot.setControlState('sneak', config.shift);
    }, 10000);
})


require('./fzmm/fzmm.js')(bot)
require('./fzmm/texto.js')(bot);
require('./fzmm/admin.js')(bot);
require('./fzmm/estilosdechat.js')(bot);
if (config.web) require('./fzmm/web/web.js')(bot);
if (config.discordrichpresence) require('./fzmm/discord.js')(config.discordappid, config.discordtiempo);
if (config.spamearencuesta) require('./fzmm/cmds/encuestas.js').spamencuestas;