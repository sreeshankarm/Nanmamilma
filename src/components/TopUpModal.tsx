// import { CreditCard, X, CheckCircle2 } from "lucide-react";
// import { useState } from "react";
// import { useStore } from "../context/store/store";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// export const TopUpModal: React.FC<Props> = ({ open, onClose }) => {
//   const { balance, topUpWallet } = useStore();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handlePreset = (val: number) => setAmount(val.toString());

//   const handlePay = () => {
//     if (!amount || parseInt(amount) <= 0) return;
//     setLoading(true);

//     setTimeout(() => {
//       topUpWallet(parseInt(amount));
//       setLoading(false);
//       onClose();
//     }, 1500);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen bg-black/40  flex justify-center items-center z-50 px-4">
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-white  w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 animate-slide-up">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Top Up Wallet</h2>
//           <button onClick={onClose} className="p-1 bg-gray-100 rounded-full"
// >
//           <X size={20} className="text-gray-700" />
//           </button>
//         </div>

//         {/* Balance Card */}
//         <div className="bg-[#1A3171] rounded-2xl p-6 text-center mb-6">
//           <p className="text-blue-200 text-sm">Current Balance</p>
//           <h1 className="text-3xl font-bold text-white mt-1">
//             ₹{balance.toLocaleString()}
//           </h1>
//         </div>

//         {/* Amount Input */}
//         <div className="mb-6">
//           <label className="text-sm text-gray-500">Enter Amount</label>
//           <div className="relative mt-2">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
//               ₹
//             </span>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="0"
//               className="w-full border rounded-xl py-3 pl-10 pr-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Presets */}
//         <div className="grid grid-cols-3 gap-3 mb-6">
//           {[500, 1000, 2000].map((val) => (
//             <button
//               key={val}
//               onClick={() => handlePreset(val)}
//               className="py-2 border rounded-xl font-semibold hover:bg-gray-100"
//             >
//               ₹{val}
//             </button>
//           ))}
//         </div>

//         {/* Pay Button */}
//         <button
//           onClick={handlePay}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50"
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <>
//               <CreditCard size={18} /> Proceed to Pay
//             </>
//           )}
//         </button>

//         <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
//           <CheckCircle2 size={12} /> Secured by Nanma Pay
//         </p>
//       </div>
//     </div>
//   );
// };












// import { X } from "lucide-react";
// import { useEffect, useState, useCallback } from "react";
// import { getPaymentFormHtml } from "../api/payment.api";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   balance: number;
// }

// type Status = "idle" | "loading" | "success" | "error";

// export const TopUpModal: React.FC<Props> = ({
//   open,
//   onClose,
//   balance,
// }) => {
//   const [html, setHtml] = useState<string>("");
//   const [status, setStatus] = useState<Status>("idle");

//   /* ---------------- LOAD PAYMENT FORM ---------------- */

//   const loadPaymentForm = useCallback(async () => {
//     try {
//       setStatus("loading");
//       setHtml("");

//       const data = await getPaymentFormHtml(balance);

//       if (!data || data.trim().length === 0) {
//         throw new Error("Empty payment form response");
//       }

//       setHtml(data);
//       setStatus("success");
//     } catch (error) {
//       console.error("Payment load failed:", error);
//       setStatus("error");
//     }
//   }, [balance]);

//   /* ---------------- EFFECT ---------------- */

//   useEffect(() => {
//     if (!open) return;

//     loadPaymentForm();
//   }, [open, loadPaymentForm]);

//   /* ---------------- CLOSE RESET ---------------- */

//   const handleClose = () => {
//     setStatus("idle");
//     setHtml("");
//     onClose();
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

//         {/* ---------- HEADER ---------- */}
//         <div className="flex items-center justify-between px-6 py-4 border-b bg-[#8e2d26]">
//           <h2 className="text-lg font-semibold text-white">
//             Top Up Wallet
//           </h2>

//           <button
//             onClick={handleClose}
//            className="p-2 rounded-full bg-gray-100 transition"          >
//             <X size={18} />
//           </button>
//         </div>

//         {/* ---------- BODY ---------- */}
//         <div className="relative flex-1 bg-gray-50">

//           {/* 🔄 LOADING */}
//           {status === "loading" && (
//             <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
//               <div className="w-8 h-8 border-3 border-[#8e2d26] border-t-transparent rounded-full animate-spin" />
//             </div>
//           )}

//           {/* ✅ SUCCESS */}
//           {status === "success" && html && (
//             <iframe
//               title="Payment Form"
//               srcDoc={html}
//               className="w-full h-full border-0"
//               sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
//             />
//           )}

//           {/* ❌ ERROR */}
//           {status === "error" && (
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 text-sm gap-4">
//               <p>Unable to load payment form.</p>

//               <button
//                 onClick={loadPaymentForm}
//                 className="px-4 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };










import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getPaymentFormHtml } from "../api/payment.api";

interface Props {
  open: boolean;
  onClose: () => void;
  balance: number;
}

export const TopUpModal: React.FC<Props> = ({
  open,
  onClose,
  balance,
}) => {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const loadPayment = async () => {
  //   try {
  //     setLoading(true);
  //     setError("");

  //     const data = await getPaymentFormHtml(balance);

  //     if (!data) throw new Error("Empty response");

  //     setHtml(data);
  //   } catch (err) {
  //     console.error("Payment form error:", err);
  //     setError("Unable to load payment form.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const loadPayment = async () => {
  try {
    setLoading(true);
    setError("");

    const { data } = await getPaymentFormHtml(balance);

    if (!data) throw new Error("Empty response");

    setHtml(data);
  } catch (err) {
    console.error("Payment form error:", err);
    setError("Unable to load payment form.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (open) loadPayment();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#8e2d26] text-white">
          <h2 className="font-semibold text-lg">Payment</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 relative">

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="w-8 h-8 border-4 border-[#8e2d26] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-600">
              <p>{error}</p>
              <button
                onClick={loadPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && html && (
            <iframe
              title="Payment Form"
              srcDoc={html}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
          )}
        </div>
      </div>
    </div>
  );
};
