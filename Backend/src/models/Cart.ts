import { sequelize } from '../connections/database';
import {DataTypes} from 'sequelize'
import User from './User';
import Product from './Product';

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
       references: {
                model: User
            },
       allowNull: true, 
    },
    productId: {
      type: DataTypes.INTEGER,
       references: {
                model: Product
            },
       allowNull: true, 
    },
     quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },



  },
  {
    timestamps:true, 
    tableName:"carts",
    underscored:true,
  },
  
);

// Cart.hasMany(Cart, {
//     foreignKey: "parentId",
//     as: "subcarts"
// })


export default Cart;