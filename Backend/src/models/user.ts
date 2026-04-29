import { sequelize } from '../connections/database';
import {DataTypes} from 'sequelize'


  // const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres')

const User = sequelize.define(
  'users',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
       allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
       allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
       allowNull: false,
    },
  },
  {
    timestamps:true, 
    tableName:"users",
    underscored:true,
  },
);

export default User;