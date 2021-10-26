import React, { useReducer } from 'react';
import CartContext from './cart-context';

//[{id:m1, name:sushi, price:32.3, amount:3}]

const DEFAULT_CART_ITEMS = { items: [], totalPrice: 0 };

const cartReducer = (state, action) => {
  let updatedCart = { ...state };
  if (action.type === 'ADD') {
    updatedCart.totalPrice =
      state.totalPrice + action.item.price * action.item.amount;
    const existingItemIndex = updatedCart.items.findIndex(
      (item) => item.id === action.item.id
    );
    if (existingItemIndex !== -1) {
      let updatedItem = updatedCart.items[existingItemIndex];
      updatedItem.amount += action.item.amount;
      updatedCart.items[existingItemIndex] = updatedItem;
    } else {
      updatedCart.items.push(action.item);
    }
    return updatedCart;
  } else if (action.type === 'REMOVE') {
    let updatedItems = [...state.items];
    const existingItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );
    let updatedItem = updatedItems[existingItemIndex];
    const updatedTotalPrice = state.totalPrice - updatedItem.price;
    if (updatedItem.amount === 1) {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    } else {
      updatedItem.amount -= 1;
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalPrice: updatedTotalPrice };
  } else if (action.type === 'CLEAR') {
    return { items: [], totalPrice: 0 };
  }
  return DEFAULT_CART_ITEMS;
};

const CartProvider = (props) => {
  const [cartItems, dispatchCartAction] = useReducer(
    cartReducer,
    DEFAULT_CART_ITEMS
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartItems.items,
    totalPrice: cartItems.totalPrice,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
