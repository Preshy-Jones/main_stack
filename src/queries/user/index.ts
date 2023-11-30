import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../../models/User";
import { omit } from "lodash";


export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}
