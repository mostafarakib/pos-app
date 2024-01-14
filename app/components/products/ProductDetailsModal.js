import React from "react";
import "./Products.css";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

function ProductDetailsModal({ product, id }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product });
  };
  return (
    <div
      className="modal fade text-black"
      id={`productDetailsModal-${id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content py-4 px-5">
          <button
            type="button"
            className="btn-main product-details-modal-close-btn"
            data-bs-dismiss="modal"
          >
            &#10006;
          </button>
          <div className="product-details-container">
            <div>
              <Image
                src={product.image}
                className="product-details-image"
                alt="card-image"
                width={100}
                height={100}
              />
            </div>
            <div className="product-details-text-container">
              <h6>{product.title}</h6>
              <p>{product.description}</p>
              <h6 className="mt-2">${product.price}</h6>
              <button className="btn-main w-100 mt-2" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
