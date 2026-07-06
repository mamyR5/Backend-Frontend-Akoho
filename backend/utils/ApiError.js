class ApiError extends Error {
    constructor(message,errorCode) {
        super(message);
        this.errorCode = errorCode || 'INTERNAL_ERROR';
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;