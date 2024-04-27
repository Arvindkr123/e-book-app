import dotenv from "dotenv";
dotenv.config();
export const { PORT, MONGO_URI, NODE_ENV } = process.env;
