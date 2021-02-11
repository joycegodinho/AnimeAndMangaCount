const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models');


chai.use(chaiHttp);

describe('Anime part of the API', function () {
    
    beforeEach(function (done) {
        var newAnime = new models.Anime({
            title: 'Naruto',
            number: '500',
            content: 'Melhor Anime'
        });
        newAnime.save(function(err){
            if (err) done(err);
            else done();
        });
    });

    afterEach(function(done) {
        //models.Anime.deleteOne({})
        models.Anime.collection.drop()
        .then(function(){})
        .catch(function(){ console.warn('Document may not exists')})
        done()
    });

    it('shold list All Animes on /animes GET', function(done){
        chai.request(server)
            .get('/animes')
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

    it('shold return a single Anime on /animes/<id> GET', function(done){
        chai.request(server)
            .get('/animes')
            .end(function(err,res){
                
                chai.request(server)
                    .get('/animes/' + res.body[0]._id)
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