import ProductDetailsModal from "@/app/components/products/ProductDetailsModal";
import Image from "next/image";
import React from "react";

function Product({ product }) {
  return (
    <>
      <div
        className="product-card"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#productDetailsModal-${product.id}`}
      >
        <div className="px-2">
          <Image
            src={product.image}
            className="product-image"
            alt="card-image"
            width={100}
            height={120}
          />
        </div>
        <p className="text-center fw-bold">
          <small>${product.price}</small>
        </p>
        <hr />
        <p className="text-center px-2 text-break">
          <small>{product.title}</small>
        </p>
      </div>
      <ProductDetailsModal product={product} id={product.id} />
    </>
  );
}

export default Product;
