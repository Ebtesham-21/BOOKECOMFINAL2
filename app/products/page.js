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
                        <th>Product ID</th>
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
                                <td>{product._id}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                            
                                <td>

                                    <Link href={'/products/edit/' + product._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>

                                    Edit
                                    </Link>
                                    <Link href={'/products/' + product._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>

                                    Edit
                                    </Link>

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
