const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app'); 
const expect = chai.expect;
const mocha = require('mocha');
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;

chai.use(chaiHttp);

describe('JWT Middleware Tests', () => {
    let validToken;
    let invalidToken = "invalid.token.here";
    let expiredToken;

    before(() => {
        validToken = jwt.sign({ userId: 1 }, '1234567890', { expiresIn: '1h' });

        expiredToken = jwt.sign({ userId: 1 }, '1234567890', { expiresIn: '-1s' });
    });

    it('should allow access with a valid token', async () => {
        const res = await chai.request(app)
            .get('/v0/users') 
            .set('Authorization', `Bearer ${validToken}`);

        expect(res).to.have.status(200);
    });

    it('should deny access with an invalid token', async () => {
        const res = await chai.request(app)
            .get('/v0/users')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.includes('Token invalide');
    });

    it('should deny access with an expired token', async () => {
        const res = await chai.request(app)
            .get('/v0/users')
            .set('Authorization', `Bearer ${expiredToken}`);

        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.includes('jwt expired');
    });

    it('should deny access without a token', async () => {
        const res = await chai.request(app)
            .get('/v0/users');

        expect(res).to.have.status(401);
    });
});
