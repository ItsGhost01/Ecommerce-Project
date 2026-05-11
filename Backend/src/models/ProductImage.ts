import { DataTypes } from 'sequelize'
import {sequelize} from "../connections/database.js";
import Product from "./Product.js"

const ProductImage = sequelize.define(
    'ProductImage',
    {
        // id: automatic, 
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product
            },
            allowNull: false
        },
    },
    {
        tableName: "product_images",
        timestamps: true,
        underscored: true,
    }
);


export default ProductImage