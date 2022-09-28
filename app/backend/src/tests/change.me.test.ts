import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de login', () => {
  let chaiHttpResponse: Response;

  describe('Verifica se o usuário existe', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user',
        });
    });

    it('retorna status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um token', async () => {
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })
  describe('Verifica que não é possível passar um email vazio', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
          password: 'secret_user',
        });
    });

    it('retorna status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('retorna o erro All fields must be filled', async () => {
      expect(chaiHttpResponse.body.message).to.equals('All fields must be filled');
    });
  })
  describe('Verifica que não é possível passar uma senha vazia', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: '',
        });
    });

    it('retorna status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('retorna o erro All fields must be filled', async () => {
      expect(chaiHttpResponse.body.message).to.equals('All fields must be filled');
    });
  })
  describe('Verifica que não é possível passar um email invalido', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'invalid@user.com',
          password: 'secret_user',
        });
    });

    it('retorna status code 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('retorna o erro Incorrect email or password', async () => {
      expect(chaiHttpResponse.body.message).to.equals('Incorrect email or password');
    });
  })
  describe('Verifica que não é possível passar uma senha invalida', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'invalid@user.com',
          password: 'invalidpassword',
        });
    });

    it('retorna status code 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('retorna o erro Incorrect email or password', async () => {
      expect(chaiHttpResponse.body.message).to.equals('Incorrect email or password');
    });
  })
});
