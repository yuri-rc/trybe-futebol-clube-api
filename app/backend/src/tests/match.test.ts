import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDQwNDAwMH0.tbJMbV9bQECqJRGdWbWpM3LKeBFUV6049VZVWYzMgm8'

describe('Rota de teams', () => {
  let chaiHttpResponse: Response;

  describe('Verifica se é possível listar os matches', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');
    });

    it('retorna status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('retorna um array', async () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('retorna um ou mais objetos com as keys: id, homeTeam, homeTeamGoals, awayTeam awayTeamGoals, inProgress, teamHome, teamAway ', async () => {
      expect(chaiHttpResponse.body[0]).to.have.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway',
      );
    });
  })

  describe('Verifica se é possível criar um match', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })
        .set('authorization', token);
    });

    it('retorna status code 201', async () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('retorna um objeto com as keys: id, homeTeam, homeTeamGoals, awayTeam awayTeamGoals, inProgress', async () => {
      expect(chaiHttpResponse.body).to.have.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
      );
    });
  })

  describe('Verifica que não é possível criar um match com um token invalido', () => {

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })
        .set('authorization', 'token_invalido');
    });

    it('retorna status code 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('retorna o erro "Token must be a valid token"', async () => {
      expect(chaiHttpResponse.body.message).to.be.equals('Token must be a valid token');
    });
  })

  describe('Verifica se é possível listar os matches filtrando pelo inProgress = true', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
    });
    it('retorna status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('retorna todos objetos com a key inProgress igual a true', async () => {
      const matches = chaiHttpResponse.body;
      for (let i = 0; i < matches.length; i++) {
        expect(chaiHttpResponse.body[i].inProgress).to.be.equal(true);
      }
    });
  })

  describe('Verifica se é possível listar os matches filtrando pelo inProgress = false', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');
    });
    it('retorna status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('retorna todos objetos com a key inProgress igual a false', async () => {
      const matches = chaiHttpResponse.body;
      for (let i = 0; i < matches.length; i++) {
        expect(chaiHttpResponse.body[i].inProgress).to.be.equal(false);
      }
    });
  })
});
