"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewProducts() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function createProduct(ev) {
        ev.preventDefault();

        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);

        // Basic form validation
        if (!title || !description || !price) {
            alert("All fields are required.");
            setIsSubmitting(false);
            return;
        }

        try {
            const data = { title, description, price: parseFloat(price) };
            const response = await axios.post("/api/products", data); // Ensure the POST request is correct

            if (response.status === 201) {
                router.push("/products"); // Redirect to products page after successful creation
            }
        } catch (error) {
            console.error("Failed to create product:", error);
            alert("An error occurred while creating the product.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>
                <label>Product Name</label>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)} />
                <label>Description</label>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)} />
                <label>Price (in USD)</label>
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(ev) => setPrice(ev.target.value)} />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
        </Layout>
    );
}
