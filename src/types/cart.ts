


/* ---------- ADD TO CART ---------- */
export interface AddToCartPayload {
  supplydate: string;
  supplyshift: number;
  productcode: number;
  quantity: number;
}

/* ---------- CART ITEM FROM API ---------- */
export interface CartApiItem {
  quantity: string;
  productname: string;
  cartid: number;
  rate: string;

  code: number;           // product code from API
  offerapplied?: any;
  uom_name?: string;
  ratetype_gid?: number;
}

/* ---------- VIEW CART RESPONSE ---------- */
export interface ViewCartResponse {
  output: Record<
    string, // date
    Record<
      string, // shift
      Record<
        string, // product group
        Record<string, CartApiItem>
      >
    >
  >;
  error?: string;
}

/* ---------- NORMALIZED CART ITEM FOR UI ---------- */
export interface CartItem {
  cartid: number;
  productgid: number;     // key from API object
  productname: string;
  quantity: number;
  rate: number;
  supplydate: string;
  supplyshift: number;

  // extra for modal
  prod_code: number;
  prod_name: string;
  final_rate: string;
  imagepath?: string;
  subgrp_name?: string;
}

