import "dotenv/config";
import { errorHandler, notFoundHandler } from "./middlewares/errors";

import connectDB from "./config/db";
import createServer from "./utils/createServer";
const app = createServer();

app.get("/", (req: Request, res: any) => {
  res.json({
    msg: "Main stack assessment...",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
