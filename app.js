console.log("hello");

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes/authRoute.js";
import postRoute from "./routes/postRoutes/postRoutes.js";
import commentRouter from "./routes/commentRouter/commentRouter.js";
import { connectionDB } from "./connectDb.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

const logger = process.env === "development" ? "dev" : "short";
app.use(morgan(logger));
app.use(fileUpload());
app.use(express.static("uploads"));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

connectionDB();

app.listen(3030, () => console.log("server is runing"));
