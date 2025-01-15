"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect } from "react";
import axios from "axios";

export default function Products() {
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
        </Layout>
    )

}