module.exports = inject;

function inject(bot, prefix, admin, webport, password, repetir, mirar, saltar, seguir, shift) {
  let repetirestado = repetir;
  let mirarestado = mirar;
  let saltoestado = saltar;
  let seguirestado = seguir;
  let shiftestado = shift;

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const colors = require('colors');
  var app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  const fs = require("fs");
  const mineflayer = require('mineflayer');
  const encontradodirectorio = path.join(__dirname, 'datos/encontrado.json');
  let logs = [];

  app.set('views', path.join(__dirname, 'view'))
  app.set('view engine', 'hbs')

  app.use(express.static(__dirname + '/public'));

  app.get('/', function (req, res) {
    var data = {};
    data.logs = logs;
    res.render('consola', data)
  });

  app.post('/', (req, res) => {
    console.log('Consola:'.yellow, req.body.texto);
    bot.chat(req.body.texto)
    res.redirect(req.get('referer'));
  });

  app.get('/buscar', function (req, res) {
    const buscarhtml = fs.readFileSync(path.join(__dirname, 'view/buscar.html'), {
      encoding: 'utf8',
      flag: 'r'
    });
    res.send(buscarhtml);
  });

  app.post('/buscar', (req, res) => {
    const mcData = require('minecraft-data')(bot.version);
    const searchBlock = req.body.block;

    if (mcData.blocksByName[searchBlock] === undefined) return;
    const ids = [mcData.blocksByName[searchBlock].id];
    const encontrado = bot.findBlocks({
      matching: ids,
      maxDistance: 256,
      count: 128
    });

    const json_encontrado = JSON.stringify(encontrado, null, 2);
    fs.writeFileSync(encontradodirectorio, json_encontrado, 'utf-8');

    console.log('Revisa encontrado.json, encontré ' + encontrado.length);
    res.redirect(req.get('referer'));
  });

  app.get('/encontrado', function (req, res) {
    const json_encontrado = fs.readFileSync(encontradodirectorio, 'utf-8');
    const encontrado = JSON.parse(json_encontrado);
    var data = {};
    data.encontrado = encontrado;
    res.render('encontrado', data)
  });

  app.get('/coords', (req, res) => {
    const json_coords = fs.readFileSync(path.join(__dirname, 'datos/coords.json'), 'utf-8');
    const coordenadas = JSON.parse(json_coords);
    var data = {};
    data.coords = coordenadas;
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
    target = bot.players[admin].entity;
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
    bot.chat('/login ' + password);
    res.redirect('/');
  });

  app.get('/botones/register', function (req, res) {
    bot.chat('/register ' + password + ' ' + password);
    res.redirect('/');
  });

  app.get('/botones/dropear', function (req, res) {
    tossNext()
    res.redirect('/');
  });

  app.get('/botones/splash', function (req, res) {
    const splash = require('./datos/splash.json');
    bot.chat(splash[parseInt(Math.random() * splash.length)])
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

  bot.on('messagesinjson', function (message) {
    //if (message.includes('Anti-AFK')) return;
    if (message === '[Bot] FraZaMaMe whispers to you: Anti-AFK' ||
      message === 'You whisper to [Bot] FraZaMaMe: Anti-AFK' ||
      message.startsWith(prefix + 'entidadescount')) return;
    logs.push(message);
    if (logs.length > 20) logs.shift();
  })

  bot.on('chat2', function (username, message) {
    if (username === bot.username) return;
    else if (repetirestado == true) bot.chat(message)
  })

  function mirarJugadorCercano() {
    if (mirarestado) {
      const playerFilter = (entity) => entity.type === 'player';
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