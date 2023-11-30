import { omit } from "lodash";

import { ConflictError } from "../../errors";
import { userCreate, userFindFirst } from "../../queries/user";
import { Prisma } from "@prisma/client";

export async function createUser(input: Prisma.UserCreateInput) {
  const userExists = await userFindFirst({ email: input.email });
  if (userExists) {
    throw new ConflictError("Email is already registered");
  }

  const user = await userCreate(input);

  return omit(user, "password");
}
