// utils/ApiResponse.js
class ApiResponse {
  static success(data, message = 'success', status = 200) {
    return {
      status,
      message,
      data,
      error: null,
    };
  }

  static error(message, status = 400, error = '') {
    return {
      status,
      message,
      data: null,
      error: error || message,
    };
  }

  static notfound(message = 'Resource Not Found!') {
    return ApiResponse.error(message, 404);
  }

  static unauthorized(message = 'Unauthorized') {
    return ApiResponse.error(message, 401);
  }

  static internalservererror(message = 'Internal Server Error') {
    return ApiResponse.error(message, 500);
  }
}

module.exports = ApiResponse;
