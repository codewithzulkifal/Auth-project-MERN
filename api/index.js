import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MONGO-DB CONNECTION SUCCEED !!!");
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED !! : ${error}`);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});


app.listen(9000, () => {
  connect();
  console.log("App is listening on port 9000");
});
