import Cart from "./components/cart/Cart";
import Products from "./components/products/Products";
import "./page.css";

export default function Home() {
  return (
    <main className="main">
      <Cart />
      <Products />
    </main>
  );
}
