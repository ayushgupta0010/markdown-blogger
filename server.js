require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Article = require("./models/article");
const articleRouter = require("./routes/articles");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
});

app.use("/articles", articleRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(5000, console.log("Server is running on  http://localhost:5000"))
  )
  .catch((err) => console.error(err));
