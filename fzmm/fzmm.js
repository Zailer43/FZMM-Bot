"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = inject;
var mineflayer_1 = __importDefault(require("mineflayer"));
var tpsPlugin = require('mineflayer-tps')(mineflayer_1.default);
var main_js_1 = require("./utils/main.js");
var color_js_1 = require("./cmds/color.js");
var calc_js_1 = require("./cmds/calc.js");
var xp_js_1 = require("./cmds/xp.js");
var tradeos_js_1 = require("./cmds/tradeos.js");
var tps_js_1 = require("./cmds/tps.js");
var base64_js_1 = require("./cmds/base64.js");
var pingserver_js_1 = require("./cmds/pingserver.js");
var pingms_js_1 = require("./cmds/pingms.js");
var jokes_js_1 = require("./cmds/jokes.js");
var uuid_js_1 = require("./cmds/uuid.js");
var entidades_js_1 = require("./cmds/entidades.js");
var armorstand_js_1 = require("./cmds/armorstand.js");
var stack_js_1 = require("./cmds/stack.js");
var cantidad_js_1 = require("./cmds/cantidad.js");
var random_js_1 = require("./cmds/random.js");
var help_js_1 = require("./cmds/help.js");
var tag_js_1 = require("./cmds/tag.js");
var encuestas_js_1 = require("./cmds/encuestas.js");
var tp_js_1 = require("./cmds/tp.js");
var es_json_1 = require("./lang/es.json");
var config_json_1 = require("./datos/config.json");
function inject(bot) {
    bot.loadPlugin(tpsPlugin);
    var afk = [];
    bot.on('chat2', function (username, message) {
        if (username === bot.username)
            return;
        var afkesta = afk.find(function (_a) {
            var nick = _a.nick;
            return nick === username;
        });
        if (afkesta) {
            var segundos = Math.ceil((Date.now() - afkesta.tiempo) / 1000);
            var minutos = Math.ceil(segundos / 60);
            segundos = segundos % 60;
            bot.chat(main_js_1.langformat(es_json_1.fzmm.afk.fin, [afkesta.nick, minutos.toString(), segundos.toString()]));
            bot.chat("/team modify " + username + config_json_1.subfixteams + " prefix \"\"");
        }
        tag_js_1.tageo(bot, username, message);
    });
    bot.on('comando', function (username, message) {
        if (username === bot.username)
            return;
        switch (message.toLowerCase()) {
            case 'ping':
                pingms_js_1.pingcmd(bot, username);
                break;
            case 'tps':
                tps_js_1.tpscmd(bot);
                bot.chat('/tellraw ' + bot.username + ' [{"text":"' + config_json_1.prefix + 'entidadescount "},{"selector":"@e"}]');
                break;
            case 'entidades':
                bot.chat('/tellraw ' + bot.username + ' [{"text":"' + config_json_1.prefix + 'entidadescount "},{"selector":"@e"}]');
                break;
            case 'uuid':
                uuid_js_1.uuidcmd(bot, username);
                break;
            case 'mimir':
                goToSleep();
                break;
            case 'bot ram':
                bot.chat('Tengo un total de ' + (Math.ceil((require('os').freemem() / 1024) / 1024)).toString() + 'MB libres');
                break;
            case 'montar':
                var vehiculo = bot.nearestEntity(function (entity) {
                    return entity.type === 'object';
                });
                if (vehiculo)
                    bot.mount(vehiculo);
                break;
            case 'jokes':
                jokes_js_1.jokescmd(bot);
                break;
            case 'inv':
                console.log(bot.inventory);
                break;
            case 'afk':
                afk.push({
                    nick: username,
                    tiempo: Date.now()
                });
                bot.chat(es_json_1.fzmm.afk.nuevo);
                bot.chat("/team modify " + username + config_json_1.subfixteams + " prefix {\"text\":\"" + es_json_1.fzmm.afk.prefix + "\",\"color\":\"#aeee00\"}");
                break;
            case 'tradeos':
                tradeos_js_1.tradeoscmd(bot);
                break;
            case 'calavera':
                random_js_1.calavera(bot);
                break;
            case 'perdoname':
                random_js_1.perdoname(bot);
                break;
            case 'caraocruz':
                random_js_1.caraocruz(bot);
                break;
            case 'pagartp':
                tp_js_1.pagartpcmd(bot, username, username);
                break;
            case 'deuda':
                tp_js_1.deudacmd(bot, username);
                break;
            case 'tptoggle':
                tp_js_1.tptogglecmd(bot, username, false);
                break;
        }
        var cmd = message.split(' ');
        switch (cmd[0].toLowerCase()) {
            case 'server':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'server');
                else
                    pingserver_js_1.pingservercmd(bot, cmd[1]);
                break;
            case 'uuid':
                if (!cmd[1])
                    return;
                uuid_js_1.uuidcmd(bot, cmd[1]);
                break;
            case 'coords':
                if (!cmd[3])
                    help_js_1.helpcomando(bot, 'coords');
                else {
                    var x = parseInt(cmd[2], 10);
                    var z = parseInt(cmd[3], 10);
                    switch (cmd[1]) {
                        case 'overworld':
                            bot.chat(main_js_1.langformat(es_json_1.fzmm.coords.mensaje, ['nether', Math.round(x / 8).toString(), Math.round(z / 8).toString()]));
                            break;
                        case 'nether':
                            bot.chat(main_js_1.langformat(es_json_1.fzmm.coords.mensaje, ['overworld', (x * 8).toString(), (z * 8).toString()]));
                            break;
                        case 'end':
                            bot.chat(es_json_1.fzmm.coords.end);
                            break;
                    }
                }
                break;
            case 'color':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'color');
                else
                    color_js_1.colorcmd(bot, username, cmd[1], cmd[2]);
                break;
            case 'stack':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'stack');
                else
                    stack_js_1.stackcmd(bot, parseInt(cmd[1]), parseInt(cmd[2]));
                break;
            case 'cantidad':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'cantidad');
                else
                    cantidad_js_1.cantidadcmd(bot, parseInt(cmd[1]), parseInt(cmd[2]), parseInt(cmd[3]));
                break;
            case 'itemframe':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'itemframe');
                else {
                    var cmditemframe = '/execute %0$ entity @a[name="%1$",nbt={SelectedItem:{id:"minecraft:item_frame",Count:%2$b}}] run ';
                    bot.chat(main_js_1.langformat(cmditemframe, ['unless', username, cmd[1]]) + ("tellraw @a \"" + es_json_1.fzmm.itemframe.notienes + "\""));
                    bot.chat(main_js_1.langformat(cmditemframe, ['if', username, cmd[1]]) + ("tellraw @a \"" + es_json_1.fzmm.itemframe.funciono + "\""));
                    bot.chat(main_js_1.langformat(cmditemframe, ['if', username, cmd[1]]) + ("give " + username + " item_frame{display:{Name:'{\"text\":\"" + es_json_1.fzmm.itemframe.nombre + "\",\"color\":\"#36CC57\"}'},EntityTag:{Invisible:1b}} " + cmd[1]));
                    main_js_1.sleep(150);
                    bot.chat(main_js_1.langformat(cmditemframe, ['if', username, cmd[1]]) + ("replaceitem entity " + username + " weapon.mainhand air"));
                }
                break;
            case 'ping':
                if (!cmd[1])
                    return;
                pingms_js_1.pingcmd(bot, cmd[1]);
                break;
            case 'length':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'length');
                else {
                    var longitudcmd = cmd;
                    longitudcmd.shift();
                    var longitudcmdstring = longitudcmd.join(' ');
                    var longitudcmdlength = longitudcmdstring.length;
                    bot.chat(main_js_1.langformat(es_json_1.fzmm.longitud, [longitudcmdlength.toString()]));
                }
                break;
            case 'reverse':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'reverse');
                else {
                    var reverse = cmd;
                    reverse.shift();
                    var reversestring = reverse.join(' ').split('').reverse().join('');
                    bot.chat(reversestring);
                    console.log(reversestring);
                }
                break;
            case 'base64':
                if (!cmd[2])
                    help_js_1.helpcomando(bot, 'base64');
                else {
                    var elegido = cmd[1];
                    cmd.shift();
                    cmd.shift();
                    base64_js_1.base64cmd(bot, elegido, cmd.join(' '));
                }
                break;
            case 'armorstand':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'armorstand');
                else
                    armorstand_js_1.armorstandcmd(bot, username, cmd[1]);
                break;
            case 'calc':
                if (!cmd[3])
                    help_js_1.helpcomando(bot, 'calc');
                else
                    calc_js_1.calccmd(bot, +cmd[1], cmd[2], +cmd[3], cmd[4]);
                break;
            case 'xp':
                if (!cmd[2])
                    help_js_1.helpcomando(bot, 'xp');
                else
                    xp_js_1.xpcmd(bot, +cmd[1], +cmd[2], cmd[3]);
                break;
            case 'help':
                help_js_1.helpcmd(bot, cmd[1], cmd[2]);
                break;
            case 'tag':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'tag');
                else
                    switch (cmd[1].toLowerCase()) {
                        case 'volumen':
                            tag_js_1.volumencmd(bot, username, parseInt(cmd[2]));
                            break;
                        case 'sonido':
                            tag_js_1.sonidocmd(bot, username, cmd[2]);
                    }
                break;
            case 'vote':
                if (!cmd[2])
                    help_js_1.helpcomando(bot, 'vote');
                else
                    encuestas_js_1.votecmd(bot, username, cmd[1], cmd[2]);
                break;
            case 'encuestas':
                encuestas_js_1.encuestascmd(bot, parseInt(cmd[1]));
                break;
            case 'tp':
                if (!cmd[1])
                    help_js_1.helpcomando(bot, 'tp');
                else
                    tp_js_1.tpcmd(bot, username, cmd[1]);
                break;
            case 'pagartp':
                tp_js_1.pagartpcmd(bot, cmd[1], username);
                break;
            case 'deuda':
                tp_js_1.deudacmd(bot, cmd[1]);
                break;
            case 'tptoggle':
                if (cmd[1])
                    tp_js_1.tptogglecmd(bot, username, cmd[1].toLowerCase());
                break;
        }
    });
    bot.on('entidadescount', function (message) {
        entidades_js_1.entidadescmd(bot, message);
    });
    var jugadormovistar, movistardetect = 0;
    bot.on('join', function (username) {
        if (jugadormovistar === username) {
            movistardetect++;
            if (movistardetect === 5) {
                bot.chat(es_json_1.fzmm.movistardetect);
                movistardetect = 0;
            }
            else
                bot.chat(es_json_1.fzmm.hi);
        }
        else {
            jugadormovistar = username;
            movistardetect = 0;
            bot.chat(es_json_1.fzmm.hi);
        }
    });
    bot.on('leave', function (username) {
        if (afk.find(function (_a) {
            var nick = _a.nick;
            return nick === username;
        }))
            bot.chat("/team modify " + username + config_json_1.subfixteams + " prefix \"\"");
    });
    });
    if (config_json_1.antiafk) {
        setInterval(function () {
            bot.chat("/tell " + bot.username + " " + es_json_1.fzmm.antiafk);
        }, 180000);
    }
    if (config_json_1.spamearsplash) {
        setInterval(function () {
            var splash = require('./datos/splash.json');
            bot.chat(splash[Math.floor(Math.random() * splash.length)]);
        }, (25 * 1000) * 60);
    }
    function goToSleep() {
        var bed = bot.findBlock({
            matching: function (block) { return bot.isABed(block); }
        });
        if (bed) {
            bot.sleep(bed, function (err) {
                if (err) {
                    bot.chat(es_json_1.fzmm.mimir.error + err.message);
                }
                else {
                    bot.chat(es_json_1.fzmm.mimir.zzz);
                    console.log(es_json_1.fzmm.mimir.zzz);
                }
            });
        }
        else {
            bot.chat(es_json_1.fzmm.mimir.nocamas);
        }
    }
    /*bot.on('death', () => {
      bot.chat('/tp @r[name=!' + bot.username + ']');
    });*/
}
