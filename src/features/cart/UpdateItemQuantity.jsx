import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { increseItemQuantity, decreaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increseItemQuantity(pizzaId));
  }

  function handleDecrement() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={handleDecrement}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
