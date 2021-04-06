const models = require('../models');
const mongoose = require('mongoose');

exports.allAnimes = async (req, res) => {
    let allAnimes = await models.Anime.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.singleAnime = async (req, res) => {
    let singleAnime = await models.Anime.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.deleteAnime = async (req, res) => {
    let deleteAnime = await models.Anime.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.status(404).send(err);
        };
        res.status(200).json({ message: 'Deleted' });
    });

};

exports.updateAnime = async (req, res) => {
    let updateAnime = await models.Anime.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });

};

exports.newAnime = async (req, res) => {
    let newAnime = await new models.Anime (req.body);
    await newAnime.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(201).json(result);
    });

};