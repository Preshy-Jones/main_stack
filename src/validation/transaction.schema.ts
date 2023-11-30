import { object, string, number, array, TypeOf, z } from "zod";
import { TransactionStatus } from "../types/transaction";

/**
 * @openapi
 * components:
 *  schemas:
 *    InitiateTransactionInput:
 *      type: object
 *      required:
 *        - amount
 *        - description
 *      properties:
 *        amount:
 *          type: string
 *          default: jane.doe@example.com
 *        description:
 *          type: string
 *          default: to buy books
 *    InitiateTransactionResponse:
 *      type: object
 *      properties:
 *         data:
 *          type: object
 *          properties:
 *            authorization_url:
 *              type: string
 *              description: A generated link where the payment gateway can be accessed
 *            reference:
 *              type: string
 *            access_code:
 *              type: string
 *             
*/

const payload = {
  body: object({
    amount: string({
      required_error: "Amount is required, key:amount",
    }),
    description: string({
      required_error: "Description is required, key:description",
    }),
  }),
};

export const InitiateTransactionSchema = object({
  ...payload,
});

export type InitiateTransactionInput = TypeOf<typeof InitiateTransactionSchema>;




/**
* @openapi
* components:
*   schemas:
*     GetTransactionHistoryResponse:
*       type: array
*       items:
*         type: object
*         required:
*           - user
*           - amount
*           - transactionReference
*           - description
*           - status
*           - createdAt
*           - updatedAt
*         properties:
*           _id:
*             type: string
*           user:
*             type: string
*           amount:
*             type: number
*           transactionReference:
*             type: string
*           description:
*             type: string
*           status:
*             type: string
*           createdAt:
*             type: string
*           updatedAt:
*             type: string
*           __v:
*             type: number
*/

export const getTransactionHistorySchema = object({
  query: object({
    status: z.enum([
      TransactionStatus.PENDING,
      TransactionStatus.FAILED,
      TransactionStatus.SUCCESS,
    ]),
  }).optional(),
});

export type GetTransactionHistoryInput = TypeOf<
  typeof getTransactionHistorySchema
>;
