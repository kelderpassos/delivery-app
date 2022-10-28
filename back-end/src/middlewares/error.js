const errorMiddleware = (err, _req, res, _next) => {
  if (!err.status) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }

  const { message, status } = err;
  res.status(status).json({ message });
};

module.exports = errorMiddleware;