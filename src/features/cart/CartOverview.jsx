import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzas, getTotalPrice } from "./cartSlice";

function CartOverview() {
  // 尽量把Redux里的state操作相关逻辑放到slice里，这样可以保证每个组件的纯净
  const cart = useSelector((store) => store.cart.cart);
  const totalPizzas = getTotalPizzas(cart);
  const totalPrice = getTotalPrice(cart);

  if (!totalPizzas) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalPizzas} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
