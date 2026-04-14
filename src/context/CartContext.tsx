import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  parametersCount?: number;
  fastingRequired?: boolean;
  labName?: string | null;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("hub_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<any>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout>();

  // Fetch initial auth session and sync cart if needed
  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Load cart from user metadata if it exists and local is empty
        const remoteCart = session.user.user_metadata?.cart_items;
        if (remoteCart && Array.isArray(remoteCart)) {
          setCartItems(remoteCart);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (event === 'SIGNED_IN') {
          // On login, prefer remote cart over local empty, or merge them. For now, prefer remote if it exists.
          const remoteCart = session.user.user_metadata?.cart_items;
          const localCart = JSON.parse(localStorage.getItem("hub_cart") || "[]");

          if (remoteCart && Array.isArray(remoteCart) && remoteCart.length > 0) {
            setCartItems(remoteCart);
          } else if (localCart.length > 0) {
            // Push local cart to remote upon fresh login without remote cart
            await supabase.auth.updateUser({ data: { cart_items: localCart } });
          }
        }
      } else {
        setUser(null);
        if (event === 'SIGNED_OUT') {
          // Optionally clear cart on sign out
          setCartItems([]);
          localStorage.removeItem("hub_cart");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync to local storage and Supabase remote metadata on changes
  useEffect(() => {
    localStorage.setItem("hub_cart", JSON.stringify(cartItems));

    // Sync to Supabase user metadata
    if (user) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

      // Debounce updates to avoid rate-limiting
      syncTimeoutRef.current = setTimeout(async () => {
        const metadataCart = user.user_metadata?.cart_items;
        // Basic check to avoid re-syncing if identical
        if (JSON.stringify(metadataCart) !== JSON.stringify(cartItems)) {
          await supabase.auth.updateUser({
            data: { cart_items: cartItems }
          });
        }
      }, 1000);
    }
  }, [cartItems, user]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      if (prev.find((i) => i.id === item.id || i.name === item.name)) {
        toast.error("Test is already in the cart!");
        return prev;
      }
      toast.success(`${item.name} added to cart!`);
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id && i.name !== id));
    toast.success("Test removed from cart");
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
