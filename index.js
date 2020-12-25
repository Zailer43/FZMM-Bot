const mineflayer = require('mineflayer');
const config = require('./fzmm/datos/config.json');

let nick, contra, puerto;

if (config.premium) {
    nick = credenciales.username;
    contra = credenciales.password;
} else {
    nick = config.botnick;
    contra = null;
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
    viewDistance: config.chunkrender,
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



const langrequire = './fzmm/lang/' + config.langelegido + '.json';
require('./fzmm/fzmm.js')(bot, require(langrequire).fzmm, config.prefix, config.antiafk, config.subfixteams, config.spamearsplash)
require('./fzmm/texto.js')(bot, require(langrequire).texto, config.prefix, config.paginasporhelp);
require('./fzmm/admin.js')(bot, require(langrequire).admin, config.admin, config.prefix, config.seguir, config.langelegido, config.subfixteams);
require('./fzmm/estilosdechat.js')(bot, config.prefix);
if (config.web) require('./fzmm/web.js')(bot, config.prefix, config.admin, config.webport, config.serverpassword, config.repetir, config.mirar, config.saltar, config.seguir, config.shift);
if (config.discordrichpresence) require('./fzmm/discord.js')(config.discordappid, config.discordtiempo);
if (config.spamearencuesta) require('./fzmm/cmds/encuestas.js').spamencuestas;