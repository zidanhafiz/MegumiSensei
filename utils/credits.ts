import { MidtransTransaction, QrisTransaction, BankTransferTransaction, CStoreTransaction } from "@/types/midtrans";

export function getPaymentChannel(data: MidtransTransaction | QrisTransaction | BankTransferTransaction | CStoreTransaction) {
  if (data.payment_type === "bank_transfer") {
    const parsedData = data as BankTransferTransaction;
    return parsedData.va_numbers?.[0]?.bank ?? "permata";
  } else if (data.payment_type === "qris") {
    const parsedData = data as QrisTransaction;
    return parsedData.issuer;
  } else if (data.payment_type === "cstore") {
    const parsedData = data as CStoreTransaction;
    return parsedData.store;
  } else if (data.payment_type === "echannel") {
    return "mandiri";
  }
  return data.payment_type;
}
