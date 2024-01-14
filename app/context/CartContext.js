"use client";
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = () => ({
  cartItems: [],
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If the item doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      let updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case "DECREASE_QUANTITY":
      if (action.payload.quantity > 1) {
        // Use action.payload directly to access the product and its quantity
        const updatedProduct = {
          ...action.payload,
          quantity: action.payload.quantity - 1,
        };

        const productIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );

        const updatedCartItems = [
          ...state.cartItems.slice(0, productIndex),
          updatedProduct,
          ...state.cartItems.slice(productIndex + 1),
        ];

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }
      return state;

    case "INCREASE_QUANTITY":
      const updatedProductIncrease = {
        ...action.payload,
        quantity: action.payload.quantity + 1,
      };

      const productIndexIncrease = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedCartIncrease = [
        ...state.cartItems.slice(0, productIndexIncrease),
        updatedProductIncrease,
        ...state.cartItems.slice(productIndexIncrease + 1),
      ];

      return {
        ...state,
        cartItems: updatedCartIncrease,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState());

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  };

  const decreaseCartItemQuantity = (product) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: product,
    });
  };
  const increaseCartItemQuantity = (product) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        decreaseCartItemQuantity,
        increaseCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
