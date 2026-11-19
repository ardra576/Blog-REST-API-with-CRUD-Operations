const express = require("express");
const postRoutes = require("./routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

// A small root route to confirm that the server is running.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Blog REST API",
    endpoints: {
      getAllPosts: "GET /posts",
      getOnePost: "GET /posts/:id",
      createPost: "POST /posts",
      updatePost: "PUT /posts/:id",
      deletePost: "DELETE /posts/:id"
    }
  });
});

app.use("/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;