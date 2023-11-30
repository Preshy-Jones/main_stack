import { object, string, number, array, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *         data:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *              description: JWT access token for authenticated requests.
 *
 */

const payload = {
  body: object({
    email: string({
      required_error: "Email is required",
    }),

    password: string({
      required_error: "Password is required",
    }),
  }),
};

export const LoginSchema = object({
  ...payload,
});

export type LoginInput = TypeOf<typeof LoginSchema>;
