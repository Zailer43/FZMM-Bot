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
    checkTimeoutInterval: (60 * 1000)
});

bot.once('login', function () {
    if (config.autologin) bot.chat('/login ' + config.serverpassword);
    setTimeout(() => {
        bot.setControlState('jump', config.saltar);
        bot.setControlState('sneak', config.shift);
    }, 10000);
})



const langrequire = './fzmm/lang/' + config.lang + '.json';
require('./fzmm/fzmm.js')(bot, require(langrequire).fzmm, config.prefix, config.antiafk, config.subfixteams)
require('./fzmm/texto.js')(bot, require(langrequire).texto, config.prefix, config.paginasporhelp);
require('./fzmm/admin.js')(bot, require(langrequire).admin, config.admin, config.prefix, config.seguir, config.lang, config.subfixteams);
require('./fzmm/random.js')(bot, require(langrequire).random, config.prefix, config.spamearsplash);
require('./fzmm/estilosdechat.js')(bot, config.prefix);
require('./fzmm/encuestas.js')(bot, require(langrequire).encuestas, config.prefix, config.spamearencuesta)
require('./fzmm/tageos.js')(bot, require(langrequire).tageos, config.prefix, config.tageosmax)
if (config.administrartp) require('./fzmm/tp.js')(bot, require(langrequire).tp, config.prefix, config.admin, config.tpmaterial);
if (config.web) require('./fzmm/web.js')(bot, config.prefix, config.admin, config.webport, config.serverpassword, config.repetir, config.mirar, config.saltar, config.seguir, config.shift);
if (config.discordrichpresence) require('./fzmm/discord.js')(config.discordappid, config.discordtiempo);