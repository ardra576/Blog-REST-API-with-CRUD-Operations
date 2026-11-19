function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  // Express body-parser uses this type for malformed JSON request bodies.
  if (err.type === "entity.parse.failed") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error."
  });
}

module.exports = { notFound, errorHandler };
