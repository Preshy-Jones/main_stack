import { AuthenticationError, NotFoundError } from "../../errors";
import UserModel from "../../models/User";
// import { omit } from "lodash";
import { generateJWTToken } from "../../utils";
import config from "../../config";

export const loginService = async (email: string, password: string) => {
  const user = await validatePassword({ email, password });
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = await generateJWTToken(
    payload,
    config.jwt.secret,
    config.jwt.expiresIn
  );

  return {
    accessToken: token,
    // user: user,
    // payload,
  };
};

const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw new AuthenticationError("Invalid credentials");
  }

  // return omit(user.toJSON(), "password", "createdAt", "updatedAt",);
  return user;
};

export default loginService;
