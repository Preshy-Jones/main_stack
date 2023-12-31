import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../utils/createServer";
import { generateJWTToken } from "../utils";
import config from "../config";
import { createProduct, findProduct } from "../queries/product";
import { createUser, findUser } from "../queries/user";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

interface ProductPayload {
  user: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const productPayload: ProductPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  imageUrl: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
  // _id: userId,
  email: "jane.doe@example.com",
  firstName: "Jane",
  lastName: "Doe",
  password: "shajsjsk@kdS",
};

export const userPayload2 = {
  // _id: userId,
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  password: "Belkace@dds",
};

describe("product", () => {
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

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const product = await createProduct(productPayload);
        const productId = "jhbbhjb";

        const url = `/api/product/${productId}`;
        const { body, statusCode } = await supertest(app).get(url);
        console.log(url);
        console.log(body);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        // @ts-ignore
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/product/${product.productId}`
        );

        // console.log("hejdjdjdjdndjdjdd", body);

        expect(statusCode).toBe(200);

        expect(body.data.productId).toBe(product.productId);
      });
    });
  });

  describe("create product route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 401", async () => {
        const { statusCode } = await supertest(app).post("/api/product");

        expect(statusCode).toBe(401);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and create the product", async () => {
        console.log("dfgdfgdfgdf", config.jwt.secret, config.jwt.expiresIn);

        const user = await createUser(userPayload);

        const jwt = await generateJWTToken(
          {
            id: user._id,
            email: user.email,
          },
          config.jwt.secret,
          config.jwt.expiresIn
        );

        console.log(jwt);

        const { statusCode, body } = await supertest(app)
          .post("/api/product")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(201);

        expect(body.data).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description:
            "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
          imageUrl: "https://i.imgur.com/QlRphfQ.jpg",
          price: 879.99,
          productId: expect.any(String),
          title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });

  //update product route
  describe("update product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const product = await createProduct(productPayload);
        const productId = "jhbbhjb";

        const url = `/api/product/${productId}`;
        const { body, statusCode } = await supertest(app).get(url);
        console.log(url);
        console.log(body);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the product does exist", () => {
      describe("given the user is not the owner of the product", () => {
        it("should return a 401", async () => {
          const user1 = await createUser(userPayload);
          const user2 = await createUser(userPayload2);

          productPayload.user = user1?._id;

          const product = await createProduct(productPayload);
          const jwt = await generateJWTToken(
            {
              id: user2?._id,
              email: user2?.email,
            },
            config.jwt.secret,
            config.jwt.expiresIn
          );

          const { body, statusCode } = await supertest(app)
            .put(`/api/product/${product.productId}`)
            .set("Authorization", `Bearer ${jwt}`)
            .send({
              title: "iphone",
            });

          expect(statusCode).toBe(403);
          expect(body.message).toBe(
            "You are unauthorized to update this product"
          );
        });
      });
      describe("given the user is the owner of the product", () => {
        it("should return a 200 status and update the product", async () => {
          const newUser = await createUser(userPayload);

          productPayload.user = newUser?._id;

          const product = await createProduct(productPayload);
          const jwt = await generateJWTToken(
            {
              id: newUser?._id,
              email: newUser?.email,
            },
            config.jwt.secret,
            config.jwt.expiresIn
          );

          const { body, statusCode } = await supertest(app)
            .put(`/api/product/${product.productId}`)
            .set("Authorization", `Bearer ${jwt}`)
            .send({
              title: "iphone",
            });

          const foundProduct = await findProduct({
            productId: product.productId,
          });

          expect(statusCode).toBe(200);

          expect(foundProduct?.title).toBe("iphone");
        });
      });
    });
  });
});
