import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.use(globalErrorHandler);

export default app;
