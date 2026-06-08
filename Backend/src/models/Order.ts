import { DataTypes } from "sequelize";
import { sequelize } from "../connections/database.js";
import User from "./User.js";
// import Product from "./Product.js";

const Order = sequelize.define(
  "Order",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryCharge: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    paymentMode: {
      type: DataTypes.ENUM("CashOnDelivery", "Esewa"),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
      defaultValue: "pending",
    },
     reference: {
      type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
