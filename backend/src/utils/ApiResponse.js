class ApiResponse extends Error {
    constructor(statusCode, date, message = "Success") {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
    }
}

export {
    ApiResponse
}