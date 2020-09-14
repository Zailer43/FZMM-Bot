
module.exports = inject;

function inject(bot) {
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const colors = require('colors');
  var app = express();
  app.use(bodyParser.urlencoded({ extended: true }));

  const fs = require("fs");
  const mineflayer = require('mineflayer');
  const encontradodirectorio = 'C:\\Users\\minec\\Documents\\GitHub\\FZMM-Bot\\fzmm\\datos\\encontrado.json';

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', function (req, res) {
    const consolahtml = fs.readFileSync('C:\\Users\\minec\\Documents\\GitHub\\FZMM-Bot\\fzmm\\consola.html', { encoding: 'utf8', flag: 'r' });;
    res.send(consolahtml);
  });

  app.post('/', (req, res) => {
    console.log('Consola:'.yellow, req.body.texto);
    bot.chat(req.body.texto)
    res.redirect(req.get('referer'));
  });

  app.get('/buscar', function (req, res) {
    const buscarhtml = fs.readFileSync('C:\\Users\\minec\\Documents\\GitHub\\FZMM-Bot\\fzmm\\buscar.html', { encoding: 'utf8', flag: 'r' });;
    res.send(buscarhtml);
  });

  app.post('/buscar', (req, res) => {
    const mcData = require('minecraft-data')(bot.version);
    const searchBlock = req.body.block;

    if (mcData.blocksByName[searchBlock] === undefined) return;
    const ids = [mcData.blocksByName[searchBlock].id];
    const encontrado = bot.findBlocks({ matching: ids, maxDistance: 256, count: 128 });

    const json_encontrado = JSON.stringify(encontrado, null, 2);
    fs.writeFileSync(encontradodirectorio, json_encontrado, 'utf-8');

    console.log('Revisa encontrado.json, encontré ' + encontrado.length);
    res.redirect(req.get('referer'));
  });

  app.get('/encontrado', function (req, res) {
    const json_encontrado = fs.readFileSync(encontradodirectorio, 'utf-8');
    const encontrado = JSON.parse(json_encontrado);
    res.send(encontrado);
  });

  app.get('/coords', (req, res) => {
    const json_coords = fs.readFileSync('C:\\Users\\minec\\Documents\\GitHub\\FZMM-Bot\\fzmm\\datos\\coords.json', 'utf-8');
    const coordenadas = JSON.parse(json_coords);
    app.locals.coordenadas = coordenadas;
    res.render('coords');
  });


  app.listen(3000, function () {
    console.log('Servidor abierto en http://localhost:3000/'.yellow);
  });
}