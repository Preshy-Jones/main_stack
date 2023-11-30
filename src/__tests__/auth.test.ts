import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import UserModel from "../models/User";

const app = createServer();

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

    // describe("When valid credentials are provided", () => {
    //   it("should return success", async () => {
    //     const { body, statusCode } = await supertest(app)
    //       .post("/api/auth/login")
    //       .send({
    //         email: "adedibuprecious@gmail.com",
    //         password: "Sharingan066@",
    //       });

    //     expect(statusCode).toBe(200);

    //     // console.log(
    //     //   "hello there   there   there   there   there   therehello hellohello hello"
    //     // );
    //     // console.log(body);

    //     expect(body.message).toBe("Logged in successfully");
    //   });
    // });
    // describe("When invalid credentials are provided", () => {
    //   it("should return unauthorized ", async () => {
    //     const { body, statusCode } = await supertest(app)
    //       .post("/api/auth/login")
    //       .send({
    //         email: "adedibuprecious@gmail.com",
    //         password: "Sharingan066@",
    //       });

    //     console.log(
    //       "hello hello hello hello hello hellohello hellohello hello"
    //     );
    //     console.log(body);

    //     expect(statusCode).toBe(401);
    //     expect(body.message).toBe("Invalid credentials");
    //   });
    // });
  });
});

// function sum(a, b) {
//   return a + b;
// }

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });
