"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mineflayer_1 = __importDefault(require("mineflayer"));
var config_json_1 = __importDefault(require("./fzmm/datos/config.json"));
var credenciales_json_1 = __importDefault(require("./fzmm/datos/credenciales.json"));
var nick, contra, puerto = 25565;
if (config_json_1.default.premium) {
    nick = credenciales_json_1.default.username;
    contra = credenciales_json_1.default.password;
}
else {
    nick = config_json_1.default.botnick;
    contra = undefined;
}
if (config_json_1.default.port) {
    puerto = config_json_1.default.port;
}
var bot = mineflayer_1.default.createBot({
    host: process.argv[2],
    port: puerto,
    username: nick,
    password: contra,
    version: config_json_1.default.version,
    chatLengthLimit: config_json_1.default.longitudchat,
    checkTimeoutInterval: (60 * 1000),
    hideErrors: false
});
bot.once('login', function () {
    if (config_json_1.default.autologin)
        bot.chat('/login ' + config_json_1.default.serverpassword);
    setTimeout(function () {
        bot.setControlState('jump', config_json_1.default.saltar);
        bot.setControlState('sneak', config_json_1.default.shift);
    }, 10000);
});
require('./fzmm/fzmm.js')(bot);
require('./fzmm/texto.js')(bot);
require('./fzmm/admin.js')(bot);
require('./fzmm/estilosdechat.js')(bot);
if (config_json_1.default.web)
    require('./fzmm/web/web.js')(bot);
if (config_json_1.default.discordrichpresence)
    require('./fzmm/discord.js')(config_json_1.default.discordappid, config_json_1.default.discordtiempo);
if (config_json_1.default.spamearencuesta)
    require('./fzmm/cmds/encuestas.js').spamencuestas;
