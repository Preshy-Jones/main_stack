import "dotenv/config";
import express from "express";
import compression from "compression";
import { errorHandler, notFoundHandler } from "../middlewares/errors";

function createServer() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());

  app.get("/", (req: Request, res: any) => {
    res.json({
      msg: "Test Delivery Service...",
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createServer;
