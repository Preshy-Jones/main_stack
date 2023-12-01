import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../../models/User";
import { omit } from "lodash";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  const user = await UserModel.create(input);

  return omit(user.toJSON(), "password");
}

export const findUser = (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  return UserModel.findOne(query, {}, options);
};
