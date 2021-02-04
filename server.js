// modulos externos
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// modulos internos
require('./config/db');
const animeController = require('./controllers/anime');
const mangaController = require('./controllers/manga');
const authController = require('./controllers/auth');

const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

//controllers
app.get('/animes', animeController.allAnimes);
app.get('/animes/:id',  animeController.singleAnime);
app.delete('/animes/:id', authController.authRequired, animeController.deleteAnime);
app.put('/animes/:id',  authController.authRequired, animeController.updateAnime);
app.post('/animes', authController.authRequired, animeController.newAnime);

app.get('/mangas', mangaController.allMangas);
app.get('/mangas/:id', mangaController.singleManga);
app.delete('/mangas/:id', authController.authRequired, mangaController.deleteManga);
app.put('/mangas/:id', authController.authRequired, mangaController.updateManga);
app.post('/mangas', authController.authRequired, mangaController.newManga);

app.post('/auth/signup', authController.signUp);
app.post('/auth/signin', authController.signIn);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
