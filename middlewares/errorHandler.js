function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.status) {
    res.status(err.status).json({
      code: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

module.exports = errorHandler;
