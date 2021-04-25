const models = require('../models');
const mongoose = require('mongoose');

exports.allWish = async (req, res) => {
    await models.Wish.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(200).json(result);
    });

};

exports.deleteWish = async (req, res) => {
    await models.Wish.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.status(404).send(err);
        };
        res.status(200).json({ message: 'Deleted' });
    });

};

exports.newWish = async (req, res) => {

    let newWish = await new models.Wish (req.body);
    await newWish.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        };
        res.status(201).json(result);
    });
}