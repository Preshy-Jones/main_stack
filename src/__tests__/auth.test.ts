import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import UserModel from "../models/User";
import { createUser } from "../queries/user";

const app = createServer();

export const userPayload = {
  // _id: userId,
  email: "jane.doe@example.com",
  firstName: "Jane",
  lastName: "Doe",
  password: "shajsjsk@kdS",
};

describe("login", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  beforeEach(async () => {
    // Clear the database before each test
    await mongoose.connection.db.dropDatabase();
  });

  describe("Login route", () => {
    describe("When valid credentials are provided", () => {
      it("should return success", async () => {
        const user = await createUser(userPayload);
        const { body, statusCode } = await supertest(app)
          .post("/api/auth/login")
          .send({
            email: "jane.doe@example.com",
            password: "shajsjsk@kdS",
          });

        expect(statusCode).toBe(200);

        expect(body.message).toBe("Logged in successfully");
      });
    });
    describe("When invalid credentials are provided", () => {
      it("should return unauthorized ", async () => {
        const user = await createUser(userPayload);
        const { body, statusCode } = await supertest(app)
          .post("/api/auth/login")
          .send({
            email: userPayload.email,
            password: "Wrongpassword!",
          });

        expect(statusCode).toBe(401);
        expect(body.message).toBe("Invalid credential");
      });
    });
  });
});

// function sum(a, b) {
//   return a + b;
// }

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });
