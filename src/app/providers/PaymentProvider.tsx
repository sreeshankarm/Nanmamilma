




import { useState } from "react";
import { PaymentContext } from "../../context/Payment/PaymentContext";
import { transactionHistoryApi } from "../../api/payment.api";
import type { Transaction } from "../../types/payment";

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (start: string, end: string) => {
    try {
      setLoading(true);

      const { data } = await transactionHistoryApi({
        startdate: start,
        enddate: end,
      });

      setTransactions(data.transactions ?? []);
    } catch (error) {
      console.error("Transaction fetch failed", error);
      // setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

   const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <PaymentContext.Provider
      value={{ transactions, loading, fetchTransactions,clearTransactions  }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
