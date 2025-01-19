// app/api/products/route.js
import connectToDatabase from "@/lib/connectToDatabase";
import Product from "@/models/Product";

export async function POST(req) {
    await connectToDatabase();  // Connect to MongoDB

    try {
        const body = await req.json();
        const { title, description, price } = body;

        if (!title || !description || !price) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                { status: 400 }
            );
        }

        const newProduct = await Product.create({
            title,
            description,
            price: parseFloat(price),
        });

        return new Response(
            JSON.stringify({ message: "Product created", product: newProduct }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating product:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create product" }),
            { status: 500 }
        );
    }
}
