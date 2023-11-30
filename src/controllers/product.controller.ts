import { NextFunction, Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../validation/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  findProducts,
} from "../queries/product";
import { AuthorizationError, NotFoundError } from "../errors";
import { successResponse } from "../utils";
import mongoose from "mongoose";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response,
  next: NextFunction
) {
  const userId = req.user;

  const body = req.body;
  try {
    const product = await createProduct({ ...body, user: userId });

    return res.status(201).send(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response,
  next: NextFunction
) {
  const userId = req.user;

  const productId = req.params.productId;
  const update = req.body;

  try {
    const product = await findProduct({ productId });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (String(product.user) !== userId) {
      throw new AuthorizationError("Unauthorized to update product");
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    return res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
}

export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId;

  const product = await findProduct({ productId });
  try {
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    //remove productId field from product and return product
    // const { productId, ...rest } = product;
    return res.send(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response,
  next: NextFunction
) {
  const userId = req.user;
  const productId = req.params.productId;

  try {
    const product = await findProduct({ productId });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (String(product.user) !== userId) {
      throw new AuthorizationError("You are unauthorized to delete product");
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export const getProductsHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  try {
    const products = await findProducts({ user: userId });
    return res.send(
      successResponse("Products retrieved successfully", products)
    );
  } catch (error) {
    next(error);
  }
};
