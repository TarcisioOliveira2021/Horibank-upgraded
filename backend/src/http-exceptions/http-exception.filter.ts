import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, NotAcceptableException, UnprocessableEntityException } from "@nestjs/common";

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: Error, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const response = contexto.getResponse();
        const httpException = this.getStatus(exception);

        response
        .status(httpException.getStatus())
        .json({
            statusCode: httpException.getStatus(),
            timestamp: new Date().toISOString(),
            message: httpException.message
        });
    }

    private getStatus(e: Error) {
        switch (e.name) {
            case 'NotFoundCorrespondentObjects' :
                return new NotAcceptableException(e.message);
            
            case 'RangeError':
            case 'TypeError':
                return new BadRequestException(e.message);

            case 'NotAllowedAction' :
                return new UnprocessableEntityException(e.message);
        }
    }
}