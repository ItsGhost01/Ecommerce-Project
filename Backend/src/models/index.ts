import Cart from "./Cart.js"
import Category from "./Category.js"
import Product from "./Product.js"
import ProductImage from "./ProductImage.js"


Product.hasMany(ProductImage, {
    foreignKey: "productId",
    as: "images"
})

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category"
})

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products"
})