import { React } from "react";

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
    <div>
      {products.map((product) => (
        <p className="text-primary" key={product.id}>
          {product.title}
        </p>
      ))}
    </div>
  );
};

export default Products;
