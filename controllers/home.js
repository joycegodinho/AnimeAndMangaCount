const models = require('../models');

exports.all = async (req, res) => {

    try {
        const allManga = await models.Manga.find({})
        const allAnime = await models.Anime.find({}); 
        const all = allManga.concat(allAnime)
        console.log(all)
        res.status(200).json(all);
    } catch (err) {
        res.status(500).send(err);
    }

}