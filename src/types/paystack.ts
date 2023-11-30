export interface initiateTransactionPayload {
  email: string;
  amount: string;
  callback_url?: string;
  reference?: string;
}

export interface initiateTransactionResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaystackTransaction {
  id: number;
  domain: string;
  amount: number;
  gateway_response: string;
  status: string;
  reference: string;
  fees: number;
}

export type PaystackWebHookResponse = {
  event: string;
  data: PaystackTransaction;
};
