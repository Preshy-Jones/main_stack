import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import UserModel from "../models/User";
import * as UserService from "../queries/user/index";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  firstName: "Jane",
  lastName: "Doe",
};

const userInput = {
  email: "test@example.com",
  firstName: "Jane",
  lastName: "Doe",
  password: "shajsjsk@kdS",
  confirmPassword: "shajsjsk",
};

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
   

    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post("/api/user/signup")
          .send({ ...userInput, confirmPassword: "doesnotmatch" });

        expect(statusCode).toBe(422);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });
  });
});
