"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function newProducts() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function createProduct(ev) {
        ev.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        // Basic form validation
        if (!title || !description || !price) {
            alert("All fields are required.");
            setIsSubmitting(false);
            return;
        }

        try {
            const data = {
                title,
                description,
                price: parseFloat(price), // Ensure price is a number
            };
            const response = await axios.post("/api/products", data);

            if (response.status === 201) {
                router.push("/products");
            }
        } catch (error) {
            console.error("Failed to create product: ", error);
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
                    placeholder="Book Name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <label>Description</label>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} />

                <label>Price (in USD)</label>
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)} />

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
        </Layout>
    );
}
