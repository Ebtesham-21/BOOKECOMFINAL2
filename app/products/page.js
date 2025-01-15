"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/models/Product";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => 
        
        {
            axios.get('./api/products').then(response => {
                console.log(response.data);
            });
        }, []);
    return (
        <Layout>
            <Link className="bg-red-600 rounded-md text-white py-2 px-2" href={'/newProducts'}>
                Add New Product
            </Link>
            <table>
                <thead>
                    <tr>
                        <td>
                            Product name
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody>
                    {products.map( product => (
                        <tr>
                            <td>{product.title}</td>
                            <td>
                                buttons
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )

}