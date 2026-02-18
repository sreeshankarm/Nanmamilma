import React, { useState, useEffect } from "react";
import WalletCard from "../components/WalletCard";
import QuickActions from "../components/QuickActions";
import FeedbackBanner from "../components/FeedbackBanner";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard"; // ✅ default import
import SupplyDateCard from "../components/SupplyDateCard";

import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TopUpModal } from "../components/TopUpModal";
import { useProduct } from "../context/product/useProduct";
import type { Product } from "../types/product";
import { useCart } from "../context/cart/useCart";
import { useProfile } from "../context/profile/useProfile";
import { getSettingsApi } from "../api/settings.api";

export const HomeView: React.FC = () => {
  const { profile } = useProfile();
  const balance = Number(profile?.credit_limit ?? 0);
 
  const { products, loading, fetchProducts } = useProduct();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);
  
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [supplyDate, setSupplyDate] = useState(getToday());

  const filtered = products.filter((p) =>
    p.prod_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const navigate = useNavigate();



  useEffect(() => {
    fetchProducts(supplyDate);
  }, [supplyDate]);

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  // useEffect(() => {
  //   const loadSettings = async () => {
  //     try {
  //       const data = await getSettingsApi();

  //       const allowedDays = data?.maxallowedsupplydate ?? 7;

  //       const today = new Date();

  //       // MIN = Today
  //       const min = new Date(today);

  //       // MAX = Today + (allowedDays - 1)
  //       const max = new Date(today);
  //       max.setDate(today.getDate() + (allowedDays - 1));

  //       setMinDate(min.toISOString().split("T")[0]);
  //       setMaxDate(max.toISOString().split("T")[0]);

  //       // Default selected date = today
  //       setSupplyDate(min.toISOString().split("T")[0]);
  //     } catch (error) {
  //       console.error("Settings API failed:", error);
  //     }
  //   };

  //   loadSettings();
  // }, []);

  useEffect(() => {
    const format = (date: Date) => date.toLocaleDateString("en-CA"); // YYYY-MM-DD (safe)

    const loadSettings = async () => {
      try {
        const data = await getSettingsApi();
        const days = data?.maxallowedsupplydate ?? 7;

        const today = new Date();
        const max = new Date();
        max.setDate(today.getDate() + (days - 1));

        setMinDate(format(today));
        setMaxDate(format(max));
        setSupplyDate(format(today));
      } catch (error) {
        console.error("Settings API failed:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <div className="p-4 pb-28 space-y-8 animate-fade-in">
      {/* Wallet / Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WalletCard balance={balance} onTopUp={() => setShowTopUp(true)} />

        <QuickActions
          repeatLastOrder={() => navigate("/cart")}
          goToReturns={() => navigate("/damagesReturn")}
          setActiveView={() => {}}
        />
      </div>
      {/* ================= Feedback & Supply Date ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Feedback Banner */}

        <FeedbackBanner onClick={() => navigate("/feedbackComplaints")} />

        {/* Supply Date */}
      
        <SupplyDateCard
          value={supplyDate}
          min={minDate}
          max={maxDate}
          onChange={(date) => setSupplyDate(date)}
        />
      </div>

      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />


     

      {/* Product Grid */}

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-center text-gray-500 text-lg font-medium">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (
        /* 🔥 API failed OR no data returned */
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg font-medium">
            No products available for selected date
          </p>
        </div>
      ) : filtered.length === 0 ? (
        /* 🔎 Search returned no results */
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg font-medium">
            No items match your search
          </p>
        </div>
      ) : (
        /* ✅ Products exist */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-4">
          {filtered.map((p: Product) => (
            <ProductCard
              key={p.prod_code}
              product={p}
              onAdd={() => {}}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>
      )}

      <TopUpModal
        open={showTopUp}
        onClose={() => setShowTopUp(false)}
        balance={balance}
      />

   

      {selected && (
        <ProductModal
          isEdit={false}
          product={{
            prod_code: selected.prod_code,
            prod_name: selected.prod_name,
            final_rate: Number(selected.final_rate),
            imagepath: selected.imagepath,
          }}
          supplyDate={supplyDate}
          onClose={() => setSelected(null)}
          onConfirm={async (qty, supplyShift, supplyDate) => {
            try {
              const res = await addToCart(
                supplyDate,
                supplyShift,
                selected.prod_code,
                qty,
              );

              /* ❌ BUSINESS ERROR */
              if (res.error) {
                toast.error(res.error, { theme: "colored" });
                return;
              }

              /* ✅ SUCCESS */
           

              toast.success(
                supplyShift === 1
                  ? `🌅 Morning shift  ${qty}  ${res.success}`
                  : `🌙 Evening shift  ${qty}  ${res.success}`,
              );

              setSelected(null);
            } catch (error) {
              toast.error("Failed to Add cart", { theme: "colored" });
            }
          }}
        />
      )}

    </div>
  );
};

export default HomeView;
