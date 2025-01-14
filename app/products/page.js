import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect } from "react";

export default function Products() {
    useEffect(() => {}, []);
    return (
        <Layout>
            <Link className="bg-red-600 rounded-md text-white py-2 px-2" href={'/newProducts'}>
                Add New Product
            </Link>
        </Layout>
    )

}