import app from "./backend/app";
import { PORT } from "./backend/config/config";

const startServer = () => {
  app.listen(PORT, () => {
    console.log("server listening on port", PORT);
  });
};

startServer();
