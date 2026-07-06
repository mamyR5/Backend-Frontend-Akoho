
export const sendSuccess = (res, data) => {
    res.status(200).json({
        status: 'success',
        data: data,
        error: null
    });
};

export const sendError = (error,res, statusCode = 500) => {
    console.error(error.stack);
    res.status(statusCode).json({
        status: 'error',
        data: null,
        error: {
            code: error.errorCode || 'INTERNAL_ERROR',
            message: error.message
        }
    });
};