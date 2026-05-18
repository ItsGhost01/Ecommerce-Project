import { sequelize } from '../connections/database';
import {DataTypes} from 'sequelize'

const Category = sequelize.define(
  'Category',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
       allowNull: true,
    },
  },
  {
    timestamps:true, 
    tableName:"Categories",
    underscored:true,
  },
  
);

Category.hasMany(Category, {
    foreignKey: "parentId",
    as: "subCategories"
})


export default Category;