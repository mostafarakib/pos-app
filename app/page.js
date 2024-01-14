import Cart from "./components/cart/Cart";
import Products from "./components/products/Products";
import { CartProvider } from "./context/CartContext";
import "./page.css";

export default function Home() {
  return (
    <main className="main">
      <CartProvider>
        <Cart />
        <Products />
      </CartProvider>
    </main>
  );
}
