import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = error['response'] || {};

    Logger.error(error.message, error.stack);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return response.status(400).send({ message: error.message });
    }

    return response.status(status).json({
      statusCode: status,
      path: request.url,
      errorType: errorResponse.error || error.name || 'Error',
      errorMessage: errorResponse.message || error.message,
    });
  }
}
