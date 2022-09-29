import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de teams', () => {
  let chaiHttpResponse: Response;

  describe('Verifica se é possível listar os times', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');
    });

    it('retorna status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um array', async () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('retorna um ou mais objetos com as keys "id" e "teamName"', async () => {
      expect(chaiHttpResponse.body[0]).to.have.keys('id', 'teamName');
    });
  })

  describe('Verifica se é possível listar um time pelo id', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5');
    });

    it('retorna status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um objeto com as keys "id" e "teamName"', async () => {
      expect(chaiHttpResponse.body).to.have.keys('id', 'teamName');
    });

    it('retorna um id igual a 5', async () => {
      expect(chaiHttpResponse.body.id).to.be.equals(5);
    });

    it('retorna um teamName igual a Cruzeiro', async () => {
      expect(chaiHttpResponse.body.teamName).to.be.equals('Cruzeiro');
    });
  })

});
