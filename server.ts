import app from "./backend/app";
import { PORT } from "./backend/config/config";
import connectDB from "./backend/config/db";

const startServer = async () => {
  // connect to database
  await connectDB();

  app.listen(PORT, () => {
    console.log("server listening on port", PORT);
  });
};

startServer();
