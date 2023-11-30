import axios from "axios";
import config from "../config";
import {
  initiateTransactionPayload,
  initiateTransactionResponse,
} from "../types/paystack";
import { ServiceError } from "../errors";

class PaystackService {
  client: any;

  constructor() {
    this.client = axios.create({
      baseURL: config.paystack.baseUrl,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${config.paystack.secretKey}`,
      },
    });
  }

  setToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async initiateTransaction(
    payload: initiateTransactionPayload
  ): Promise<initiateTransactionResponse> {
    try {
      const response = await this.client.post(
        "/transaction/initialize",
        payload
      );
      let data = response.data;

      // console.log(data);
      return data.data;
    } catch (error: any) {
      console.log(error.response.data);
      throw new ServiceError("paystack error: " + error.response.data.message);
    }
  }
}

export default new PaystackService();
