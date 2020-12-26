"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = inject;
var mineflayer_1 = __importDefault(require("mineflayer"));
var navigatePlugin = require('mineflayer-navigate')(mineflayer_1.default);
var mineflayer_pathfinder_1 = require("mineflayer-pathfinder");
var mineflayer_pathfinder_2 = require("mineflayer-pathfinder");
var fs_1 = __importDefault(require("fs"));
var main_js_1 = require("./utils/main.js");
var tp_js_1 = require("./cmds/tp.js");
var es_json_1 = require("./lang/es.json");
var config_json_1 = require("./datos/config.json");
function uuid() {
    var uuid = '', i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += '-';
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
function inject(bot) {
    var Item = require('prismarine-item')(bot.version);
    var mcData = require('minecraft-data')(bot.version);
    var target, token, admintemporal = [], spameado = 0, seguirestado = config_json_1.seguir;
    admintemporal.push(config_json_1.botadmin);
    bot.loadPlugin(mineflayer_pathfinder_1.pathfinder);
    bot.on('comando', function (username, message) {
        if (message.toLowerCase() === 'admin') {
            token = uuid();
            console.log(main_js_1.langformat(es_json_1.admin.admin.eltoken, [token]));
            bot.chat(es_json_1.admin.admin.introducetoken);
        }
        else if (message.toLowerCase().startsWith('admin ')) {
            var admincmd = message.split(' ');
            if (!token) {
                bot.chat(main_js_1.langformat(es_json_1.admin.admin.nohaytoken, [config_json_1.prefix]));
            }
            else if (admincmd[1] === token) {
                admintemporal.push(username);
                bot.chat(es_json_1.admin.admin.eresadmin);
                token = null;
            }
            else {
                bot.chat(es_json_1.admin.admin.tokeninvalido);
            }
        }
        if (!admintemporal.includes(username))
            return;
        switch (message.toLowerCase()) {
            case 'tp2':
                bot.chat('/tp ' + username);
                break;
            case 'gmc':
                bot.chat(es_json_1.admin.gamemode + es_json_1.admin.gmc);
                console.log(es_json_1.admin.gamemode + es_json_1.admin.gmc);
                break;
            case 'gms':
                bot.chat(es_json_1.admin.gamemode + es_json_1.admin.gms);
                console.log(es_json_1.admin.gamemode + es_json_1.admin.gms);
                break;
            case 'gmsp':
                bot.chat(es_json_1.admin.gamemode + es_json_1.admin.gmsp);
                console.log(es_json_1.admin.gamemode + es_json_1.admin.gmsp);
                break;
            case 'nukereal':
                bot.chat('/playsound entity.generic.explode master @a ~ ~ ~');
                console.log(es_json_1.admin.nukereal);
                break;
            case 'load pvp':
                require('./pvp.js')(bot, require('./lang/' + config_json_1.langelegido + '.json').pvp, config_json_1.prefix, config_json_1.botadmin);
                bot.chat(es_json_1.admin.plugincargado);
                break;
            case 'load minero':
                require('./minero.js')(bot, require('./lang/' + config_json_1.langelegido + '.json').minero, config_json_1.prefix, config_json_1.botadmin);
                bot.chat(es_json_1.admin.plugincargado);
                break;
        }
        var cmd = message.split(' ');
        if (cmd[0].toLowerCase() === 'setup') {
            var color = '#', prefix_1 = '[Bot]', nick = bot.username;
            for (var i = 0; i != 6; i++)
                color += Math.floor(Math.random() * 16).toString(16);
            if (cmd[1])
                nick = cmd[1];
            if (cmd[2])
                prefix_1 = cmd[2];
            if (cmd[3])
                color = cmd[3];
            bot.chat("/execute if entity @a[name=\"" + nick + "\",team=!" + nick + config_json_1.subfixteams + "] run team leave " + nick);
            bot.chat("/team add " + nick + config_json_1.subfixteams);
            bot.chat("/team join " + nick + config_json_1.subfixteams + " " + nick);
            bot.chat("/team modify " + nick + config_json_1.subfixteams + " prefix {\"text\":\"" + prefix_1 + " \",\"color\":\"" + color + "\"}");
            bot.chat(main_js_1.langformat(es_json_1.admin.setup, [nick, color]));
            console.log(main_js_1.langformat(es_json_1.admin.setup, [nick, color]));
        }
        else if (cmd[0].toLowerCase() === 'restartp') {
            tp_js_1.restartpsecret(bot, username, cmd[1]);
        }
    });
    bot.on('guardarcoord', function (username, x, y, z, lugar) {
        if (username != config_json_1.botadmin)
            return;
        var path = require('path');
        var coordsdirectorio = path.join(__dirname, 'datos/coords.json');
        var json_coords = fs_1.default.readFileSync(coordsdirectorio, 'utf-8');
        var coordenada = JSON.parse(json_coords);
        var xnumber = parseInt(x), ynumber = parseInt(y), znumber = parseInt(z);
        var d = new Date();
        var fecha = d.getHours().toString() + 'hs ' + d.getDate().toString() + '/' + (d.getMonth() + 1).toString() + '/' + d.getFullYear().toString();
        var server = bot.host;
        var newCoord = {
            id: uuid(),
            fecha: fecha,
            server: server,
            lugar: lugar,
            x: xnumber,
            y: ynumber,
            z: znumber
        };
        coordenada.push(newCoord);
        fs_1.default.writeFileSync(coordsdirectorio, JSON.stringify(coordenada, null, 2), 'utf-8');
        bot.chat(es_json_1.admin.guardarcoords);
        console.log(es_json_1.admin.guardarcoords);
    });
    navigatePlugin(bot);
    bot.on('whisper', function (username, message) {
        if (username === bot.username)
            return;
        if (!admintemporal.includes(username))
            return;
        if (message.startsWith(config_json_1.prefix)) {
            message = message.slice(config_json_1.prefix.length);
            switch (message.toLowerCase()) {
                case 'tpa':
                    bot.chat('/tpa ' + username);
                    console.log('/tpa ' + username);
                    break;
                case 'tpaccept':
                    bot.chat('/tpaccept');
                    break;
                case 'ven':
                    target = bot.players[username] ? bot.players[username].entity : null;
                    if (!target)
                        return;
                    bot.navigate.to(target.position);
                    break;
                case 'seguir':
                    target = bot.players[username].entity;
                    seguirestado = !seguirestado;
                    if (seguirestado) {
                        var defaultmove = new mineflayer_pathfinder_1.Movements(bot, mcData);
                        bot.pathfinder.setMovements(defaultmove);
                        bot.pathfinder.setGoal(new mineflayer_pathfinder_2.goals.GoalFollow(target, 2), true);
                    }
                    else if (!seguirestado) {
                        bot.pathfinder.setGoal(null);
                    }
                    break;
                case 'coords':
                    console.log(bot.entity.position.toString());
                    break;
                case 'drop':
                    bot.creative.setInventorySlot(36, new Item(message.slice(5), 64));
                    tossNext();
                    break;
            }
            var cmd = message.split(' ');
            if (cmd.length === 1)
                return;
            switch (cmd[0].toLowerCase()) {
                case 'di':
                    if (username != config_json_1.botadmin)
                        return;
                    cmd.shift();
                    var dicmd = cmd.join(' ');
                    bot.chat(dicmd);
                    console.log('Dije: ' + dicmd);
                    break;
                case 'hat':
                    try {
                        var bloque = mcData.blocksByName[cmd[1]];
                        console.log(bloque);
                        bot.creative.setInventorySlot(5, new Item(bloque.drops[0], 1));
                    }
                    catch (e) {
                        bot.creative.setInventorySlot(5, new Item(cmd[1], 1));
                    }
                    break;
                case 'spam':
                    if (cmd.length <= 3)
                        return; // !spam <cantidad / texto> <delay> <mensaje (admite %s)>
                    var cantidadspam_1 = 0, estexto_1 = false, texto_1 = [];
                    var regexnumero = /^[0-9]{1,3}$/g;
                    if (regexnumero.test(cmd[1]))
                        cantidadspam_1 = parseInt(cmd[1]);
                    else {
                        cantidadspam_1 = cmd[1].length;
                        estexto_1 = true;
                        texto_1 = cmd[1].split('');
                    }
                    var delayspam = parseInt(cmd[2]);
                    cmd.shift();
                    cmd.shift();
                    cmd.shift();
                    var messagespam_1 = cmd.join(' ');
                    spameado = 0;
                    var spam_1 = setInterval(function () {
                        if (estexto_1)
                            bot.chat(messagespam_1.replace(/%s/, texto_1[spameado]));
                        else
                            bot.chat(messagespam_1.replace(/%s/, (spameado + 1).toString()));
                        spameado++;
                        if (spameado >= cantidadspam_1)
                            clearInterval(spam_1);
                    }, delayspam);
                    spam_1;
                    break;
            }
        }
    });
    function tossNext() {
        if (bot.inventory.items().length === 0)
            return;
        var item = bot.inventory.items()[0];
        bot.tossStack(item, tossNext);
    }
}
