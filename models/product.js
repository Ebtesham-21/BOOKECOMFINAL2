// models/Product.js
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

// Use `models.Product` if it exists, otherwise create the model
const Product = models.Product || model("Product", ProductSchema);

export default Product;
