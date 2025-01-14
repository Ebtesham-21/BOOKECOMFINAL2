import { schema, model, models } from "moongose/models/user_model";

const ProductSchema = new schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
});

export const Product = models.Product || model('Product', ProductSchema);
