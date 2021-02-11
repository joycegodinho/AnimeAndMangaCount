const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models')

chai.use(chaiHttp);

describe('Manga part of the API', function() {

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

    afterEach(function(done) {
        models.User.deleteOne({})
        .then(function(){})
        .catch(function(){ console.warn('Document may not exists')})
        done()
    })

    it('should logup, login, check token and delete a Manga on /mangas/<id> DELETE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/mangas')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .delete('/mangas/' + res.body[0]._id)
                            .set('Authorization' , token)
                        
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.body.should.have.property('message');
                                res.body.message.should.equal('Deleted');
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token and update a Manga on /mangas/<id> UPDATE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/mangas')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .put('/mangas/' + res.body[0]._id)
                            .set('Authorization' , token)
                            .send({
                                'content': 'Segundo melhor manga',
                                'number': '600',
                                'title': 'One Piece'
                            })
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.should.be.json;
                                res.body.should.be.a('object');
                                res.body.should.have.property('content');
                                res.body.should.have.property('title');
                                res.body.should.have.property('number');
                                res.body.should.have.property('_id');
                                res.body.content.should.equal('Segundo melhor manga');
                                res.body.title.should.equal('One Piece')
                                res.body.number.should.equal('600')
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token and add a Manga on /mangas POST', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/mangas')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .post('/mangas')
                            .set('Authorization' , token)
                            .send({
                                'content': 'Segundo melhor manga',
                                'number': '600',
                                'title': 'One Piece'
                            })
                            .end(function(err,res){
                                res.should.have.status(201);
                                res.should.be.json;
                                res.body.should.be.a('object');
                                res.body.should.have.property('content');
                                res.body.should.have.property('title');
                                res.body.should.have.property('number');
                                res.body.should.have.property('_id');
                                res.body.content.should.equal('Segundo melhor manga');
                                res.body.title.should.equal('One Piece')
                                res.body.number.should.equal('600')
                                done();
                            });
                    });                    
                });
            });
    });

})