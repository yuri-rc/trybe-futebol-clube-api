import LeaderboardDTO from '../dtos/LeaderboardDTO';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

type ResponseFindAll = {
  status: number,
  matches: LeaderboardDTO[]
};

export default class LeaderboardService {
  public teamModel: TeamModel;
  public matchModel: MatchModel;

  constructor() {
    this.teamModel = new TeamModel();
    this.matchModel = new MatchModel();
  }

  private async generateTeamBoard(): Promise<LeaderboardDTO[]> {
    const teams = await this.teamModel.findAll();

    const leaderboards: LeaderboardDTO[] = teams.map((data) => ({
      name: data.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return leaderboards;
  }

  private static async findTeam(
    homeAwayTeam: string,
    leaderboards: LeaderboardDTO[],
  ): Promise<LeaderboardDTO> {
    return leaderboards.find(({ name }) => homeAwayTeam === name) as LeaderboardDTO;
  }

  private static efficiencyCalculator = (
    leaderboard: LeaderboardDTO,
  ): number => {
    const efficiency: number = (((leaderboard.totalPoints) / (leaderboard.totalGames * 3)) * 100);
    return parseFloat(efficiency.toFixed(2));
  };

  private async generateBoard(teamboards: LeaderboardDTO[]): Promise<LeaderboardDTO[]> {
    const inProgress = 'false';
    const filteredMatches = await this.matchModel.findAllInProgress(inProgress);
    filteredMatches.forEach(async (data) => {
      const homeTeam = await LeaderboardService.findTeam(data.teamHome.teamName, teamboards);
      if (data.homeTeamGoals > data.awayTeamGoals) {
        homeTeam.totalPoints += 3;
        homeTeam.totalVictories += 1;
      } else if (data.homeTeamGoals === data.awayTeamGoals) {
        homeTeam.totalPoints += 1;
        homeTeam.totalDraws += 1;
      } else { homeTeam.totalLosses += 1; }
      homeTeam.totalGames += 1;
      homeTeam.goalsFavor += data.homeTeamGoals;
      homeTeam.goalsOwn += data.awayTeamGoals;
      homeTeam.goalsBalance = (homeTeam.goalsFavor - homeTeam.goalsOwn);
      homeTeam.efficiency = LeaderboardService.efficiencyCalculator(homeTeam);
    });
    return teamboards;
  }

  public async findAll(): Promise<ResponseFindAll> {
    const teamboards = await this.generateTeamBoard();
    const leaderboards = await this.generateBoard(teamboards);
    leaderboards.sort((team1, team2) => (
      team2.totalPoints - team1.totalPoints
      || team2.totalVictories - team1.totalVictories
      || team2.goalsBalance - team1.goalsBalance
      || team2.goalsFavor - team1.goalsFavor
      || team2.goalsOwn - team1.goalsOwn
    ));
    return { status: 200, matches: leaderboards };
  }
}
