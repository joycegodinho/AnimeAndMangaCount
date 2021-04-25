// modulos externos
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// modulos internos
require('./config/db');
const animeController = require('./controllers/anime');
const mangaController = require('./controllers/manga');
const authController = require('./controllers/auth');
const homeController = require('./controllers/home');
const wishController = require('./controllers/wish');

const port = process.env.PORT || 1234;
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
//controllers

// home
app.get('/', homeController.all); 

// wish
app.get('/wish', wishController.allWish);
app.delete('/wish/:id', wishController.deleteWish);
app.post('/wish/new', wishController.newWish);

// animes
app.get('/animes', animeController.allAnimes);
app.get('/animes/:id',  animeController.singleAnime);
app.delete('/animes/:id', animeController.deleteAnime);
app.put('/anime/edit/:id', animeController.updateAnime);
app.post('/anime/new', animeController.newAnime);

// mangas
app.get('/mangas', mangaController.allMangas);
app.get('/mangas/:id', mangaController.singleManga);
app.delete('/mangas/:id', mangaController.deleteManga);
app.put('/manga/edit/:id', mangaController.updateManga);
app.post('/manga/new', mangaController.newManga);

// auth
app.post('/auth/signup', authController.signUp);
app.post('/auth/signin', authController.signIn);

module.exports = app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
