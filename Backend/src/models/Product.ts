import { sequelize } from '../connections/database';
import {DataTypes} from 'sequelize'
import User from './User';


const Product = sequelize.define(
  'Products',
  {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
       allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    Stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
       allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
       references: {
        model: User,
       },
       allowNull: false,
    }
    
  },
  {
    timestamps:true, 
    tableName:"products",
    underscored:true,
  },
);

export default Product;