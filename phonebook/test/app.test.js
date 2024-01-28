const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should();

describe('users', function () {
    it('Should succes reading phonebook with method GET : /api/phonebook', function (done) {
        chai.request(app).get('/api/phonebook').end((err, res) => {
            res.status.should.equal(200)
            res.should.be.json
            res.should.be.a('object')
            res.body.should.have.property('phonebook')
            res.body.phonebook.should.be.a('array');
            res.body.phonebook[0].should.be.a('object');
            res.body.phonebook[0].should.have.property('id')
            res.body.phonebook[0].id.should.equal(51);
            res.body.phonebook[0].should.have.property('name')
            res.body.phonebook[0].name.should.equal('Farhan')
            res.body.phonebook[0].should.have.property('phone')
            res.body.phonebook[0].phone.should.equal('081122134871')
            res.body.phonebook[0].should.have.property('createdAt')
            res.body.phonebook[0].createdAt.should.equal('2024-01-28T07:26:07.516Z')
            res.body.phonebook[0].should.have.property('updatedAt')
            res.body.phonebook[0].updatedAt.should.equal('2024-01-28T07:26:07.516Z')
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
});