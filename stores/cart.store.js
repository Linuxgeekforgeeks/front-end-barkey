import { create } from "zustand";

export const useCartStore = create((set, get) => {
  // Initialize cartItems from localStorage or use empty array
  const initialCart = (() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart-storage");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  })();

  return {
    cartItems: initialCart,
    // Add or update an item in the cart
    addToCart: (product) =>
      set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id);
        let newCart;
        if (existingItem) {
          newCart = state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          newCart = [...state.cartItems, { ...product, quantity: 1 }];
        }
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart-storage", JSON.stringify(newCart));
        }
        return { cartItems: newCart };
      }),
    // Remove an item from the cart
    removeFromCart: (id) =>
      set((state) => {
        const newCart = state.cartItems.filter((item) => item.id !== id);
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart-storage", JSON.stringify(newCart));
        }
        return { cartItems: newCart };
      }),
    // Increase quantity of an item
    increaseQuantity: (id) =>
      set((state) => {
        const newCart = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart-storage", JSON.stringify(newCart));
        }
        return { cartItems: newCart };
      }),
    // Decrease quantity of an item (remove if quantity becomes 0)
    decreaseQuantity: (id) =>
      set((state) => {
        const item = state.cartItems.find((item) => item.id === id);
        let newCart;
        if (item.quantity === 1) {
          newCart = state.cartItems.filter((item) => item.id !== id);
        } else {
          newCart = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart-storage", JSON.stringify(newCart));
        }
        return { cartItems: newCart };
      }),
    // Update quantity directly
    updateQuantity: (id, quantity) =>
      set((state) => {
        let newCart;
        if (quantity <= 0) {
          newCart = state.cartItems.filter((item) => item.id !== id);
        } else {
          newCart = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
        }
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart-storage", JSON.stringify(newCart));
        }
        return { cartItems: newCart };
      }),
    // Clear the cart
    clearCart: () =>
      set(() => {
        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart-storage");
        }
        return { cartItems: [] };
      }),
  };
});