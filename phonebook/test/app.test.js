const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const fs = require('fs')

chai.use(chaiHttp)
chai.should();

describe('users', function () {
    it('Should succes reading phonebook with method GET : /api/phonebook', function (done) {
        chai.request(app)
            .get('/api/phonebook')
            .end((err, res) => {
                res.status.should.equal(200)
                res.should.be.json
                res.should.be.a('object')
                res.body.should.have.property('phonebook')
                res.body.phonebook.should.be.a('array');
                res.body.phonebook[0].should.be.a('object');
                res.body.phonebook[0].should.have.property('id')
                res.body.phonebook[0].id.should.equal(3);
                res.body.phonebook[0].should.have.property('name')
                res.body.phonebook[0].name.should.equal('Suri')
                res.body.phonebook[0].should.have.property('phone')
                res.body.phonebook[0].phone.should.equal('089508385147')
                res.body.phonebook[0].should.have.property('createdAt')
                res.body.phonebook[0].createdAt.should.equal('2024-01-16T07:00:02.662Z')
                res.body.phonebook[0].should.have.property('updatedAt')
                res.body.phonebook[0].updatedAt.should.equal('2024-01-28T23:22:44.904Z')
                res.body.should.have.property('page')
                res.body.page.should.be.a('number')
                res.body.page.should.equal(1)
                res.body.should.have.property('limit')
                res.body.limit.should.be.a('number')
                res.body.limit.should.equal(30)
                res.body.should.have.property('pages')
                res.body.pages.should.be.a('number')
                res.body.pages.should.equal(2)
                res.body.should.have.property('total')
                res.body.total.should.be.a('number')
                res.body.total.should.equal(32)
                done()
            });
    });
    it('Should succes created phonebook with method POST : /api/phonebook', function (done) {
        chai.request(app)
            .post('/api/phonebook')
            .send({ name: 'suri', phone: '081122134871' })
            .end((err, res) => {
                res.status.should.equal(201)
                res.should.be.json
                res.should.be.a('object')
                res.body.should.have.property('id')
                res.body.name.should.equal('suri');
                res.body.should.have.property('phone');
                res.body.phone.should.equal('081122134871');
                res.body.should.have.property('avatar');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done()
            })
    })
    it('Should failed create phonebook with method POST : /api/phonebook', function (done) {
        chai.request(app)
            .post('/api/phonebook')
            .send({ name: "", phone: "" })
            .end(function (err, res) {
                res.status.should.equal(500)
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('Error');
                res.body.Error.should.equal("name and phone can't be empty");
                done()
            });
    });

    it('Should succes update phonebook with method PUT : /api/phonebook/:id', function (done) {
        chai.request(app)
            .get(`/api/phonebook`)
            .end(function (error, response) {
                chai.request(app)
                    .put(`/api/phonebook/${response.body.phonebook[response.body.phonebook.length - 1].id}`)
                    .send({ name: 'surie', phone: '081122134812' })
                    .end(function (err, res) {
                        res.should.have.status(201)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property('id')
                        res.body.should.have.property('name')
                        res.body.name.should.equal('surie')
                        res.body.should.have.property('phone')
                        res.body.phone.should.equal('081122134812')
                        res.body.should.have.property('avatar');
                        res.body.should.have.property('createdAt');
                        res.body.should.have.property('updatedAt');
                        done()
                    })
            })
    })

    it('Should failed update phonebook with method PUT : /api/phonebook/:id', function (done) {
        chai.request(app)
            .get(`/api/phonebook`)
            .end(function (error, response) {
                chai.request(app)
                    .put(`/api/phonebook/${response.body.phonebook[response.body.phonebook.length - 1].id}`)
                    .send({ name: "", phone: "" })
                    .end(function (err, res) {
                        res.status.should.equal(500)
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property('Error');
                        res.body.Error.should.equal("name and phone can't be empty");
                        done()
                    });
            });
    });

    it('Should succes update avatar phonebook with method PUT : /api/phonebook/:id/avatar', function (done) {
        chai.request(app)
            .get(`/api/phonebook`)
            .end(function (error, response) {
                chai.request(app)
                    .put(`/api/phonebook/${response.body.phonebook[response.body.phonebook.length - 1].id}/avatar`)
                    .attach('avatar', fs.readFileSync('./test/suri.png'), 'suri.png')
                    .end(function (err, res) {
                        res.status.should.equal(201)
                        res.should.be.json
                        res.should.be.a('object')
                        res.body.should.have.property('id')
                        res.body.should.have.property('name')
                        res.body.should.have.property('phone')
                        res.body.should.have.property('avatar')
                        res.body.avatar.should.equal(res.body.avatar)
                        res.body.should.have.property('createdAt')
                        res.body.should.have.property('updatedAt')
                        done()
                    })
            })
    })

    it('Should failed updated avatar phonebook with method PUT : /api/phonebook/:id/avatar', function (done) {
        chai.request(app)
            .get('/api/phonebook')
            .end(function (eror, response) {
                chai.request(app)
                    .put(`/api/phonebook/${response.body.phonebook[response.body.phonebook.length - 1].id}/avatar`)
                    .attach('avatar')
                    .end(function (err, res) {
                        res.status.should.equal(400)
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property('error')
                        res.body.error.should.equal('No files were uploaded.')
                        done()
                    })
            })
    })


    it('Should succes deleted phonebook with method DELETE : /api/phonebook/:id', function (done) {
        chai.request(app)
            .get('/api/phonebook')
            .end(function (error, response) {
                chai.request(app)
                    .delete(`/api/phonebook/${response.body.phonebook[response.body.phonebook.length - 1].id}`)
                    .end(function (err, res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('name');
                        res.body.name.should.equal('surie');
                        res.body.should.have.property('phone');
                        res.body.phone.should.equal('081122134812');
                        res.body.should.have.property('avatar');
                        res.body.should.have.property('createdAt');
                        res.body.should.have.property('updatedAt');
                        done()
                    })
            })
    });
    it('Should failed deleted phonebook with method DELETE : /api/phonebook/:id', function (done) {
        chai.request(app)
            .delete('/api/phonebook/70')
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.should.be.a('object');
                done()
            });
    });
});
