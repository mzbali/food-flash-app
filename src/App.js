import React, { useState } from 'react';
import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import AvailableMeals from './components/Meals/AvailableMeals';
import Cart from './components/Cart/Cart';

function App() {
  const [showCart, setShowCart] = useState(false);

  const cartShow = () => {
    setShowCart(true);
  };
  const cartHide = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onCartClose={cartHide} />}
      <Header onCartClick={cartShow} />
      <AvailableMeals />
    </CartProvider>
  );
}

export default App;
