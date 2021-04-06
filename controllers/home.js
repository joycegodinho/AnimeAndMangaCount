const models = require('../models');

exports.all = async (req, res) => {
    let allManga = await models.Manga.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

    let allAnime = await models.Anime.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });
}