const models = require('../models');
const mongoose = require('mongoose');

exports.allAnimes = (req, res) => {
    let allAnimes = models.Anime.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.singleAnime = (req, res) => {
    let singleAnime = models.Anime.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.deleteAnime = (req, res) => {
    let deleteAnime = models.Anime.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.status(404).send(err);
        };
        res.status(200).json({ message: 'Deleted' });
    });

};

exports.updateAnime = (req, res) => {
    let updateAnime = models.Anime.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });

};

exports.newAnime = (req, res) => {
    let newAnime = new models.Anime (req.body);
    newAnime.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(201).json(result);
    });

};