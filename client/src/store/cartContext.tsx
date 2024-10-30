import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  fetchCartFromAPI: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart from API
  const fetchCartFromAPI = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  // Add item to cart and sync with API
  const addItemToCart = async (item: CartItem) => {
    try {
      const response = await axios.post('/api/cart/add', item);
      setCart(response.data); // Assuming API returns updated cart
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  // Remove item from cart and sync with API
  const removeItemFromCart = async (itemId: number) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${itemId}`);
      setCart(response.data); // Assuming API returns updated cart
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  // Update item quantity and sync with API
  const updateItemQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await axios.patch(`/api/cart/update/${itemId}`, { quantity });
      setCart(response.data); // Assuming API returns updated cart
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity, fetchCartFromAPI }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
