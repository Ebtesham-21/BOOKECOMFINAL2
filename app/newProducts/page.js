"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function newProducts() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    function createProduct(){
        const data = {title, description, price};
        axios.post('/api/products', data)
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
            className="btn-primary" >Save</button>
            </form>
        </Layout>
    )
}