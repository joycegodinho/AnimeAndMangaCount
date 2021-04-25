const models = require('../models');

exports.allMangas = async (req, res) => {
    let allManga = await models.Manga.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.singleManga = async (req, res) => {
    let singleManga = await models.Manga.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.deleteManga = async (req, res) => {
    let deleteManga = await models.Manga.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.status(404).send(err);
        };
        res.status(200).json({ message: 'Deleted' });
    });

};

exports.updateManga = async (req, res) => {
    let updateManga = await models.Manga.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });

};

exports.newManga = async (req, res) => {
    
    let newManga = await new models.Manga (req.body);
    await newManga.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(201).json(result);
    });

};