import { Sequelize } from 'sequelize';

export const sql = new Sequelize('dbnode', 'gustavo', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true
})


