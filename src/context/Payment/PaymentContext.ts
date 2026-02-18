import { createContext } from "react";
import type { Transaction } from "../../types/payment";

export interface PaymentContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: (start: string, end: string) => Promise<void>;
  clearTransactions: () => void;
}

export const PaymentContext = createContext<PaymentContextType | null>(null);
