import Layout from "../components/Layout";

export default function newProducts() {
    return (
        <Layout>
            <h1 >New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder="Book Name"/>
            <label>Description</label>
            <textarea placeholder="description"></textarea>
            <label>Price(in USD)</label>
            <input type="number" placeholder="price"/>
            <button >Save</button>
        </Layout>
    )
}