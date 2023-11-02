// index.js

import express from "express";
import connectDB from "./config/connectDb.js";
import PostModel from "./model/post_model.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const USERNAME = process.env.USERNAMEDB;
const PASSWORD = process.env.PASSWORD;
connectDB(USERNAME, PASSWORD);
const PORT = process.env.PORT || 3000;

app.get("/api/posts", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, defaults to 1
  const limit = parseInt(req.query.limit) || 10; // Number of posts per page, defaults to 10

  try {
    const posts = await PostModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
