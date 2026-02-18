import { useState } from "react";
import {
  addToCartApi,
  viewCartApi,
  deleteCartApi,
  updateCartApi,
  placeOrderApi,
} from "../../api/cart.api";
import type { ApiSuccess } from "../../types/common";

// import type { ViewCartResponse } from "../../types";
import { CartContext } from "../../context/cart/CartContext";
import type { CartItem } from "../../types/cart";
import { normalizeCart } from "../../utils/cartNormalizer";
import { toast } from "react-toastify";
import { getProductsApi } from "../../api/product.api";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // const [cart, setCart] = useState<ViewCartResponse["output"] | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  // const loadCart = async () => {
  //   setLoading(true);
  //   const { data } = await viewCartApi();
  //   setCart(data.output);
  //   setLoading(false);
  // };

  // const loadCart = async () => {
  //   setLoading(true);

  //   const { data } = await viewCartApi();

  //   if (!data?.output || Object.keys(data.output).length === 0) {
  //     // 🔥 when cart empty
  //     setCart([]);
  //     setLoading(false);
  //     return;
  //   }

  //   const normalized = normalizeCart(data.output);
  //   setCart(normalized);
  //   setLoading(false);
  // };

  const loadCart = async () => {
    // setLoading(true);

    try {
      setCartLoading(true);
      const { data: cartData } = await viewCartApi();

      if (!cartData?.output || Object.keys(cartData.output).length === 0) {
        setCart([]);
        return;
      }

      // ✅ Get supplydate from cart response
      const supplydate = Object.keys(cartData.output)[0];

      const { data: productData } = await getProductsApi(supplydate);

      const normalized = normalizeCart(
        cartData.output,
        productData.proddefaultratetypedata,
      );

      setCart(normalized);
    } finally {
      // setLoading(false);
      setCartLoading(false);
    }
  };

 

  const addToCart = async (
    supplydate: string,
    supplyshift: number,
    productcode: number,
    quantity: number,
  ): Promise<ApiSuccess> => {
    const { data } = await addToCartApi({
      supplydate,
      supplyshift,
      productcode,
      quantity,
    });

    // 🔥 refresh cart only on success
    if (!data.error) {
      await loadCart();
    }

    // ✅ RETURN API RESPONSE
    return data;
  };

  // const removeFromCart = async (cartid: number) => {
  //   try {
  //     setLoading(true);

  //     await deleteCartApi({ cartid });

  //     // ✅ SUCCESS TOAST
  //     toast.success("Item removed from cart");

  //     await loadCart(); // 🔥 refresh UI immediately
  //   } catch (error) {
  //     // ❌ ERROR TOAST
  //     toast.error("Failed to remove item");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const removeFromCart = async (cartid: number): Promise<ApiSuccess> => {
    try {
      // setLoading(true);
      setRemovingId(cartid);
      const { data } = await deleteCartApi({ cartid });

      /* ❌ BUSINESS ERROR FROM API */
      if (data.error) {
        toast.error(data.error, { theme: "colored" });
        return data;
      }

      /* ✅ SUCCESS */
      toast.success(`Item removed from cart:${data.success}`);

      // await loadCart(); // 🔄 refresh UI

      // return data;
      // ✅ REMOVE ITEM LOCALLY (NO loadCart call)
      setCart((prev) => prev.filter((item) => item.cartid !== cartid));

      return data;
    } catch (error) {
      /* ❌ NETWORK / SERVER ERROR */
      toast.error("Failed to remove item", { theme: "colored" });

      return {
        success: "",
        error: "Failed to remove item",
      };
    } finally {
      // setLoading(false);
      setRemovingId(null);
    }
  };

  const increaseQty = async (item: CartItem) => {
    await updateCartApi({
      cartid: item.cartid,
      productgid: 0, // backend ignore or keep 0
      quantity: item.quantity + 1,
      supplydate: "", // backend already has it
      supplyshift: 0,
    });

    await loadCart();
  };

  const decreaseQty = async (item: CartItem) => {
    if (item.quantity <= 1) {
      await removeFromCart(item.cartid);
      return;
    }

    await updateCartApi({
      cartid: item.cartid,
      productgid: 0,
      quantity: item.quantity - 1,
      supplydate: "",
      supplyshift: 0,
    });

    await loadCart();
  };

  //   const placeOrder = async () => {
  //   try {
  //     setLoading(true);

  //     await placeOrderApi(); // 🔥 API CALL

  //     toast.success("Order placed successfully");

  //     setCart([]); // ✅ clear cart UI
  //   } catch (error) {
  //     toast.error("Failed to place order");
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const placeOrder = async (): Promise<ApiSuccess> => {
    try {
      // setLoading(true);

      const { data } = await placeOrderApi();

      /* ❌ BUSINESS ERROR FROM API */
      if (data.error) {
        toast.error(data.error, { theme: "colored" });
        return data;
      }

      /* ✅ SUCCESS */
      toast.success(data.success || "Order placed successfully", {
        theme: "colored",
      });

      setCart([]); // ✅ clear cart UI

      return data;
    } catch (error) {
      /* ❌ NETWORK / SERVER ERROR */
      toast.error("Failed to place order", { theme: "colored" });

      return {
        success: "",
        error: "Failed to place order",
      };
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const updateCart = async (
    cartid: number,
    productgid: number,
    quantity: number,
    supplydate: string,
    supplyshift: number,
  ): Promise<ApiSuccess> => {
    const { data } = await updateCartApi({
      cartid,
      productgid,
      quantity,
      supplydate,
      supplyshift,
    });

    // 🔄 refresh cart only if success
    if (!data.error) {
      await loadCart();
    }

    return data;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        // loading,
        loadCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        updateCart,
        placeOrder,
        cartLoading,
        removingId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
