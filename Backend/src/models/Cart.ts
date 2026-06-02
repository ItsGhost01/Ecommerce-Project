import { DataTypes } from 'sequelize'
import {sequelize} from "../connections/database.js";
import User from './User.js';
import Product from './Product.js';

const Cart = sequelize.define(
    'Cart',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id"
            }
        }

    },
    {
        tableName: "carts",
        timestamps: true,
        underscored: true,
    }
);

export default Cart