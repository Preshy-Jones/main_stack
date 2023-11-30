import express from "express";
import { loginHandler } from "../controllers/authController";

import validateResource from "../middlewares/validateResource";
import { LoginSchema } from "../validation/auth.schema";
import { SignUpSchema } from "../validation/user.schema";
import {
  getLoggedInUserHandler,
  signupHandler,
} from "../controllers/userController";
import ensureAuthenticated from "../middlewares/auth";

const router = express.Router();

/**
 * @openapi
 * '/api/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/signup", validateResource(SignUpSchema), signupHandler);

/**
   * @openapi
   * '/api/user/me':
   *  get:
   *    tags:
   *    - User
   *    summary: Get logged in user
   *    responses:
   *      200:
   *        description: Get's logged in user using the accessToken
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetLoggedInUserResponse'
   *      403:
   *        description: Forbidden
   * 
   */
router.get("/me", ensureAuthenticated, getLoggedInUserHandler);

export default router;
