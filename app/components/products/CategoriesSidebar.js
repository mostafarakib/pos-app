import React from "react";
import "./Products.css";

function CategoriesSidebar({
  categories,
  handleCategoryChange,
  selectedCategory,
}) {
  return (
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header justify-content-end">
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body py-0">
        <h5 className="text-center mb-3">Categories</h5>
        <div className="category-buttons">
          <button
            className={
              selectedCategory === "all"
                ? "category-btn selected-category"
                : "category-btn"
            }
            onClick={() => handleCategoryChange("all")}
          >
            All Categories
          </button>
          <div className="category-buttons-container">
            {categories.map((category, index) => (
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
        </div>
      </div>
    </div>
  );
}

export default CategoriesSidebar;