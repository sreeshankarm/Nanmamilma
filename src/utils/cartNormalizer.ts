

import type { ViewCartResponse, CartItem } from "../types/cart";
import type { Product } from "../types/product";



export const normalizeCart = (
  output: ViewCartResponse["output"],
    products: Product[],
): CartItem[] => {
  const items: CartItem[] = [];

  Object.entries(output).forEach(([date, dateObj]) => {
    Object.entries(dateObj).forEach(([shift, shiftObj]) => {
      Object.entries(shiftObj).forEach(([_, groupObj]) => {
        Object.entries(groupObj).forEach(([productgid, item]) => {

             // 🔥 match product using product code
          const matchedProduct = products.find(
            (p) => p.prod_code === item.code,
          );

          items.push({
            cartid: item.cartid,
            productgid: Number(productgid),
            productname: item.productname,
            quantity: Number(item.quantity),
            rate: Number(item.rate),
            supplydate: date,
            supplyshift: Number(shift),

            // modal fields
            prod_code: item.code,
            prod_name: item.productname,
            final_rate: item.rate,
            // imagepath: "",   // optional, populate if you have image
            // subgrp_name: "", // optional
              imagepath:
              matchedProduct?.imagepath || "/images/default-product.png",
            subgrp_name: matchedProduct?.subgrp_name || "",
          });
        });
      });
    });
  });

  return items;
};
