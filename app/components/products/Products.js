"use client";
import { React, useEffect, useState } from "react";
import "./Products.css";
import Product from "./Product";
import CategoriesSidebar from "./CategoriesSidebar";

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [demoCategories, setDemoCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async function fetchData() {
      try {
        const productsData = await getData();
        setProducts(productsData);

        // Extract unique categories from products
        const uniqueCategories = Array.from(
          new Set(productsData.map((product) => product.category))
        );
        setCategories(uniqueCategories);
        setDemoCategories(uniqueCategories.slice(0, 2));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="products-main-container">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          className="search-bar"
          type="search"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      <div className="category-filter mt-4">
        <div className="category-buttons">
          <button
            className={
              selectedCategory === "all"
                ? "category-btn selected-category category-btn-all"
                : "category-btn category-btn-all"
            }
            onClick={() => handleCategoryChange("all")}
          >
            All Categories
          </button>
          <div className="category-buttons-container">
            {demoCategories.map((category, index) => (
              <button
                key={index}
                className={
                  selectedCategory === category
                    ? "category-btn selected-category"
                    : "category-btn"
                }
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            className="more-category-btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#categoryoffcanvasRight"
            aria-controls="offcanvasRight"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="6"
              viewBox="0 0 128 512"
            >
              <path
                fill="#637381"
                d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
              />
            </svg>
          </button>
          <CategoriesSidebar
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <div className="products-container">
        {searchedProducts.length > 0 ? (
          searchedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p className="text-danger text-center">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
