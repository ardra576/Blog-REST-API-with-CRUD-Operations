const { posts } = require("../data/posts");

function findPostIndex(id) {
  return posts.findIndex((post) => post.id === id);
}

// GET /posts
function getAllPosts(req, res) {
  const { search, category } = req.query;
  let results = [...posts];

  if (search) {
    const term = search.toLowerCase();
    results = results.filter((post) =>
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term)
    );
  }

  if (category) {
    results = results.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  return res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
}

// GET /posts/:id
function getPostById(req, res) {
  const post = posts.find((item) => item.id === req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found."
    });
  }

  return res.status(200).json({ success: true, data: post });
}

// POST /posts
function createPost(req, res) {
  const { title, content, author, category } = req.body;

  const missingFields = ["title", "content", "author", "category"].filter(
    (field) => typeof req.body[field] !== "string" || !req.body[field].trim()
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, content, author, and category as non-empty strings.",
      missingFields
    });
  }

  const newPost = {
    id: String(Date.now()),
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    category: category.trim(),
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);

  return res.status(201).json({
    success: true,
    message: "Blog post created successfully.",
    data: newPost
  });
}

// PUT /posts/:id
function updatePost(req, res) {
  const index = findPostIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found."
    });
  }

  const allowedFields = ["title", "content", "author", "category"];
  const updates = req.body;
  const suppliedFields = Object.keys(updates);

  if (suppliedFields.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update."
    });
  }

  const invalidFields = suppliedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Only title, content, author, and category can be updated.",
      invalidFields
    });
  }

  for (const field of suppliedFields) {
    if (typeof updates[field] !== "string" || !updates[field].trim()) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a non-empty string.`
      });
    }
  }

  const updatedPost = {
    ...posts[index],
    ...Object.fromEntries(
      suppliedFields.map((field) => [field, updates[field].trim()])
    )
  };

  posts[index] = updatedPost;

  return res.status(200).json({
    success: true,
    message: "Blog post updated successfully.",
    data: updatedPost
  });
}

// DELETE /posts/:id
function deletePost(req, res) {
  const index = findPostIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found."
    });
  }

  const deletedPost = posts.splice(index, 1)[0];

  return res.status(200).json({
    success: true,
    message: "Blog post deleted successfully.",
    data: deletedPost
  });
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};