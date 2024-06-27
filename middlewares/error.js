export const errorHandler = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch = (wrappedComponent) => async (req, res, next) => {
  try {
    await wrappedComponent(req, res, next);
  } catch (err) {
    next(err);
  }
};
