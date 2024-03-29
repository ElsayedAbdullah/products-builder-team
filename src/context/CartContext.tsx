import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ShoppingCart from "../components/ShoppingCart";

interface IInitialState {
  cartItems: ICartItem[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
  cartQuantity: number;
}

interface ICartItem {
  id: number;
  quantity: number;
}

const initState = {};
export const CartContext = createContext(initState as IInitialState);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>(
    localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products")!)
      : []
  );

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartItems));
    cartItems.length === 0 && setIsOpen(false);
  }, [cartItems]);

  // cart functionality
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // cart quantity
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  //
  const increaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // remove cart item
  const removeCartItem = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  // open and close shopping cart
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};
