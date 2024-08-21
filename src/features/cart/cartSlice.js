import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1) {
        // reducer复用，在一个reducer action里调用另外一个action
        cartSlice.caseReducers.deleteItem(state, action);
      }
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = initialCartState.cart;
    },
  },
});

export const getTotalPizzas = (cart) =>
  cart.reduce((accumulator, current) => {
    return accumulator + current.quantity;
  }, 0);

export const getTotalPrice = (cart) =>
  cart.reduce((accumulator, current) => {
    return accumulator + current.totalPrice;
  }, 0);

// getCurrentQuantityById 是一个高阶函数，它接受一个 id 参数，并返回另一个函数。
// 返回的函数接收 Redux 的 state 作为参数，用于从 state 中获取数据。
export const getCurrentQuantityById = (id) => (state) => {
  const currentItem = state.cart.cart.find((item) => item.pizzaId === id);
  if (!currentItem) return 0;
  return currentItem.quantity;
};

export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
