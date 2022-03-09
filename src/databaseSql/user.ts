import { DataTypes } from 'sequelize';
import {sql} from './config';

const User = sql.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  isActive: {
    type: DataTypes.BOOLEAN
  }
})
export default User
