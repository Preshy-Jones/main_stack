import { omit } from "lodash";
import UserModel, { UserDocument } from "../../models/User";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { ConflictError } from "../../errors";
import { createUser } from "../../queries/user";

const SignUpService = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  const userExists = await UserModel.findOne({ email: input.email });
  // return userExists;
  if (userExists) {
    throw new ConflictError("Email is already registered");
  }

  const user = await createUser(input);

  return user;
};

export default SignUpService;
