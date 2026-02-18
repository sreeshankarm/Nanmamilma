import type { Product } from "../types";

interface Props {

  product: Product;
  onAdd: (p: Product) => void;
  onClick?: () => void;
}

export default function ProductCard({ product,  onClick }: Props) {
  return (
    <div className="relative border border-gray-200 bg-white rounded-2xl shadow p-4 pb-5 hover:shadow-lg transition-all duration-300 max-w-[300px]">
      {/* Top-left Number Tag */}
      <span className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs px-2 py-0.5 rounded">
        {/* #{product.id} */}
        #{product.prod_code}
      </span>

      {/* Top-right Price Badge */}
      <span className="absolute top-2 right-2 bg-[#8e2d26] text-white text-sm font-semibold px-2 py-0.5 rounded">
        {/* ₹{product.price} */}₹{Number(product.final_rate).toFixed(2)}
      </span>

      {/* Product Image */}
      <img
        // src={product.image}
        // alt={product.name}
        src={product.imagepath || "/placeholder.png"}
        alt={product.prod_name}
        className="w-full h-32 object-contain mt-4 transition-transform duration-300 cursor-pointer hover:scale-105"
      />

      {/* Product Name */}
      <h3 className="font-semibold text-lg mt-3">{product.prod_name}</h3>

      {/* Malayalam Subtitle */}
      {/* {product.subtitle && (
        <p className="text-sm text-gray-500 -mt-1">{product.subtitle}</p>
      )} */}

      {/* ADD Button */}
      <button
        //   onClick={(e) => {
        //   e.stopPropagation(); // ⛔ prevents modal open when clicking ADD
        //   onAdd(product);
        // }}
        onClick={onClick}
        className="w-full mt-4 bg-[#8e2d26] text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-1 cursor-pointer hover:bg-[#1e3a8a] transition"
      >
        <span className="text-lg">+</span> ADD
      </button>
    </div>
  );
}
