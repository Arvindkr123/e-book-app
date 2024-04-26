import mongoose from "mongoose";
import { MONGO_URI } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connection established");
    });
    mongoose.connection.on("error", () => {
      console.log("Error in Connecting to Database");
    });
    await mongoose.connect(MONGO_URI as string);
  } catch (error) {
    console.error("Failed to connect Database", error);
    process.exit(1);
  }
};
export default connectDB;
