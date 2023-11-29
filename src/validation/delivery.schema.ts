import { object, string, number, array, TypeOf, z } from "zod";

const initiateDispatchPayload = {
  body: object({
    reference: string({
      required_error: "Reference is required",
    }),
    callBackUrl: string({
      required_error: "Webhook Url is required",
    }),
    deliveryAddress: object({
      latitude: number({
        required_error: "latitude is required",
      }),
      longitude: number({
        required_error: "longitude is required",
      }),
    }),
    receiversName: string({
      required_error: "Receiver's name is required, key: receiversName",
    }),
    receiversPhoneNumber: string({
      required_error:
        "Receivers Phone Number is required, key: receiversPhoneNumber",
    }),
    shopOwnerAddress: object({
      latitude: number({
        required_error: "latitude is required",
      }),
      longitude: number({
        required_error: "longitude is required",
      }),
    }),
  }),
};

export const InitiateDispatchSchema = object({
  ...initiateDispatchPayload,
});

export type InitiateDispatchInput = TypeOf<typeof InitiateDispatchSchema>;

const calculateDeliveryPricePayload = {
  body: object({
    origin: object({
      latitude: number({
        required_error: "latitude is required",
      }),
      longitude: number({
        required_error: "longitude is required",
      }),
    }),
    destination: object({
      latitude: number({
        required_error: "latitude is required",
      }),
      longitude: number({
        required_error: "longitude is required",
      }),
    }),
  }),
};

export const calculateDeliveryPriceSchema = object({
  ...calculateDeliveryPricePayload,
});

export type CalculateDeliveryPriceInput = TypeOf<
  typeof calculateDeliveryPriceSchema
>;
