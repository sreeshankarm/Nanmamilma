

import { createContext } from "react";
import type { CartItem } from "../../types/cart";
import type { ApiSuccess } from "../../types/common";



export interface CartContextType {
  cart: CartItem[];
  // loading: boolean;
  cartLoading: boolean;
  removingId: number | null;
  loadCart: () => Promise<void>;
  addToCart: (
    supplydate: string,
    supplyshift: number,
    productcode: number,
    quantity: number,
  ) => Promise<ApiSuccess>;
  updateCart: (
    cartid: number,
    productgid: number,
    quantity: number,
    supplydate: string,
    supplyshift: number,
  ) => Promise<ApiSuccess>;

  // removeFromCart: (cartid: number) => Promise<void>;
  removeFromCart: (cartid: number) => Promise<ApiSuccess>;
  increaseQty: (item: CartItem) => Promise<void>;
  decreaseQty: (item: CartItem) => Promise<void>;
  // placeOrder: () => Promise<void>;
  placeOrder: () => Promise<ApiSuccess>;
}

export const CartContext = createContext<CartContextType | null>(null);
