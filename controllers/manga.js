const models = require('../models');

exports.allMangas = (req, res) => {
    let allManga = models.Manga.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.singleManga = (req, res) => {
    let singleManga = models.Manga.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.deleteManga = (req, res) => {
    let deleteManga = models.Manga.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.status(404).send(err);
        };
        res.status(200).json({ message: 'Deleted' });
    });

};

exports.updateManga = (req, res) => {
    let updateManga = models.Manga.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });

};

exports.newManga = (req, res) => {
    let newManga = new models.Manga (req.body);
    newManga.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(201).json(result);
    });

};