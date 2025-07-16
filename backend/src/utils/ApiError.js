class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = []
    ) {
        super();
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.error = error;
        this.data = null;
    }
}

export {
    ApiError
}