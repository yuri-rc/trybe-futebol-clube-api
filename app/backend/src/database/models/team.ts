import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

export default class Team extends Model {
  id!: number;
  teamName!: string;
}
Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});
