import { useState, useEffect } from 'react';
import { Product } from '../modules/Products/components/models';

const CART_KEY = 'cart';

export const useCart = () => {
  const [cart, setCart] = useState<Product | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart && typeof parsedCart === 'object') {
          // Converte price para number, se necessário
          const cartWithTypedValues = {
            ...parsedCart,
            price: Number(parsedCart.price),
          };
          setCart(cartWithTypedValues);
        }
      } catch (e) {
        console.error('Erro ao ler o carrinho:', e);
      }
    }
  }, []);

  const saveCart = (item: Product | null) => {
    setCart(item);
    if (item) {
      localStorage.setItem(CART_KEY, JSON.stringify(item));
    } else {
      localStorage.removeItem(CART_KEY);
    }
  };

  const addToCart = (product: Product) => {
    saveCart(product);
  };

  const removeFromCart = () => {
    saveCart(null);
  };

  const total = cart ? 1 : 0;

  return { cart, addToCart, removeFromCart, total };
};
