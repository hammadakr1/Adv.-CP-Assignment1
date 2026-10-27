module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Server Error';

  if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON in request body';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Invalid or expired token';
  }

  if (status === 500) console.error(err);
  res.status(status).json({ success: false, message });
};
