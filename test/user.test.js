const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
//const { User } = require('../models/userModel');
const expect = chai.expect;
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
//const after = mocha.after;

chai.use(chaiHttp);


describe('User Routes', () => {
    let testUser;
    let authToken;

    // Avant tous les tests
    before(async () => {
        try {
            // Login pour obtenir le token
            const loginResponse = await chai
                .request(app)
                .post('/v0/users/login')
                .send({
                    login: "admin",
                    password: "admin123"
                });
            
            authToken = loginResponse.body.token;
        } catch (error) {
            console.error('Error in before hook:', error);
        }
    });

    // // Après tous les tests
    // after(async () => {
    //     // Nettoyer la base de données
    //     await User.destroy({
    //         where: {},
    //         force: true
    //     });
    // });

    // Test de création d'utilisateur
    describe('POST /v0/users/create', () => {
        it('should create a new user', async () => {
            const response = await chai
                .request(app)
                .post('/v0/users/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    login: "test",
                    mdp: "test",
                    role: "test"
                });


            expect(response).to.have.status(201);
            testUser = response.body.user;
        });

        it('should not create a user with invalid credentials', async () => {
            const response = await chai
                .request(app)
                .post('/v0/users/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    login: "test",
                    mdp: "test"
                });

            expect(response).to.have.status(500);
        });
    });

    // Test de connexion
    describe('POST /v0/users/login', () => {
        it('should login with valid credentials', async () => {
            const response = await chai
                .request(app)
                .post('/v0/users/login')
                .send({
                    login: "admin",
                    password: "admin123"
                });

            expect(response).to.have.status(200);
            expect(response.body).to.have.property('token');
        });

        it('should not login with invalid credentials', async () => {
            const response = await chai
                .request(app)
                .post('/v0/users/login')
                .send({
                    login: "admin",
                    password: "wrongpassword"
                });

            expect(response).to.have.status(401);
        });
    });

    // Test de récupération des utilisateurs
    describe('GET /v0/users', () => {
        it('should get all users with valid token', async () => {
            const response = await chai
                .request(app)
                .get('/v0/users/')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
        });

        it('should not get users without token', async () => {
            const response = await chai
                .request(app)
                .get('/v0/users/');

            expect(response).to.have.status(401);
        });
    });

    // Test de mise à jour d'utilisateur
    before('PUT /v0/users/update', () => {
        it('should update user with valid data', async () => {
            const response = await chai
                .request(app)
                .put('/v0/users/update')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    id_utilisateur: testUser.id_utilisateur,
                    login: "teeeeeeeest",
                    mdp: "teeeeeeeeeeest",
                    role: "teeeeeeeeeest"
                });

            expect(response).to.have.status(200);
        });
    });

    // Test de suppression d'utilisateur
    before('DELETE /v0/users/delete/:id', () => {
        it('should delete user with valid id', async () => {
            const response = await chai
                .request(app)
                .delete(`/v0/users/delete/${testUser.id_utilisateur}`)
                .set('token', authToken);

            expect(response).to.have.status(200);
        });

        it('should not delete user with invalid id', async () => {
            const response = await chai
                .request(app)
                .delete('/v0/users/delete/999999')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response).to.have.status(404);
        });
    });

    // Test de récupération d'un utilisateur par ID
    before('GET /v0/users/:id', () => {
        it('should get user by id', async () => {
            const response = await chai
                .request(app)
                .get(`/v0/users/${testUser.id_utilisateur}`)
                .set('Authorization', `Bearer ${authToken}`)

            expect(response).to.have.status(200);
        });
    });
});
