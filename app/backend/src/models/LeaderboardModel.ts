// import matchModel from '../database/models/match';
// import Team from '../database/models/team';
// import LeaderboardDTO from '../dtos/LeaderboardDTO';
// import MatchDTO from '../dtos/MatchDTO';
// import TeamDTO from '../dtos/TeamDTO';

// const efficiencyCalculator = (
//   leaderboard: LeaderboardDTO,
// ): number => {
//   const efficiency: number = (((leaderboard.totalPoints) / (leaderboard.totalGames * 3)) * 100);
//   return parseFloat(efficiency.toFixed(2));
// };

// export default class LeaderboardModel {
//   private model = matchModel;

//   private static async generateTeamBoard(teams: TeamDTO[]): Promise<LeaderboardDTO[]> {
//     // const teams = await Team.findAll();

//     const leaderboards: LeaderboardDTO[] = teams.map((data) => ({
//       name: data.teamName,
//       totalPoints: 0,
//       totalGames: 0,
//       totalVictories: 0,
//       totalDraws: 0,
//       totalLosses: 0,
//       goalsFavor: 0,
//       goalsOwn: 0,
//       goalsBalance: 0,
//       efficiency: 0,
//     }));
//     return leaderboards;
//   }

//   private static async findTeam(
//     homeAwayTeam: string,
//     teams: TeamDTO[],
//   ): Promise<LeaderboardDTO> {
//     const leaderboards = await LeaderboardModel.generateTeamBoard(teams);
//     return leaderboards.find(({ name }) => homeAwayTeam === name) as LeaderboardDTO;
//   }

//   private static async sorteaderboard(
//     newMap: LeaderboardDTO[],
//   ): Promise<LeaderboardDTO[]> {
//     const t = newMap.sort((a, b) => (
//       b.totalPoints - a.totalPoints
//       || b.totalVictories - a.totalVictories
//       || b.goalsBalance - a.goalsBalance
//       || b.goalsFavor - a.goalsFavor
//       || b.goalsOwn - a.goalsOwn
//     ));
//     return t;
//   }

//   private async findAllMatch(): Promise<MatchDTO[]> {
//     return this.model.findAll({
//       include: [
//         { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
//         { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
//       ],
//       where: { inProgress: false },
//     });
//   }

//   // eslint-disable-next-line max-lines-per-function
//   public async findAll(teams: TeamDTO[]): Promise<LeaderboardDTO[]> {
//     const result = await this.findAllMatch();
//     const map = result.map(async (data) => {
//       const homeTeam = await LeaderboardModel.findTeam(data.teamHome.teamName, teams);
//       if (data.homeTeamGoals > data.awayTeamGoals) {
//         homeTeam.totalPoints += 3;
//         homeTeam.totalVictories += 1;
//       } else if (data.homeTeamGoals === data.awayTeamGoals) {
//         homeTeam.totalPoints += 1;
//         homeTeam.totalDraws += 1;
//       } else { homeTeam.totalLosses += 1; }
//       homeTeam.totalGames += 1;
//       homeTeam.goalsFavor += data.homeTeamGoals;
//       homeTeam.goalsOwn += data.awayTeamGoals;
//       homeTeam.goalsBalance = (homeTeam.goalsFavor - homeTeam.goalsOwn);
//       homeTeam.efficiency = efficiencyCalculator(homeTeam);
//       return homeTeam;
//     });

//     const newMap = (await Promise.all(map));
//     const t = LeaderboardModel.sorteaderboard(newMap);
//     return t;
//   }
// }
