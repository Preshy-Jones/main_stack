import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import UserModel from "../models/User";

const app = createServer();

describe("Register route", () => {
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

  describe("Register route", () => {
    describe("When valid input fields are passed", () => {
      it("should register a new user", async () => {
        const { body, statusCode } = await supertest(app)
          .post("/api/user/signup")
          .send({
            firstName: "Preshy",
            lastName: "Jones",
            email: "preshyjones@gmail.com",
            password: "Password1234@",
            confirmPassword: "Password1234@",
          });

        expect(statusCode).toBe(201);
        expect(body.message).toBe("User registered successfully");
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
