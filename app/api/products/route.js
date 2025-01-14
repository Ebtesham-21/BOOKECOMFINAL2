export async function POST(req) {
    const body = await req.json();
    const { title, description, price } = body;

    // Add your logic here to save the product (e.g., to a database).
    // For now, we just return the data back as a success response.

    return new Response(
        JSON.stringify({
            message: 'Product created',
            product: { title, description, price },
        }),
        { status: 201 }
    );
}

export async function GET() {
    // If you want to handle GET requests later, you can add logic here.
    return new Response(JSON.stringify({ message: 'GET request to /api/products' }), {
        status: 200,
    });
}
