import { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import PageNotFound from "../pages/PageNotFound";

import HomeView from "../pages/HomeView";
import CartView from "../pages/CartView";
import MyOrdersView from "../pages/MyOrdersView";
import ReturnRequestsView from "../pages/ReturnRequestsView";
import DistributorDirectory from "../pages/DistributorDirectory";
import FeedbackCenter from "../pages/FeedbackCenter";
import { MyWalletView } from "../pages/MyWalletView";
import { MyProfileView } from "../pages/MyProfileView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useRouteLoader } from "../Hooks/useRouteLoader";
import type { CartItem } from "../types/cart";
import { useCart } from "../context/cart/useCart";

const MainRouter = () => {
  const [open, setOpen] = useState(false);
  const { cart, loadCart } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  // const loading = useRouteLoader();

  return (
    <>
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex flex-col min-h-screen">
        <Navbar
          onMenuClick={() => setOpen(true)}
          cartCount={cart.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0
          )}
     
        />

        <main className="p-4">
          {/* {loading ? (
            <Loader />
          ) : ( */}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/orders" element={<MyOrdersView />} />
              <Route path="/damagesReturn" element={<ReturnRequestsView />} />
              <Route
                path="/mydistributors"
                element={<DistributorDirectory />}
              />
              <Route path="/feedbackComplaints" element={<FeedbackCenter />} />
              <Route path="/wallet" element={<MyWalletView />} />
              <Route path="/profile" element={<MyProfileView />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          {/* )} */}

          {/* ✅ GLOBAL TOAST */}
          <ToastContainer position="top-right" autoClose={1200} />
        </main>
      </div>
    </>
  );
};

export default MainRouter;
