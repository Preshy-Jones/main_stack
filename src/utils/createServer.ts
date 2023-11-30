import "dotenv/config";
import express from "express";
import compression from "compression";
import authRoutes from "../routes/auth";
import userRoutes from "../routes/user";
import productRoutes from "../routes/product";
import passport from "passport";
import passportStrategy from "../middlewares/passport";
import { errorHandler, notFoundHandler } from "../middlewares/errors";

function createServer() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());

  app.use(passport.initialize());
  passport.use(passportStrategy);

  app.get("/", (req: Request, res: any) => {
    res.json({
      msg: "Mainstack...",
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/product", productRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createServer;
