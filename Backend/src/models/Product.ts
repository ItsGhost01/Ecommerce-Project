import { sequelize } from '../connections/database';
import {DataTypes} from 'sequelize'
import User from './User';
import Category from './Category';


const Product = sequelize.define(
  'Products',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: Category
            },
            allowNull: true
        },
    price: {
      type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
       allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
       allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
       references: {
        model: User,
       },
       allowNull: false,
    },
 
    
  },
  {
    timestamps:true, 
    tableName:"products",
    underscored:true,
  },
);


export default Product;