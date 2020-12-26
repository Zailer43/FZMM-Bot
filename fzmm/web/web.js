"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = inject;
var config_json_1 = require("../datos/config.json");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var repetirestado = config_json_1.repetir, mirarestado = config_json_1.mirar, saltoestado = config_json_1.saltar, seguirestado = config_json_1.seguir, shiftestado = config_json_1.shift;
function inject(bot) {
    var app = express_1.default();
    app.use(body_parser_1.default.urlencoded({
        extended: true
    }));
    var fs = require("fs");
    var mineflayer = require('mineflayer');
    var encontradodirectorio = path_1.default.join(__dirname, 'datos/encontrado.json');
    var logs = [];
    app.set('views', path_1.default.join(__dirname, 'view'));
    app.set('view engine', 'hbs');
    app.use(express_1.default.static(__dirname + '/public'));
    app.get('/', function (req, res) {
        var data = { logs: logs };
        res.render('consola', data);
    });
    app.post('/', function (req, res) {
        console.log('Consola:'.yellow, req.body.texto);
        bot.chat(req.body.texto);
        req.get('referer');
    });
    app.get('/coords', function (req, res) {
        var json_coords = fs.readFileSync(path_1.default.join(__dirname, 'datos/coords.json'), 'utf-8');
        var coordenadas = JSON.parse(json_coords);
        var data = { coords: coordenadas };
        res.render('coords', data);
    });
    app.get('/conectar', function (req, res) {
        var conectarhtml = fs.readFileSync(path_1.default.join(__dirname, 'view/conectar.html'), {
            encoding: 'utf8',
            flag: 'r'
        });
        ;
        res.send(conectarhtml);
    });
    app.get('/botones/shift', function (req, res) {
        shiftestado = !shiftestado;
        bot.setControlState('sneak', shiftestado);
        res.redirect('/');
    });
    app.get('/botones/saltar', function (req, res) {
        saltoestado = !saltoestado;
        bot.setControlState('jump', saltoestado);
        res.redirect('/');
    });
    app.get('/botones/repetir', function (req, res) {
        repetirestado = !repetirestado;
        res.redirect('/');
    });
    app.get('/botones/seguir', function (req, res) {
        var _a = require('mineflayer-pathfinder'), pathfinder = _a.pathfinder, Movements = _a.Movements;
        var GoalFollow = require('mineflayer-pathfinder').goals.GoalFollow;
        var mcData = require('minecraft-data')(bot.version);
        var target = bot.players[config_json_1.botadmin].entity;
        seguirestado = !seguirestado;
        if (seguirestado) {
            var defaultmove = new Movements(bot, mcData);
            bot.pathfinder.setMovements(defaultmove);
            bot.pathfinder.setGoal(new GoalFollow(target, 2), true);
        }
        else if (!seguirestado) {
            bot.pathfinder.setGoal(null);
        }
        res.redirect('/');
    });
    app.get('/botones/mirar', function (req, res) {
        mirarestado = !mirarestado;
        res.redirect('/');
    });
    app.get('/botones/login', function (req, res) {
        bot.chat('/login ' + config_json_1.serverpassword);
        res.redirect('/');
    });
    app.get('/botones/register', function (req, res) {
        bot.chat('/register ' + config_json_1.serverpassword + ' ' + config_json_1.serverpassword);
        res.redirect('/');
    });
    app.get('/botones/dropear', function (req, res) {
        tossNext();
        res.redirect('/');
    });
    app.get('/botones/splash', function (req, res) {
        var splash = require('./datos/splash.json');
        bot.chat(splash[Math.round(Math.random() * splash.length)]);
        res.redirect('/');
    });
    var encuestaciclo = 0;
    app.get('/botones/encuesta', function (req, res) {
        var path = require('path');
        var encuestas = require(path.join(__dirname, 'datos/encuestas.json'));
        if (encuestaciclo === encuestas.length)
            encuestaciclo = 0;
        var mensajeencuesta = encuestas[encuestaciclo].texto + ' ' + config_json_1.prefix + 'vote ' + encuestas[encuestaciclo].id + ' [ ';
        mensajeencuesta += (Object.keys(encuestas[encuestaciclo].votos).join(' / ')) + ' ]';
        encuestaciclo++;
        console.log(mensajeencuesta);
        bot.chat(mensajeencuesta);
        res.redirect('/');
    });
    app.listen(config_json_1.webport, function () {
        console.log('Servidor abierto en http://localhost:'.yellow + config_json_1.webport + '/'.yellow);
    });
    bot.on('messagesinjson', function (message) {
        //if (message.includes('Anti-AFK')) return;
        if (message === '[Bot] FraZaMaMe whispers to you: Anti-AFK' ||
            message === 'You whisper to [Bot] FraZaMaMe: Anti-AFK' ||
            message.startsWith(config_json_1.prefix + 'entidadescount'))
            return;
        logs.push(message);
        if (logs.length > 20)
            logs.shift();
    });
    bot.on('chat2', function (username, message) {
        if (username === bot.username)
            return;
        else if (repetirestado === true)
            bot.chat(message);
    });
    function mirarJugadorCercano() {
        if (mirarestado) {
            var playerFilter = function (entity) { return entity.type === 'player'; };
            var playerEntity = bot.nearestEntity(playerFilter);
            if (!playerEntity || bot.pathfinder.isMoving())
                return;
            var pos = playerEntity.position.offset(0, playerEntity.height, 0);
            bot.lookAt(pos);
        }
    }
    function tossNext() {
        if (bot.inventory.items().length === 0)
            return;
        var item = bot.inventory.items()[0];
        bot.tossStack(item, tossNext);
    }
    bot.on('physicTick', mirarJugadorCercano);
}
