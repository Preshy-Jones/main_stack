import "dotenv/config";
import express from "express";
import compression from "compression";
import authRoutes from "../routes/auth";
import userRoutes from "../routes/user";
import passport from "passport";
import passportStrategy from "../middlewares/passport";

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

  return app;
}

export default createServer;
