import api from "./axios";
import type { TransactionPayload, Transaction } from "../types";


interface TransactionResponse {
  transactions: Transaction[];
  startdate: string;
  enddate: string;
}

export const transactionHistoryApi = (payload: TransactionPayload) =>
  api.post<TransactionResponse>("/transactionhistory", payload);



// export const paymentFormUrl = (balance?: number) =>
//   `/api/paymentform${balance ? `?balance=${balance}` : ""}`;

// export const getPaymentFormHtml = async (balance?: number) => {
//   const params = balance !== undefined ? { balance } : {};

//   const response = await api.get("/paymentform", {
//     params,
//     responseType: "text", // VERY IMPORTANT
//   });

//   return response.data; // HTML string
// };



// export const getPaymentFormHtml = async (balance?: number) => {
//   const response = await api.get("/paymentform", {
//     params: balance !== undefined ? { balance } : {},
//     responseType: "text", // IMPORTANT: because backend returns HTML
//   });

//   return response.data;
// };




export const getPaymentFormHtml = async (balance?: number) => {
  const response = await api.get("/paymentform", {
    params: balance !== undefined ? { balance } : {},
    responseType: "text",
  });

  return response.data;
};



