export type MidtransTransaction = {
  transaction_time: string;
  transaction_status: MidtransTransactionStatus;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: MidtransPaymentType;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
};

export type MidtransTransactionStatus = "capture" | "settlement" | "pending" | "deny" | "cancel" | "expire" | "failure" | "authorize";

export type MidtransPaymentType = "gopay" | "shopeepay" | "bank_transfer" | "qris" | "echannel" | "cstore" | "akulaku";

export type QrisTransaction = MidtransTransaction & {
  issuer: string;
  acquirer: string;
};

export type BankTransferTransaction = MidtransTransaction & {
  va_numbers?: {
    va_number: string;
    bank: string;
  }[];
};

export type CStoreTransaction = MidtransTransaction & {
  store: string;
};
