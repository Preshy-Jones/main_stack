import passport from "passport";
import dotenv from "dotenv";
import { Request } from "express";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { StrategyOptions, VerifiedCallback } from "passport-jwt";
import UserModel from "../models/User";

dotenv.config();
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

interface JwtPayload {
  id: string;
}

const passportStrategy = new JwtStrategy(opts, async function (
  jwt_payload: JwtPayload,
  done: VerifiedCallback
) {
  // console.log(opts);

  // console.log(jwt_payload);
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.id });
    if (user) {
      // console.log(user);
      return done(null, user._id);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(error, false);
  }
});

export default passportStrategy;
