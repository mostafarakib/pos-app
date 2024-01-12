import { React } from "react";
import "./Products.css";
import Product from "./Product";
import ProductDetailsModal from "./ProductDetailsModal";

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Products = async () => {
  const products = await getData();

  return (
    <div className="products-main-container">
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
