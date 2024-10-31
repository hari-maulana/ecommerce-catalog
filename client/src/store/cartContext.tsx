import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItemToCart: (item: CartItem) => void;
  fetchCartItems: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fetch cart items from the API
  const fetchCartItems = async () => {
    try {
      const response = await axios.get<CartItem[]>(
        `${import.meta.env.VITE_API_URL}/cart`
      );
      setCartItems(response.data);
      calculateCartTotals(response.data);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  // Calculate total quantity and price in the cart
  const calculateCartTotals = (items: CartItem[]) => {
    const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalQuantity(totalQty);
    setTotalPrice(totalCost);
  };

  // Add item to the cart and communicate with the API
  const addItemToCart = async (item: CartItem) => {
    try {
      const updatedCart = [...cartItems];
      const itemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex >= 0) {
        updatedCart[itemIndex].quantity += item.quantity;
      } else {
        updatedCart.push(item);
      }

      // Optimistically update cart before API call
      setCartItems(updatedCart);
      calculateCartTotals(updatedCart);

      // Persist the cart change
      await axios.post("/api/cart", item);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalPrice,
        addItemToCart,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
