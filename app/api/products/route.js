// export async function POST(req) {
//     const body = await req.json();
//     const { title, description, price } = body;
//     console.log(body)

//     // Add your logic here to save the product (e.g., to a database).
//     // For now, we just return the data back as a success response.

//     return new Response(
//         JSON.stringify({
//             message: 'Product created',
//             product: { title, description, price },
//         }),
//         { status: 201 }
//     );
// }

// export async function GET() {
//     // If you want to handle GET requests later, you can add logic here.
//     return new Response(JSON.stringify({ message: 'GET request to /api/products' }), {
//         status: 200,
//     });
// }

import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if(cachedClient && cachedDb){
        return { client: cachedClient, db: cachedDb};
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return {client, db};
}

export async function POST(req) {
    console.log("Received a post req");
    try {
        const body = await req.json();
        console.log("Request body:", body);

        const {title, description, price} = body;

        if(!title || !description || !price) {
            return new Response(
                JSON.stringify({error: "All fields are required"}),
                {status: 400}

            );
        }

        const {db} = await connectToDatabase();

        const result = await db.collection("products").insertOne({
            title,
            description,
            price: parseFloat(price),
            createdAt: new Date(),
        });

        console.log("Product inserted:", result);

        return new Response(
            JSON.stringify({
                message: "Product created succcessfully",
                product: {
                    id: result.insertedId,
                    title,
                    description,
                    price: parseFloat(price),
                },
            }),
            {status: 201}
        );
    } catch (error) {
        console.error("Error creating product: ", error);
        return new Response(
            JSON.stringify({ error: "Falied to create product"}),
            {status: 500}
        );
    }
}

export async function GET() {
    return new Response(JSON.stringify({message: "GET request to /api/products"}), {
        status: 200,
    });
}