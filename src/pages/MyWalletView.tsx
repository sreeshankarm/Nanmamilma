import React, { useEffect, useMemo, useState } from "react";
import { Clock, History, Wallet } from "lucide-react";
import { usePayment } from "../context/Payment/usePayment";

export const MyWalletView: React.FC = () => {
  const { transactions, fetchTransactions, clearTransactions, loading } =
    usePayment();

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);

  // useEffect(() => {
  //   const t = new Date();
  //   const s = new Date();
  //   s.setDate(t.getDate() - 7);
  //   const format = (d: Date) => d.toISOString().split("T")[0];
  //   setStartDate(format(s));
  //   setEndDate(format(t));
  // }, []);

  useEffect(() => {
    return () => {
      clearTransactions();
    };
  }, []);

  const { totalCredit, totalDebit, balance } = useMemo(() => {
    const credit = transactions
      .filter((t) => t.transactionstatus === "SUCCESS")
      .reduce((a, b) => a + Number(b.paymentamount), 0);

    const debit = transactions
      .filter((t) => t.transactionstatus !== "SUCCESS")
      .reduce((a, b) => a + Number(b.paymentamount), 0);

    return {
      totalCredit: credit,
      totalDebit: debit,
      balance: credit - debit,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen  py-6 sm:py-10">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Wallet + Date Filter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Card */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-100">
                  My Wallet
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3 mt-2">
                  <Wallet size={26} />₹
                  {balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </h1>
                <p className="text-emerald-100 mt-1">Available Balance</p>
                <div className="flex items-center gap-2 text-xs mt-4 text-emerald-100">
                  <Clock size={14} /> Live balance
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Stat title="Total Credit" value={totalCredit} />
                <Stat title="Total Debit" value={totalDebit} />
              </div>
            </div>
          </div>

          {/* Date Filter */}
      

          <div className="bg-white rounded-2xl shadow-sm border border-gray-500 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <InputDate
                label="Start Date"
                value={startDate}
                max={endDate}
                onChange={setStartDate}
              />

              {/* End Date */}
              <InputDate
                label="End Date"
                value={endDate}
                min={startDate}
                max={today}
                onChange={setEndDate}
              />

              {/* Button Full Width */}
              <div className="sm:col-span-2 mt-3">
                <button
                  onClick={() => fetchTransactions(startDate, endDate)}
                  disabled={!startDate || !endDate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-xl transition active:scale-[0.98]"
                >
                  Show Transactions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-500 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <History size={18} /> Transaction History
            </div>
            <span className="text-sm text-gray-500">
              {transactions.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Orderid</th>
                  <th className="px-6 py-3 text-left">Date&time</th>
                  <th className="px-6 py-3 text-left">bankReference</th>
                  <th className="px-6 py-3 text-center">Mode</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading && (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading && transactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                )}

                {transactions.map((tx) => (
                  <tr
                    key={tx.paymentorderid}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      #{tx.paymentorderid}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tx.tr_date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{tx.bank_reference}</td>
                    <td className="px-6 py-4 text-center">
                      {tx.paymode.toUpperCase()}
                    </td>
                    <td
                      className={`px-6 py-4 text-center font-semibold ${
                        tx.transactionstatus === "SUCCESS"
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {tx.transactionstatus}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">
                      ₹
                      {Number(tx.paymentamount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */

const Stat = ({ title, value }: any) => (
  <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4">
    <p className="text-xs text-emerald-100">{title}</p>
    <p className="font-bold text-lg">
      ₹{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </p>
  </div>
);

const InputDate = ({ label, value, onChange, min, max }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker()} // 🔥 always open on click
      onKeyDown={(e) => e.preventDefault()} // block typing
      onPaste={(e) => e.preventDefault()} // block paste
      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);
