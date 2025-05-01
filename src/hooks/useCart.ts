import { useState, useEffect } from 'react';
import { Product } from '../modules/Products/components/models';

const CART_KEY = 'cart';

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const saveCart = (items: Product[]) => {
    setCart(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    saveCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return { cart, addToCart, removeFromCart, clearCart };
};