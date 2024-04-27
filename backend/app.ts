import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRoutes from "./routes/user.routes";

const app = express();

app.use("/api/users", userRoutes);

app.use(globalErrorHandler);

export default app;
