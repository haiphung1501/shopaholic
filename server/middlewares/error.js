const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, res, req, next)  => {
    err.statusCode = err.statusCode || 500;
    err.messagee = err.message || "Internal server Error";

    res.status(err.statusCode).json({
        success: false,
        error: err,
    });
}