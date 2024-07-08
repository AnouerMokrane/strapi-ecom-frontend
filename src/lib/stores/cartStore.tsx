import { CartItem } from "@/types";
import { create } from "zustand";

type State = {
  openCart: boolean;
  cartItems: CartItem[];
};

type Actions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  decreaseQuantity: (id: number, size: string, color: string) => void;
  setOpenCart: (newState: boolean) => void;
};

const getStoredCartItems = (): CartItem[] => {
  try {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    console.error("Error fetching cart items from localStorage:", error);
    return [];
  }
};

const useCartStore = create<State & Actions>((set) => ({
  cartItems: getStoredCartItems(),
  openCart: false,

  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingItem) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
            ? { ...item, quantity: newItem.quantity }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      } else {
        const updatedCartItems = [...state.cartItems, newItem];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      }
    }),

  decreaseQuantity: (id, size, color) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (existingItem) {
        const updatedQuantity = Math.max(existingItem.quantity - 1, 1); // Ensure quantity doesn't go below 1
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: updatedQuantity }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      }

      return state;
    }),

  removeFromCart: (id, size, color) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) =>
          item.id !== id ||
          (color && item.color !== color) ||
          (size && item.size !== size)
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cartItems");
      return { cartItems: [] };
    }),
  setOpenCart: (newState) => set(() => ({ openCart: newState })),
}));

export default useCartStore;
