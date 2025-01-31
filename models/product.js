import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);

export default Product;
