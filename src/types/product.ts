/* ---------- PRODUCT ---------- */
export interface Product {
  prod_name: string;
  prod_code: number;
  final_rate: string;
  imagepath?: string;
  subgrp_name:string;
   mrp:string;
  
}

/* ---------- PRODUCT SUB GROUP ---------- */
export interface ProductSubGroup {
  subgrp_name: string;
  subgrp_gid: number;
  
}

/* ---------- PRODUCT LIST RESPONSE ---------- */
export interface ProductListResponse {
  cartproductcodes: number[];
  proddefaultratetypedata: Product[];
  productsubgroups: ProductSubGroup[];
}

/* ---------- PRODUCT DETAILS ---------- */
export interface ProductDetail {
  prod_name: string;
  prod_code: number;
  final_rate: string;
  mrp:string;
  uom_name: string;
  imagepath?: string; // ✅ ADD THIS

}

export interface ProductDetailsResponse {
  productdetails: ProductDetail[];
  allowedshifts: number[];
  
}


export interface ModalProduct {
  prod_code: number;
  prod_name: string;
  final_rate: number;
  imagepath?: string;
  mrp?:string;
}
