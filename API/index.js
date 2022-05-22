import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import roomsRouter from "./routes/rooms.js";
import hotelsRouter from "./routes/hotels.js";
import usersRouter from "./routes/users.js";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("DB connection started");
});
mongoose.connection.on("disconnected", () => {
  console.log("DB disconnected");
});

//midllewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/users", usersRouter);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log(`Server running at PORT : ${PORT}`);
});
