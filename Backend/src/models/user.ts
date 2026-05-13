import { sequelize } from '../connections/database';
import {DataTypes} from 'sequelize'


  // const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres')

const User = sequelize.define(
  'Users',
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
    image: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    isSeller: {
      type: DataTypes.BOOLEAN,
       allowNull: true,
    },
      isAdmin: {
      type: DataTypes.BOOLEAN,
       allowNull: true,
    },
    
  },
  {
    timestamps:true, 
    tableName:"users",
    underscored:true,
  },
);

export default User;