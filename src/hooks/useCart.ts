import { useState, useEffect } from 'react';
import { Product } from '../modules/Products/components/models';

const CART_KEY = 'cart';

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const saveCart = (items: Product[]) => {
    setCart(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      }
    }
  }, []);

  const addToCart = (product: Product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], ...product };
      saveCart(updatedCart);
    } else {
      const updatedCart = [...cart, product];
      saveCart(updatedCart);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  const total = cart.length

  return { cart, addToCart, removeFromCart, total };
};
