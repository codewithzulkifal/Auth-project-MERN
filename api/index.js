import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();


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

const app = express();

app.use(express.json());


app.listen(9999, () => {
  connect();
  console.log("App is listening on port 9999");
});

import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js";


app.use('/api/test', userRoute )
app.use('/api/user', authRoute )


app.use((err, req, res, next) => {
  const errorStaus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStaus).json({
    success: false,
    status: errorStaus,
    message: errorMessage,
    stack: err.stack,
  });
});
