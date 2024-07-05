// errorMiddleware.js
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

// Middleware to handle 404 errors
const notFound = (req, res, next) => {
    const error = new HttpError('Not Found', 404);
    next(error);
};

// Middleware to handle all errors
const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        message: err.message || 'An unknown error occurred!'
    });
};

module.exports = { HttpError, notFound, errorHandler };
