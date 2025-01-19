"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);

    // Fetch products on component mount
    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data.products); // Assuming the response contains the products in `data.products`
            })
            .catch((error) => {
                console.error("Error fetching products: ", error);
            });
    }, []); // Empty array to ensure this runs only once on component mount

    return (
        <Layout>
            <Link className="bg-red-600 rounded-md text-white py-2 px-2" href="/newProducts">
                Add New Product
            </Link>
            <table className="basic mt-6">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}> {/* Use product._id as a unique key */}
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>
                                
                                    <button>Edit</button>
                                 
                                </td>
                                <td>
                                    <Link href={'/products/' + product._id}>Edit</Link>

                                </td>
                               
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout>
    );
}
