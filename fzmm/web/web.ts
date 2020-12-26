module.exports = inject;

import { prefix, botadmin, webport, serverpassword, repetir, mirar, saltar, seguir, shift } from '../datos/config.json'
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import colors from 'colors';

let repetirestado: boolean = repetir,
  mirarestado: boolean = mirar,
  saltoestado: boolean = saltar,
  seguirestado: boolean = seguir,
  shiftestado: boolean = shift;

function inject(bot: any) {

  var app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  const fs = require("fs");
  const mineflayer = require('mineflayer');
  const encontradodirectorio = path.join(__dirname, 'datos/encontrado.json');
  let logs: Array<string> = [];

  app.set('views', path.join(__dirname, 'view'))
  app.set('view engine', 'hbs')

  app.use(express.static(__dirname + '/public'));

  app.get('/', function (req, res) {
    var data: { logs: Array<string> } = { logs: logs };
    res.render('consola', data)
  });

  app.post('/', (req, res) => {
    console.log('Consola:'.yellow, req.body.texto);
    bot.chat(req.body.texto)
    req.get('referer');
  });

  app.get('/coords', (req, res) => {
    const json_coords = fs.readFileSync(path.join(__dirname, 'datos/coords.json'), 'utf-8');
    const coordenadas = JSON.parse(json_coords);
    var data: { coords: coordenadainterface } = { coords: coordenadas };
    res.render('coords', data)
  });

  app.get('/conectar', (req, res) => {
    const conectarhtml = fs.readFileSync(path.join(__dirname, 'view/conectar.html'), {
      encoding: 'utf8',
      flag: 'r'
    });;
    res.send(conectarhtml)
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
    const {
      pathfinder,
      Movements
    } = require('mineflayer-pathfinder');
    const {
      GoalFollow
    } = require('mineflayer-pathfinder').goals;
    const mcData = require('minecraft-data')(bot.version);
    let target = bot.players[botadmin].entity;
    seguirestado = !seguirestado
    if (seguirestado) {
      const defaultmove = new Movements(bot, mcData);
      bot.pathfinder.setMovements(defaultmove);
      bot.pathfinder.setGoal(new GoalFollow(target, 2), true);
    } else if (!seguirestado) {
      bot.pathfinder.setGoal(null)
    }
    res.redirect('/');
  });

  app.get('/botones/mirar', function (req, res) {
    mirarestado = !mirarestado;
    res.redirect('/');
  });

  app.get('/botones/login', function (req, res) {
    bot.chat('/login ' + serverpassword);
    res.redirect('/');
  });

  app.get('/botones/register', function (req, res) {
    bot.chat('/register ' + serverpassword + ' ' + serverpassword);
    res.redirect('/');
  });

  app.get('/botones/dropear', function (req, res) {
    tossNext()
    res.redirect('/');
  });

  app.get('/botones/splash', function (req, res) {
    const splash = require('./datos/splash.json');
    bot.chat(splash[Math.round(Math.random() * splash.length)])
    res.redirect('/');
  });

  let encuestaciclo = 0;
  app.get('/botones/encuesta', function (req, res) { //no me funca el function exportado
    const path = require('path')
    const encuestas = require(path.join(__dirname, 'datos/encuestas.json'));
    if (encuestaciclo === encuestas.length) encuestaciclo = 0;
    let mensajeencuesta = encuestas[encuestaciclo].texto + ' ' + prefix + 'vote ' + encuestas[encuestaciclo].id + ' [ ';
    mensajeencuesta += (Object.keys(encuestas[encuestaciclo].votos).join(' / ')) + ' ]';
    encuestaciclo++;
    console.log(mensajeencuesta)
    bot.chat(mensajeencuesta)
    res.redirect('/');
  });

  app.listen(webport, function () {
    console.log('Servidor abierto en http://localhost:'.yellow + webport + '/'.yellow);
  });

  bot.on('messagesinjson', function (message: string) {
    //if (message.includes('Anti-AFK')) return;
    if (message === '[Bot] FraZaMaMe whispers to you: Anti-AFK' ||
      message === 'You whisper to [Bot] FraZaMaMe: Anti-AFK' ||
      message.startsWith(prefix + 'entidadescount')) return;
    logs.push(message);
    if (logs.length > 20) logs.shift();
  })

  bot.on('chat2', function (username: string, message: string) {
    if (username === bot.username) return;
    else if (repetirestado === true) bot.chat(message)
  })

  function mirarJugadorCercano() {
    if (mirarestado) {
      const playerFilter = (entity: { type: string }) => entity.type === 'player';
      const playerEntity = bot.nearestEntity(playerFilter);

      if (!playerEntity || bot.pathfinder.isMoving()) return;
      const pos = playerEntity.position.offset(0, playerEntity.height, 0);
      bot.lookAt(pos);
    }
  }

  function tossNext() {
    if (bot.inventory.items().length === 0) return
    const item = bot.inventory.items()[0]
    bot.tossStack(item, tossNext)
  }

  bot.on('physicTick', mirarJugadorCercano);
}

interface coordenadainterface {
  id: string;
  fecha: string;
  server: string;
  lugar: string;
  x: number;
  y: number;
  z: number;
}