import connectToDatabase from "@/lib/connectToDatabase";
import Product from "@/models/Product";

export async function GET(req, {params}) {
    await connectToDatabase();

    const id = params?.id;
    if(id) {
        try {
            const product = await Product.findById(id);
            if(!product) {
                return new Response(JSON.stringify({error:"Product not found"}), {status: 404});
            }
            return new Response(JSON.stringify(product), {status: 200});
        } catch (error) {
            console.error("Error fetching product:", error);
            return new Response(
                JSON.stringify({error: "Failed to fetch product"}),
                {status: 500}
            );
        }
    } else {
        try {
            const products = await Product.find();
            return new Response(JSON.stringify({products}), {status: 200});
        } catch (error) {
            console.error("Error fetching products:", error);
            return new Response(
                JSON.stringify({error: "Failed to fetch products:", error}),
                {status: 500}
            );
        }
    }
}

export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const {title, description, price} = body;

        if(!title || !description || !price) {
            return new Response(
                JSON.stringify({error: "All fields are required"}),
                {status: 400}
            );
        }

        const newProduct = await Product.create({
            title,
            description,
            price: parseFloat(price),
        });

        return new Response (
            JSON.stringify({message: "Product created", product: newProduct}),
            {status: 201}
        );
    } catch (error) {
        console.error("Error creating product:", error);
        return new Response(
            JSON.stringify({error: "Falied to create product"}),
            {status: 500}

        );
    }
}

export async function PUT(req, {params}) {
    await connectToDatabase();

    const id = params?.id;
    if(!id) {
        return new Response(JSON.stringify({error: "Product ID is required"}), {status: 400});
    }

    try {
        const body = await req.json();
        const {title, description, price} = body;
        if(!title || !description || !price) {
            return new Response(
                JSON.stringify({error: "All fields are required"}),
                {status: 400}
            );
        }

        const updateProduct = await Product.findByIdAndUpdate(
            id, 
            {
                title,
                description,
                price: parseFloat(price),
            },
            {new: true}
        );
        if(!updateProduct) {
            return new Response(JSON.stringify({error: "Product not found"}), {status: 404});
        }
        return new Response(JSON.stringify({message: "Product updated", product: updatedProduct}), {status: 200});
    } catch (error) {
        console.error("Error updating product:", error);
        return new Response (
            JSON.stringify({error: "Failed to update product"}),
            {status: 500}
        );
    }

   
}

export async function DELETE(req, {params}) {
    await connectToDatabase();

    const id = params?.id;
    if(!id) {
        return new Response(JSON.stringify({error: "Product ID is required"}), {status: 400});
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) {
            return new Response(JSON.stringify({error: "Product not found"}), {status: 404});
        }
        return new Response(JSON.stringify({message: "Product deleted", product: deletedProduct}), {status: 200});
    } catch (error) {
        console.error("Error deleting product:", error);
        return new Response(
            JSON.stringify({error: "failed to delete product"}),
            {status: 500}
        );
    }
}