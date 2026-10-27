module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Malformed JSON body
  if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON in request body';
  }
  // Invalid MongoDB ObjectId in URL -> treat as not found
  else if (err.name === 'CastError') {
    status = 404;
    message = 'Resource not found (invalid ID)';
  }
  // Mongoose schema validation
  else if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  // Duplicate key (unique field)
  else if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = `${field} already exists`;
  }
  // JWT problems
  else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Invalid or expired token';
  }

  if (status === 500) console.error(err);
  res.status(status).json({ success: false, message });
};
