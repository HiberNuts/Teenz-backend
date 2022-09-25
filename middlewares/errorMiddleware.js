const notFoundMiddleware = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
};

const loginErrorMiddleware = (err, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   res.status(statusCode);
   res.json({
      message: err.message,
      stack: err.stack,
   });
   if (error.name === "CastError") {
      return response.status(400).send({
         error: "malformatted id",
      });
   } else if (error.name === "ValidationError") {
      return response.status(400).json({
         error: error.message,
      });
   } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
         error: "invalid token",
      });
   }
};

export { notFoundMiddleware, loginErrorMiddleware };
