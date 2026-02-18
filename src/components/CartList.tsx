import { Trash2, Edit3 } from "lucide-react";
// import type { CartItem } from "../typesss/typesss";
import type { CartItem } from "../types/cart";
// import { useState } from "react";

interface Props {
  // items: CartItem[];
  // onIncrease: (id: string) => void;
  // onDecrease: (id: string) => void;
  // onRemove: (id: string) => void;

  items: CartItem[];
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
  onRemove: (cartid: number) => void;
  onEdit: (item: CartItem) => void;
  removingId: number | null;
}

export default function CartList({
  items,
  // onIncrease,
  // onDecrease,
  onRemove,
  onEdit,
  removingId,
}: Props) {
  // const [removingId, setRemovingId] = useState<number | null>(null);

  // const handleRemove = async (cartid: number) => {
  //   setRemovingId(cartid);
  //   try {
  //     await onRemove(cartid);
  //   } finally {
  //     setRemovingId(null);
  //   }
  // };

  const getShiftLabel = (shift: number) => {
    switch (shift) {
      case 1:
        return "Morning Shift";
      case 2:
        return "Evening Shift";
      default:
        return "Unknown Shift";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.cartid}
          className="bg-white border border-gray-200 rounded-xl shadow p-4 flex items-center gap-4"
        >
          {/* <img
            // src={item.product.image}
            // alt={item.product.name}
            className="w-16 h-16 object-contain"
          /> */}

          <div className="relative">
            <img
              src={item.imagepath || "/placeholder.png"}
              alt={item.productname}
              className="w-16 h-16 object-contain"
            />

            {/* 🔥 SMALL BADGE */}
            <span className="absolute -top-2 -left-2 bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
              #{item.prod_code}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{item.productname}</h3>
            {/* <p className="text-gray-500 text-sm">
               ₹{item.rate} × {item.quantity}/
              unit =  ₹ 400 Total
            </p> */}
            <p className="text-gray-500 text-sm">
              ₹ {Number(item.rate).toLocaleString()} × {item.quantity} unit =
              <span className="font-semibold text-gray-500 ml-1">
                ₹ {(Number(item.rate) * item.quantity).toLocaleString()}
              </span>
            </p>

            <p className="text-sm  text-gray-500 mt-1">
              {getShiftLabel(item.supplyshift)}
            </p>

            <p className="text-sm text-gray-500">
              {formatDate(item.supplydate)}
            </p>
          </div>

          {/* Qty Box */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-4">
            {/* <button
              onClick={() => onDecrease(item)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow"
            >
              <Minus size={16} />
            </button> */}

            <span className="text-lg font-semibold">{item.quantity}</span>

            {/* <button
              onClick={() => onIncrease(item)}
              className="w-8 h-8 flex items-center justify-center bg-[#0f172a] text-white rounded-lg shadow"
            >
              <Plus size={16} />
            </button> */}
          </div>

          {/* <Trash2
            className="text-red-500 cursor-pointer"
            // onClick={() => onRemove(item.product.id)}
            onClick={() => onRemove(item.cartid)}
          /> */}

          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={() => onEdit(item)}
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
              title="Edit item"
            >
              <Edit3 size={18} />
            </button>

            {/* <button
              onClick={() => onRemove(item.cartid)}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500"
              title="Remove item"
            >
              <Trash2 size={18} />
            </button> */}

            <button
              // onClick={() => handleRemove(item.cartid)}
              onClick={() => onRemove(item.cartid)}
              disabled={removingId === item.cartid}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-60"
              title="Remove item"
            >
              {removingId === item.cartid ? (
                <span
                  className="h-4 w-4 border-2 border-red-500 border-t-transparent 
                 rounded-full animate-spin block"
                />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
