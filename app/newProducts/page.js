import Layout from "../components/Layout";

export default function newProducts() {
    return (
        <Layout>
            <input type="text" placeholder="Book Name"/>
            <textarea placeholder="description"></textarea>
        </Layout>
    )
}