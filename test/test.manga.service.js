const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models');


chai.use(chaiHttp);

describe('Manga part of the API', function () {
    
    beforeEach(function (done) {
        var newManga = new models.Manga({
            title: 'Naruto',
            number: '500',
            content: 'Melhor Manga'
        });
        newManga.save(function(err){
            if (err) done(err);
            else done();
        });
    });

    afterEach(function(done) {
        //models.Manga.deleteOne({})
        models.Manga.collection.drop()
        .then(function(){})
        .catch(function(){ console.warn('Document may not exists')})
        done()
    });

    it('shold list All Mangas on /mangas GET', function(done){
        chai.request(server)
            .get('/mangas')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('number');
                res.body[0].should.have.property('_id');
                done();
            });
    });

    it('shold return a single Manga on /mangas/<id> GET', function(done){
        chai.request(server)
            .get('/mangas')
            .end(function(err,res){
                
                chai.request(server)
                    .get('/mangas/' + res.body[0]._id)
                    .end(function(err,res){
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('content');
                        res.body.should.have.property('number');
                        res.body.should.have.property('_id');
                        done();
                    });
            });
    });

});