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

  // describe.only('Verifica se é possível listar os matches com inProgress = true', () => {

  //   before(async () => {
  //     chaiHttpResponse = await chai
  //       .request(app)
  //       .get('/matches?inProgress=true');
  //   });

  //   it('retorna status code 200', async () => {
  //     expect(chaiHttpResponse).to.have.status(200);
  //   });

  //   it('retorna um objeto com as keys "id" e "teamName"', async () => {
  //     const matches = chaiHttpResponse.body;
  //     const inProgressArray = []
  //     for(let i = 0; i < matches.length; i++) {
  //       inProgressArray.push(matches[i].inProgress);
  //     }
  //     console.log(inProgressArray);
      
      // console.log(matches.map((match) => match.inProgress));
      
      // expect(chaiHttpResponse.body).to.have.keys('id', 'teamName');
    // });

    // it('retorna um id igual a 5', async () => {
    //   expect(chaiHttpResponse.body.id).to.be.equals(5);
    // });

    // it('retorna um teamName igual a Cruzeiro', async () => {
    //   expect(chaiHttpResponse.body.teamName).to.be.equals('Cruzeiro');
    // });
  // })

});
