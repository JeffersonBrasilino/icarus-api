import {
    CallHandler,
    ExecutionContext, HttpStatus,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import {catchError, Observable, of, throwError} from "rxjs";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class NatsResponseExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    let errorMessage = {
                        status: err?.status,
                        message: err.response?.message ?? 'erro desconhecido ao se comunicar com o NATS.'
                    }

                    if ( typeof err?.status == 'number')
                        errorMessage.status = HttpStatus[err?.status]

                    if (process.env.APP_PROD === 'DEVELOP' && err?.err)
                        Object.assign(errorMessage, {err: err.err});

                    return throwError(new RpcException(errorMessage));

                }),
            );
    }
}