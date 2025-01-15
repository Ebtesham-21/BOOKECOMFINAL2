"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";


export default function newProducts() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    async function createProduct(ev) {
        ev.preventDefault();

        if(isSubmitting) return;
        setIsSubmitting(true);

        try {
            const data = {title, description, price};
            const response = await axios.post("http://localhost:3000/products", data);

            if(response.status === 201) {
                router.push("/products");
            }
        } catch (error) {
            console.error("Failed to create product: ",  error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
            <h1 >New Product</h1>
            <label>Product Name</label>
            <input 
            type="text" 
            placeholder="Book Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}/>
            <label>Description</label>
            <textarea 
            placeholder="description" 
            value={description}
            onChange={ev => setDescription(ev.target.value)}/>
            
            <label>Price(in USD)</label>
            <input type="number"
             placeholder="price"
             value={price}
             onChange={ev => setPrice(ev.target.value)}
             />
            <button
            type="submit"
            className="btn-primary" 
            disabled={isSubmitting}
            >
                {isSubmitting ? "Saving...": "Save"}
            </button>
            </form>
        </Layout>
    )
}